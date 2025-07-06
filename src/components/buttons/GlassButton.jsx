


export default function GlassButton({ children, onClick }) {
  return (
    <div className="button-wrap">
      <button onClick={onClick}>
        <span>{children}</span>
      </button>
      <div className="button-shadow"></div>
    </div>
  );
}
