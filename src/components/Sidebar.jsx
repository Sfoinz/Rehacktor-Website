import GenresDropdown from "./GenresDropdown";
import Searchbar from "./Searchbar";

export default function Sidebar() {
    const platforms = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mac", "Linux"];
    const sortOptions = ["Popolarità", "Data di uscita", "Rating"];

    return (
        <>

            <aside className="hidden lg:block w-64 bg-gray-800 rounded-2xl shadow-xl p-6 mr-6">
                <h2 className="text-xl font-bold text-white mb-6">Filtri</h2>

                <div className="mb-6">
                    <GenresDropdown />
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Piattaforme</h3>
                    <ul className="space-y-2">
                        {platforms.map((platform) => (
                            <li key={platform}>
                                <button
                                    className="w-full px-4 py-2 bg-gray-700 rounded-xl text-sm text-gray-300 hover:bg-pink-600 hover:text-white transition"
                                >
                                    {platform}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Ordina per</h3>
                    <select className="w-full px-4 py-2 bg-gray-700 rounded-xl text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500">
                        {sortOptions.map((option) => (
                            <option key={option} value={option.toLowerCase()}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </aside>


            <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-3 lg:hidden shadow-inner z-50">
                <div className="mb-2">
                    <GenresDropdown />
                </div>
                <div className="block sm:hidden mt-4">
                    <Searchbar />
                </div>
            </div>
        </>
    );
}
