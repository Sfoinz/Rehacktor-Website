import { useContext, useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

export default function Chatbox({ data }) {
    const { session } = useContext(SessionContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const fetchMessages = async () => {
        const { data: fetchedMessages, error } = await supabase
            .from("messages")
            .select("*")
            .eq("game_id", data.id)
            .order("updated_at", { ascending: true });

        if (!error) setMessages(fetchedMessages);
        else console.error("Errore recupero messaggi:", error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const { error } = await supabase.from("messages").insert([
            {
                profile_id: session.user.id,
                profile_username: session.user.user_metadata.username,
                game_id: data.id,
                content: newMessage.trim(),
                updated_at: new Date()
            },
        ]);

        if (!error) {
            setNewMessage("");
            fetchMessages();
        } else {
            console.error("Errore invio messaggio:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                (payload) => {
                    if (payload.new.game_id === data.id) fetchMessages();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [data.id]);

    return (
        <div className="bg-gray-700 rounded-xl p-4 shadow w-full max-w-md">
            <h4 className="text-white text-lg font-semibold mb-2">Gamers Chat</h4>

            <div className="bg-gray-800 h-48 overflow-y-auto rounded p-2 mb-2">
                {messages.length === 0 ? (
                    <p className="text-gray-400 text-sm">Nessun messaggio ancora.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="mb-1">
                            <span className="text-pink-400 font-semibold">
                                {msg.profile_username}:
                            </span>{" "}
                            <span className="text-gray-200 text-sm">{msg.content}</span>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className="flex-grow rounded-l px-3 py-1 text-sm bg-gray-600 text-white focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-700 px-4 rounded-r text-white text-sm"
                >
                    Invia
                </button>
            </form>
        </div>
    );
}
