import { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";

export default function ToggleFavorite({ data }) {
    const { session } = useContext(SessionContext);
    const user = session?.user;

    const [favorited, setFavorited] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            if (!user) return;
            const { data: fav, error } = await supabase
                .from("favorites")
                .select("id")
                .eq("user_id", user.id)
                .eq("game_id", data.id)
                .single();
            if (fav) setFavorited(true);
        };
        checkFavorite();
    }, [user, data.id]);

    const addFavorite = async () => {
        setLoading(true);
        const { error } = await supabase.from("favorites").insert([
            {
                user_id: user.id,
                game_id: data.id,
                game_name: data.name,
                game_image: data.background_image,
                updated_at: new Date(),
            },
        ]);
        if (!error) setFavorited(true);
        setLoading(false);
    };

    const removeFavorite = async () => {
        setLoading(true);
        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("user_id", user.id)
            .eq("game_id", data.id);
        if (!error) setFavorited(false);
        setLoading(false);
    };

    const handleToggle = async (e) => {
        e.stopPropagation();
        if (!user || loading) return;
        if (favorited) {
            await removeFavorite();
        } else {
            await addFavorite();
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className="text-pink-500 hover:text-pink-600 transition"
        >
            {favorited ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
        </button>
    );
}
