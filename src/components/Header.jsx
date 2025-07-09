import Navbar from "./Navbar";

function Header() {
    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Navbar />
            </div>
        </header>
    );
}

export default Header;