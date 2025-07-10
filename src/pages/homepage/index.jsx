import { useState } from "react";
import CardGame from "../../components/CardGame";
import GameModal from "../../components/GameModal";
import useApiKey from "../../hooks/useApiKey";
import useFetchSolution from "../../hooks/useFetchSolution";
import GameCarousel from "../../components/GameCarousel";

const apiKey = useApiKey();

function Homepage() {
    const [selectedGame, setSelectedGame] = useState(null);

    const url = `https://api.rawg.io/api/games?key=${apiKey}`;
    const { data, loading, error } = useFetchSolution(url);

    return (
        <div className="p-4">
            {data && data.results && (
                <GameCarousel games={data.results.slice(0, 5)} />
            )}

            <h1 className="text-3xl font-bold text-white mb-6">Homepage</h1>

            {loading && <p className="text-gray-400">Loading...</p>}
            {error && <article className="text-red-400">{error}</article>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.results?.map((game) => (
                    <CardGame key={game.id} game={game} onClick={() => setSelectedGame(game)} />
                ))}
            </div>


            <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
        </div>
    );
}

export default Homepage;
