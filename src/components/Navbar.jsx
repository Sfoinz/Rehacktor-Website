import { Link } from "react-router";
import NavButton from "./buttons/NavButton";
import logo from "../assets/rehacktor-Logo.svg";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-gray-900 shadow-lg">
      <Link to="/" className="flex items-center space-x-3">
        <img src={logo} alt="Rehacktor Logo" className="w-10 h-10" />
        <span className="text-2xl font-extrabold text-white tracking-wide">
          Rehacktor
        </span>
      </Link>

      <div className="flex items-center space-x-6">
        <Link
          to="/services"
          className="text-gray-300 hover:text-pink-500 transition text-sm uppercase tracking-wider"
        >
          Services
        </Link>

        <NavButton to="/login" variant="ghost">
          Login
        </NavButton>
        <NavButton to="/register" variant="primary">
          Register
        </NavButton>
      </div>
    </nav>
  );
}
