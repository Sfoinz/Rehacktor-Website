import { useContext } from "react";
import { useNavigate, Link } from "react-router";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import Navbar from "./Navbar";

export default function Header() {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error(error);
        alert("Signed out 👋");
        navigate("/");
    };

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 justify-between items-center">
                <Navbar session={session} />
            </div>
        </header>
    );
}
