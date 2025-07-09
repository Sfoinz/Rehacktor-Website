export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <div className="text-lg font-bold text-white mb-2">REHACKTOR</div>
                    <div className="text-sm">
                        &copy; {new Date().getFullYear()}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                    <div>
                        <h3 className="text-white font-semibold mb-4">Giochi</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-500">Novità</a></li>
                            <li><a href="#" className="hover:text-pink-500">Più popolari</a></li>
                            <li><a href="#" className="hover:text-pink-500">In arrivo</a></li>
                            <li><a href="#" className="hover:text-pink-500">Sconti</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Supporto</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-500">Centro Assistenza</a></li>
                            <li><a href="#" className="hover:text-pink-500">FAQ</a></li>
                            <li><a href="#" className="hover:text-pink-500">Resi e rimborsi</a></li>
                            <li><a href="#" className="hover:text-pink-500">Contattaci</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Legale</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-500">Privacy</a></li>
                            <li><a href="#" className="hover:text-pink-500">Termini di servizio</a></li>
                            <li><a href="#" className="hover:text-pink-500">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-pink-500">Licenze</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-700 pt-6">
                    <div className="flex justify-center space-x-6 text-sm">
                        <a href="#" className="hover:text-pink-500">Facebook</a>
                        <a href="#" className="hover:text-pink-500">Twitter</a>
                        <a href="#" className="hover:text-pink-500">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
