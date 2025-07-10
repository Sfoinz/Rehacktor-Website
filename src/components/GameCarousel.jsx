import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function GameCarousel({ games }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % games.length);
        }, 8000); // ogni 5 sec cambia slide

        return () => clearInterval(interval);
    }, [games.length]);

    if (!games.length) return null;

    return (
        <div className="relative w-full max-w-7xl mx-auto h-80 sm:h-[500px] overflow-hidden rounded-xl mb-8">
            {games.map((game, index) => (
                <div
                    key={game.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 flex flex-col justify-end">
                        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                            {game.name}
                        </h2>
                        <Link
                            to={`/games/${game.slug}/${game.id}`}
                            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg text-sm"
                        >
                            Scopri
                        </Link>
                    </div>
                </div>
            ))}

           
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
                <button
                    onClick={() =>
                        setCurrent((prev) => (prev === 0 ? games.length - 1 : prev - 1))
                    }
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                >
                    ‹
                </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
                <button
                    onClick={() => setCurrent((prev) => (prev + 1) % games.length)}
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                >
                    ›
                </button>
            </div>
        </div>
    );
}
