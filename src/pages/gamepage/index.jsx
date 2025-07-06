import useApiKey from "../../hooks/useApiKey";
import {useState, useEffect } from "react";
import { useParams } from "react-router";


function GamePage() {

    const apiKey = useApiKey();
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;

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

    }, [id]);


    return (
        <div>
            {error && <h1>{error}</h1>}
            <div>
                <div>
                    <p>{data && data.released}</p>
                    <h1>{data && data.name}</h1>
                    <p>Rating: {data && data.rating}</p>
                    <p>About:</p>
                    <p>{data && data.description_raw}</p>
                </div>
                <div>
                    <img src={data && data.background_image} alt="" />
                </div>

            </div>
        </div>

    )
}

export default GamePage;