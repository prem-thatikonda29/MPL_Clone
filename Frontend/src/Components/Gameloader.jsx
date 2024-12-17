import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";

// Map game components with their database `component` field
const gameComponents = {
  FlappyBird: React.lazy(() => import("../Games/FlappyBird.jsx")),
  Rummy: React.lazy(() => import("../Games/Rummy.jsx")),
  SnakesLadders: React.lazy(() => import("../Games/SnakesLadders.jsx")),
};

function GameLoader() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/games/getgame/${id}`
        );
        if (!response.ok) throw new Error("Game not found");
        const data = await response.json();
        setGame(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!game) return <h2>Game not found</h2>;

  // Get the game component from the map
  const GameComponent = gameComponents[game.component];

  if (!GameComponent) return <h2>Game Component Not Found</h2>;

  return (
    <div>
      <Suspense fallback={<h2>Loading Game...</h2>}>
        <h1>{game.name}</h1>
        <p>{game.description}</p>
        <GameComponent />
      </Suspense>
    </div>
  );
}

export default GameLoader;
