import { Link } from "react-router";


export default function NavButton({ to, children, variant = "primary" }) {
    const baseStyle = "px-4 py-2 text-sm font-medium rounded transition";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        ghost: "bg-transparent text-white border border-white hover:bg-white hover:text-black",
    };

    return (
        <Link to={to} className={`${baseStyle} ${variants[variant]}`}>
            {children}
        </Link>
    );
}
