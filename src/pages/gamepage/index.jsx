import useApiKey from "../../hooks/useApiKey";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";


function GamePage() {

    const apiKey = useApiKey();
    const { id } = useParams();

    const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;

    const { data, loading, error, updateUrl } = useFetchSolution(url);



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