import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";
import useApiKey from "../../hooks/useApiKey";
import useFetchSolution from "../../hooks/useFetchSolution";

const apiKey = useApiKey();

function Homepage() {

    const url = `https://api.rawg.io/api/games?key=${apiKey}`;

    const { data, loading, error, updateUrl } = useFetchSolution(url);


    return (
        <div>
            <h1>Homepage</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {error && <article>{error}</article>}
                {data && data.results.map((game) => (
                    <CardGame key={game.id} game={game}></CardGame>
                ))}


            </div>
        </div>

    )
}

export default Homepage;