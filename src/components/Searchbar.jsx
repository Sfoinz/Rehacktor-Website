import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";


export default function searchbar() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("query") || "";
    const [search, setSearch] = useState(queryParam);
    const [ariaInvalid, setAriaInvalid] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${search}`)
        } else {
            setAriaInvalid(true);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center justify-center mt-6 mb-6">
            <fieldset className="flex rounded-xl shadow-md overflow-hidden border border-gray-300 w-full max-w-lg">
                <input
                    type="text"
                    name="search"
                    className={`flex-grow px-4 py-2 text-sm outline-none ${ariaInvalid ? "border-red-500" : ""
                        }`}
                    placeholder={ariaInvalid ? "Inserisci qualcosa da cercare!" : "Cerca un videogioco..."}
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                    aria-invalid={ariaInvalid}
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold transition duration-200"
                >
                    Cerca
                </button>
            </fieldset>
        </form>
    )

}