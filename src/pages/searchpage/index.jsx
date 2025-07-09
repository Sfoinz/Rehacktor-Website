import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";
import useApiKey from "../../hooks/useApiKey";


export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");
    const apikey = useApiKey();

    const initialUrl = `https://api.rawg.io/api/games?key=${apikey}&search=${game}`;

    const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <div className="container">
            <h1>Risultati per: {game} game</h1>
            {loading && <p>loading...</p>}
            {error && <h1>{error}</h1>}
            <div>
                {data && data.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
}
