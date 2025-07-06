import GlassButton from "./buttons/GlassButton";
import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from 'react-router';

const CardGame = ({ game }) => {
  return (
    <article
      key={game.id}
      className="relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-[1.03]  hover:-translate-y-[2px] hover:translate-x-[1px] w-full h-80"
    >
      <LazyLoadGameImage image={game.background_image} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 flex flex-col items-center justify-end text-center">
        <h2 className="text-lg font-semibold text-white mb-1 truncate">
          {game.name}
        </h2>
        <p className="text-sm text-gray-200 mb-2">
          Released: {game.released}
        </p>
        <GlassButton><Link to={`/games/${game.slug}/${game.id}`}>Acquista</Link></GlassButton>
      </div>
    </article>
  );
};

export default CardGame;
