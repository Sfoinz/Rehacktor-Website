import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useApiKey from "../../hooks/useApiKey";
import useFetchSolution from "../../hooks/useFetchSolution";

function GenrePage() {

    const apiKey = useApiKey();
    const { genre } = useParams();

    const url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}&page=1`;

    const { data, loading, error, updateUrl } = useFetchSolution(url);
    useEffect(() => {
        if (genre && apiKey) {
            updateUrl(url);
        }
    }, [genre, apiKey]);


    return (
        <div>
            <h2>Welcome to {genre} page</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {error && <article>{error}</article>}
                {data && data.results.map((game) => (
                    <CardGame key={game.id} game={game}></CardGame>
                ))}


            </div>
        </div>

    )
}

export default GenrePage;