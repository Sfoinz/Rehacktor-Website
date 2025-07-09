import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import GameModal from "../../components/GameModal";
import useFetchSolution from "../../hooks/useFetchSolution";
import useApiKey from "../../hooks/useApiKey";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const game = searchParams.get("query");
    const apiKey = useApiKey();

    const [selectedGame, setSelectedGame] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${game}`;
    const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <h1 className="text-3xl font-bold text-white mb-6">
                Risultati per: <span className="text-pink-500">{game}</span>
            </h1>

            {loading && <p className="text-gray-400 mb-4">Caricamento...</p>}
            {error && <h1 className="text-red-400 mb-4">{error}</h1>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.results?.map((game) => (
                    <CardGame
                        key={game.id}
                        game={game}
                        onClick={() => setSelectedGame(game)}
                    />
                ))}
            </div>

            <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
        </div>
    );
}
