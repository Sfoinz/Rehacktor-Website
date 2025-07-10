import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useApiKey from "../hooks/useApiKey";

const GenresDropdown = () => {
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);
    const apiKey = useApiKey();
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const slug = e.target.value;
        if (slug) {
            navigate(`/games/${slug}`);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="mb-6">
            <label htmlFor="genres" className="block text-sm font-semibold text-gray-300 mb-2">
                Filtra per Genere
            </label>
            <select
                id="genres"
                name="genres"
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
            >
                <option value="">Tutti i generi</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.slug}>
                        {genre.name}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-xs text-red-400 mt-2">Errore: {error}</p>
            )}
        </div>
    );
};

export default GenresDropdown;
