import LazyLoadGameImage from "./LazyLoadGameImage";

const CardGame = ({ game }) => {
  return (
    <article
      key={game.id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm"
    >
      <LazyLoadGameImage image={game.background_image} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {game.name}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Released: {game.released}
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-xl w-full hover:bg-blue-700 transition-colors duration-200">
          Acquista
        </button>
      </div>
    </article>
  );
};

export default CardGame;
