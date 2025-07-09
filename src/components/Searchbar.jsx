import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";

export default function Searchbar() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("query") || "";
    const [search, setSearch] = useState(queryParam);
    const [ariaInvalid, setAriaInvalid] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === "string" && search.trim().length !== 0) {
            navigate(`/search?query=${search}`);
        } else {
            setAriaInvalid(true);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center justify-center mt-6 mb-6"
        >
            <fieldset className="flex rounded-2xl shadow-lg overflow-hidden border border-gray-700 w-full max-w-xl bg-gray-800">
                <input
                    type="text"
                    name="search"
                    className={`flex-grow px-4 py-2 text-sm bg-transparent text-white placeholder-gray-400 focus:outline-none ${ariaInvalid ? "border-red-500" : ""
                        }`}
                    placeholder={
                        ariaInvalid ? "Inserisci qualcosa da cercare!" : "Cerca un videogioco..."
                    }
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                    aria-invalid={ariaInvalid}
                />
                <button
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 text-sm font-semibold transition duration-200"
                >
                    Cerca
                </button>
            </fieldset>
        </form>
    );
}
