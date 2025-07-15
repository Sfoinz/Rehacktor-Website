import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaTrashAlt } from "react-icons/fa";
import FormButton from "../../components/buttons/FormButton";
import SessionContext from "../../context/SessionContext";
import { useFavorites } from "../../context/FavoritesProvider";

export default function ProfilePage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useFavorites();
    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            navigate("/login");
        }
    }, [session, navigate]);

    if (!session) return <p className="text-white">Loading...</p>;

    const user = session.user;

    return (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Il mio profilo</h1>

            <div className="text-gray-300 mb-4 space-y-2">
                <p><strong>Username:</strong> {user.user_metadata.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            <FormButton variant="primary" onClick={() => navigate("/account")}>
                Modifica profilo
            </FormButton>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-4">I miei preferiti ❤️</h2>

                {favorites.length === 0 ? (
                    <p className="text-gray-400 text-sm">Non hai ancora messo like a nessun gioco.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {favorites.map((game) => (
                            <div
                                key={game.game_id}
                                className="bg-gray-700 rounded-xl p-2 flex flex-col items-center text-center shadow hover:shadow-lg relative"
                            >
                                <button
                                    onClick={() => removeFavorite(game.game_id)}
                                    className="absolute top-1 right-1 text-red-400 hover:text-red-600 text-sm"
                                    title="Rimuovi dai preferiti"
                                >
                                    <FaTrashAlt />
                                </button>
                                <img
                                    src={game.game_image}
                                    alt={game.game_name}
                                    className="w-24 h-24 object-cover rounded-lg mb-2"
                                />
                                <p className="text-sm text-white truncate">{game.game_name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
