import { useContext, useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesProvider";
import SessionContext from "../context/SessionContext";

export default function ToggleFavorite({ data }) {
    const { session } = useContext(SessionContext);
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const isFavorite = favorites.some((fav) => fav.game_id === data.id);
        setIsFav(isFavorite);
    }, [favorites, data.id]);

    const handleToggle = async (e) => {
        e.stopPropagation();
        if (!session?.user) {
            alert("Devi essere loggato per aggiungere ai preferiti.");
            return;
        }

        if (isFav) {
            await removeFavorite(data.id);
        } else {
            await addFavorite(data);
        }
    };

    return (
        <button onClick={handleToggle} className="text-pink-500 text-xl">
            {isFav ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
}
