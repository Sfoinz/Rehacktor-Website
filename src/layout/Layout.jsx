import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";

function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
            <Header />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Searchbar />
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default Layout;
