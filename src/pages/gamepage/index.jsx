import useApiKey from "../../hooks/useApiKey";
import { useParams } from "react-router";
import useFetchSolution from "../../hooks/useFetchSolution";

function GamePage() {
    const apiKey = useApiKey();
    const { id } = useParams();
    const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
    const { data, loading, error, updateUrl } = useFetchSolution(url);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
            {error && (
                <h1 className="text-red-400 text-xl font-semibold">{error}</h1>
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
                        <h1 className="text-3xl font-bold text-white mb-4">{data.name}</h1>
                        <p className="text-pink-500 font-semibold mb-4">
                            Rating: {data.rating}
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {data.description_raw}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GamePage;
