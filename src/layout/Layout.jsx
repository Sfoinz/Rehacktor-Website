import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

function Layout() {

    return (
        <div>
            <Header />
            <Sidebar />
            <Outlet />
            <Footer />
        </div>
    )

}

export default Layout;