import { useContext } from "react";
import useApiKey from "../../hooks/useApiKey";
import { useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";
import SessionContext from "../../context/SessionContext";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";

export default function GamePage() {
    const apiKey = useApiKey();
    const { id } = useParams();
    const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
    const { data, loading, error } = useFetchSolution(url);

    const { session } = useContext(SessionContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
            {error && (
                <h1 className="text-red-400 text-xl font-semibold">{error}</h1>
            )}

            {loading && (
                <h1 className="text-gray-300 text-xl font-semibold">Caricamento...</h1>
            )}

            {data && (
                <div className="max-w-5xl w-full bg-gray-800 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                    <div className="relative">
                        <img
                            src={data.background_image}
                            alt={data.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    <div className="p-6 flex flex-col justify-center">
                        <p className="text-gray-400 text-sm mb-2">
                            Released: {data.released}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-3xl font-bold text-white">{data.name}</h1>
                            <ToggleFavorite data={data} />
                        </div>

                        <p className="text-pink-500 font-semibold mb-4">
                            Rating: {data.rating}
                        </p>

                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            {data.description_raw}
                        </p>

                        <div className="style-chatbox">
                            <Chatbox data={data} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
