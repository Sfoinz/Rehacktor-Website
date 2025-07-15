import { Link } from "react-router";
import CloseIcon from "./buttons/CloseIcon";

export default function GameModal({ game, onClose }) {
  if (!game) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl w-full h-[80vh] rounded-2xl overflow-hidden shadow-xl">
        <img
          src={game.background_image}
          alt={game.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        <div className="relative z-10 flex flex-col h-full justify-between p-6">

          <div className="flex justify-between">
            <CloseIcon onClick={onClose} className="absolute top-1 left-3" />
          </div>

          <div className="flex justify-between items-end w-full">

            <p className="text-white text-xs">
              Released: {game.released}
            </p>


            <div className="flex flex-col items-end text-right">
              <h2 className="text-3xl font-bold text-white mb-4">{game.name}</h2>

              <Link
                to={`/games/${game.slug}/${game.id}`}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition inline-block"
              >
                Scopri
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
