import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Gamegrid.module.css";

const Gamegrid = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/games/getgames")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, [games]);

  return (
    <div className={styles.games_container}>
      {games.map((game) => (
        <div key={game._id} className={styles.game_item}>
          <Link to={`/game/${game._id}`} className={styles.link}>
            <img src={game.photo} alt={game.name} />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{game.name}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Gamegrid;
