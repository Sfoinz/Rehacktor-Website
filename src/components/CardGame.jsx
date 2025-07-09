import LazyLoadGameImage from "./LazyLoadGameImage";

const CardGame = ({ game, onClick }) => {
  return (
    <article
      key={game.id}
      onClick={() => onClick(game)}
      className="relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer w-full h-80"
    >
      <LazyLoadGameImage image={game.background_image} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 flex flex-col items-center justify-end text-center">
        <h2 className="text-lg font-semibold text-white mb-1 truncate">
          {game.name}
        </h2>
        <p className="text-sm text-gray-200">
          Released: {game.released}
        </p>
      </div>
    </article>
  );
};

export default CardGame;
