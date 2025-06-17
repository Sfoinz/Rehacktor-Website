import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";
import useApiKey from "../../hooks/useApiKey";


/* const apiKey = 'e6781d6f615f4a039493dc977b4f3874'; */
const apiKey = useApiKey();

function Homepage() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const url = `https://api.rawg.io/api/games?key=${apiKey}`;

    const load = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);

        } catch (error) {
            setError(error.message);
            setData(null);
        }
    }

    useEffect(() => {
        load();
        
    }, []);
   
    
    return (
        <div>
            <h1>Homepage</h1>
            <div>
                {error && <article>{error}</article>}
                {data && data.results.map((game) => (
                    <CardGame key={game.id} game={game}></CardGame>
                ))}
            </div>
        </div>

    )
}

export default Homepage;