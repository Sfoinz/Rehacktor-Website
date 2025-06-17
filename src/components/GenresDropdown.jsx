import { useState, useEffect } from "react";
import useApiKey from "../hooks/useApiKey";

const GenresDropdown = () => {
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);
    const apiKey = useApiKey();

    const initialUrl = `https://api.rawg.io/api/genres?key=${apiKey}`;

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setGenres(json.results || []);
        } catch (error) {
            setError(error.message);
            setGenres([]);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="w-full max-w-xs mb-4">
            <label htmlFor="genres" className="block text-sm font-medium text-gray-700 mb-1">
                Filtra per Genere
            </label>
            <select
                id="genres"
                name="genres"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
                <option value="">Tutti i generi</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.slug}>
                        {genre.name}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm text-red-500 mt-1">Errore: {error}</p>
            )}
        </div>
    );
};

export default GenresDropdown;
