import GenresDropdown from "./GenresDropdown";

export default function Sidebar() {
    return (
        <aside className="hidden lg:block w-64 bg-gray-800 rounded-2xl shadow-xl p-6 mr-6">
            <h2 className="text-xl font-bold text-white mb-6">Filtri</h2>
            <GenresDropdown />
        </aside>
    );
}
