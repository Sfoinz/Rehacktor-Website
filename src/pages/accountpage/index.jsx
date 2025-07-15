import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import FormButton from "../../components/buttons/FormButton";
import Avatar from "../../components/Avatar";

export default function AccountPage() {
    const { session, setSession } = useContext(SessionContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        if (!session) {
            navigate("/login");
            return;
        }

        const getProfile = async () => {
            setLoading(true);
            const { user } = session;

            const { data, error } = await supabase
                .from("profiles")
                .select("username, first_name, last_name, avatar_url")
                .eq("id", user.id)
                .single();

            if (error) {
                console.warn(error);
            } else if (data) {
                setUsername(data.username || "");
                setFirstName(data.first_name || "");
                setLastName(data.last_name || "");
                setAvatarUrl(data.avatar_url || "");
            }

            setLoading(false);
        };

        getProfile();
    }, [session, navigate]);

    const handleAvatarUpload = async (event, filePath) => {
        const { user } = session;

        const updates = {
            id: user.id,
            avatar_url: filePath,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) {
            alert(error.message);
        } else {
            setAvatarUrl(filePath);
            await refreshSession();
            alert("Avatar aggiornato!");
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name: firstName,
            last_name: lastName,
            updated_at: new Date(),
        };

        const { error: dbError } = await supabase.from("profiles").upsert(updates);

        if (dbError) {
            alert(dbError.message);
            setLoading(false);
            return;
        }

        const { error: metadataError } = await supabase.auth.updateUser({
            data: {
                username,
                first_name: firstName,
                last_name: lastName,
            },
        });

        if (metadataError) {
            alert(metadataError.message);
            setLoading(false);
            return;
        }

        await refreshSession();

        alert("Profilo aggiornato con successo!");
        navigate("/profile");
        setLoading(false);
    };

    const refreshSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (!error) {
            setSession(data.session);
        }
    };

    if (!session) return <p className="text-white">Loading...</p>;

    return (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Modifica profilo</h1>
            <div className="flex justify-center mb-6">
                <Avatar url={avatarUrl} size={120} onUpload={handleAvatarUpload} />
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-gray-100 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        value={session.user.email}
                        disabled
                        className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-xl border border-gray-600 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-100 mb-1" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-xl border border-gray-600 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-100 mb-1" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-xl border border-gray-600 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-100 mb-1" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-xl border border-gray-600 focus:outline-none"
                    />
                </div>
                <FormButton type="submit" variant="primary" disabled={loading}>
                    {loading ? "Salvataggio..." : "Salva modifiche"}
                </FormButton>
            </form>
        </div>
    );
}
