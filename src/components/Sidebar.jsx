import GenresDropdown from "./GenresDropdown";

export default function Sidebar() {
    return (
        <aside className="p-4 bg-gray-50 rounded-xl shadow-md w-full max-w-xs">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtri</h2>
            <GenresDropdown />
        </aside>
    );
}