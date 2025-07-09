import { Link } from "react-router";
import NavButton from "./buttons/NavButton";
import logo from "../assets/rehacktor-Logo.svg"

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between w-full">

            <Link to="/" className="flex items-center space-x-2">
                <img src={logo} alt="Rehacktor Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-white">Rehacktor</span>
            </Link>

            <div className="flex items-center space-x-4">

                <NavButton to="/login" variant="ghost">Login</NavButton>
                <NavButton to="/register" variant="primary">Register</NavButton>
            </div>
        </nav>
    );
}
