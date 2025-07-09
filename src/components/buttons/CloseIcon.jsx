export default function CloseIcon({ onClick, className = "" }) {
  return (
    <span
      onClick={onClick}
      className={`text-red-500 hover:text-red-400 text-base font-bold shadow-red-500/50 hover:shadow-red-400/60 cursor-pointer transition select-none ${className}`}
    >
      &times;
    </span>
  );
}