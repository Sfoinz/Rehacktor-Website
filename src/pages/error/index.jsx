import { Link } from "react-router";

function ErrorPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-center p-6">
            <h1 className="text-4xl font-bold text-white mb-4">Oops... qualcosa è andato storto</h1>
            <p className="text-gray-400 mb-6">La pagina che cerchi non esiste o si è verificato un errore.</p>
            <Link
                to="/"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-xl transition"
            >
                Torna alla Home
            </Link>
        </div>
    );
}

export default ErrorPage;
