import { Link } from "react-router";

export default function NavButton({
    to,
    children,
    variant = "primary",
    className = "",
    disabled = false,
}) {
    const baseStyle =
        "px-4 py-2 text-sm font-semibold rounded-xl transition duration-200 ease-in-out shadow";

    const variants = {
        primary:
            "bg-pink-600 text-white hover:bg-pink-700 focus:ring-2 focus:ring-pink-500",
        secondary:
            "bg-gray-700 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-400",
        ghost:
            "bg-transparent text-white border border-gray-500 hover:bg-gray-700 focus:ring-2 focus:ring-gray-400",
    };

    const disabledStyle = "opacity-50 pointer-events-none";

    return (
        <Link
            to={to}
            className={`${baseStyle} ${variants[variant]} ${disabled ? disabledStyle : ""} ${className}`}
        >
            {children}
        </Link>
    );
}
