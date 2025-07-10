import { useState } from "react";
import { Link } from "react-router";
import supabase from "../supabase/supabase-client";
import NavButton from "./buttons/NavButton";
import FormButton from "./buttons/FormButton";
import logo from "../assets/rehacktor-Logo.svg";
import Searchbar from "./Searchbar";

export default function Navbar({ session }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error);
        else console.log("Signed out 👋");
    };

    const user = session?.user;
    const avatarUrl =
        user?.user_metadata?.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.username || "User")}`;

    return (
        <nav className="bg-gray-900 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Rehacktor Logo" className="w-8 h-8" />
                    <span className="hidden lg:inline text-xl font-extrabold text-white tracking-wide">
                        Rehacktor
                    </span>
                </Link>

                <div className="hidden sm:block w-full max-w-md px-4">
                    <Searchbar />
                </div>

                <div className="hidden sm:flex items-center space-x-4">
                    {session ? (
                        <div className="relative">
                            <img
                                src={avatarUrl}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full cursor-pointer border-2 border-pink-500 object-cover"
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            />
                            {userDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg text-gray-800 z-50">
                                    <div className="px-3 py-2 border-b">
                                        <p className="text-sm font-semibold truncate">
                                            {user.user_metadata.username || user.email}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <ul>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                                                onClick={() => setUserDropdownOpen(false)}
                                            >
                                                Il mio profilo
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/services"
                                                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                                            >
                                                Services
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/settings"
                                                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                                                onClick={() => setUserDropdownOpen(false)}
                                            >
                                                Impostazioni
                                            </Link>
                                        </li>
                                        <li>
                                            <FormButton
                                                type="button"
                                                variant="secondary"
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm rounded-none"
                                                onClick={() => {
                                                    handleLogout();
                                                    setUserDropdownOpen(false);
                                                }}
                                            >
                                                Logout
                                            </FormButton>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <NavButton to="/login" variant="ghost">
                                Login
                            </NavButton>
                            <NavButton to="/register" variant="primary">
                                Register
                            </NavButton>
                        </>
                    )}
                </div>

                <div className="sm:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-300 focus:outline-none text-2xl"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="sm:hidden px-4 pb-3 space-y-1 bg-gray-900">
                    <Link
                        to="/services"
                        className="block text-gray-300 hover:text-pink-500 text-sm uppercase"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Services
                    </Link>
                    {session ? (
                        <>
                            <Link
                                to="/profile"
                                className="block text-gray-300 hover:text-pink-500 text-sm"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Il mio profilo
                            </Link>
                            <Link
                                to="/settings"
                                className="block text-gray-300 hover:text-pink-500 text-sm"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Impostazioni
                            </Link>
                            <FormButton
                                type="button"
                                variant="secondary"
                                className="w-full text-left text-sm mt-1"
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                            >
                                Logout
                            </FormButton>
                        </>
                    ) : (
                        <>
                            <NavButton to="/login" variant="ghost" className="block w-full text-left">
                                Login
                            </NavButton>
                            <NavButton to="/register" variant="primary" className="block w-full text-left">
                                Register
                            </NavButton>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
