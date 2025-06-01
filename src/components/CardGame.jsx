const CardGame = ({ game }) => {
    return (
        <div>
            <img
                src={game.background_image}
                alt={game.name}
            />
            <div >
                <h2>{game.name}</h2>
                <p>
                    Rating: {game.rating} <br />
                    Rilascio: {game.released} <br />
                    Piattaforme: {game.platforms.map(p => p.platform.name).join(', ')}
                </p>
            </div>
        </div>
    );
};

export default CardGame;