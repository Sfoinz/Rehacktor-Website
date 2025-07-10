export default function FormButton({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyle =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl transition duration-200 ease-in-out shadow appearance-none";

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
    <button
      type="submit"
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? disabledStyle : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
