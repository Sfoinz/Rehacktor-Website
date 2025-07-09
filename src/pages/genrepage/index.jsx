import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import GameModal from "../../components/GameModal";
import useApiKey from "../../hooks/useApiKey";
import useFetchSolution from "../../hooks/useFetchSolution";

function GenrePage() {
  const apiKey = useApiKey();
  const { genre } = useParams();
  const [selectedGame, setSelectedGame] = useState(null);

  const url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}&page=1`;
  const { data, loading, error, updateUrl } = useFetchSolution(url);

  useEffect(() => {
    if (genre && apiKey) {
      updateUrl(url);
    }
  }, [genre, apiKey]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-white mb-6 capitalize">
        {genre}
      </h2>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <article className="text-red-400">{error}</article>}

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

export default GenrePage;
