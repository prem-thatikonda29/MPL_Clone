import { useState, useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import styles from "./FlappyBird.module.css";
import toast from "react-hot-toast";

function FlappyBird() {
  const [birdPosition, setBirdPosition] = useState(300);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [pipeLeft, setPipeLeft] = useState(500);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [pipePassed, setPipePassed] = useState(false);
  const [username, setUsername] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const { user } = useContext(UserContext);

  const gameId = "675bebfc39d9ec117ca4b4cb";
  const gameHeight = 600;
  const gameWidth = 400;
  const pipeWidth = 50;
  const birdSize = 40;

  // Fetch leaderboard and user details
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8000/leaderboards/${gameId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const userEntry = data.leaderboard.find(
            (entry) => entry.userId.toString() === user._id.toString()
          );
          setUsername(userEntry?.username || user.username);
          setHighScore(userEntry?.highscore || 0);
          const sortedLeaderboard = data.leaderboard.sort((a, b) => {
            return b.highscore - a.highscore;
          });
          setLeaderboard(sortedLeaderboard);
        })
        .catch((error) => console.error("Error fetching leaderboard:", error));
    }
  }, [user]);

  useEffect(() => {
    let gravity;
    if (gameStarted && !isGameOver) {
      gravity = setInterval(() => {
        setBirdPosition((prev) => Math.min(prev + 5, gameHeight - birdSize));
      }, 30);
    }
    return () => clearInterval(gravity);
  }, [gameStarted, isGameOver]);

  useEffect(() => {
    let pipeInterval;
    if (gameStarted && !isGameOver) {
      pipeInterval = setInterval(() => {
        setPipeLeft((prev) => {
          if (prev < -pipeWidth) {
            setPipeHeight(Math.random() * (gameHeight - 150));
            setPipePassed(false);
            return gameWidth;
          }
          return prev - 5;
        });
      }, 30);
    }
    return () => clearInterval(pipeInterval);
  }, [gameStarted, isGameOver]);

  useEffect(() => {
    if (!gameStarted) return;

    const birdTop = birdPosition;
    const birdBottom = birdPosition + birdSize;
    const pipeTop = pipeHeight;
    const pipeBottom = pipeHeight + 150;

    if (
      pipeLeft < birdSize &&
      pipeLeft + pipeWidth > 0 &&
      (birdTop < pipeTop || birdBottom > pipeBottom)
    ) {
      endGame();
    }

    if (birdBottom >= gameHeight) {
      endGame();
    }

    if (pipeLeft + pipeWidth <= 0 && !pipePassed) {
      setScore((s) => s + 1);
      setPipePassed(true);
    }
  }, [birdPosition, pipeLeft, pipeHeight, pipePassed, gameStarted]);

  useEffect(() => {
    const handleSpacebar = (event) => {
      if (event.code === "Space" && gameStarted && !isGameOver) {
        setBirdPosition((prev) => Math.max(prev - 50, 0));
      }
    };

    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [gameStarted, isGameOver]);

  const startGame = () => {
    setGameStarted(true);
    setIsGameOver(false);
    setBirdPosition(300);
    setPipeLeft(500);
    setScore(0);
    setPipePassed(false);
  };

  const endGame = () => {
    setIsGameOver(true);
    const newHighScore = Math.max(score, highScore);
    setHighScore(newHighScore);

    fetch("http://localhost:8000/leaderboards/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        gameId,
        userId: user._id,
        username,
        highscore: newHighScore,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Leaderboard updated:", data);
        toast.success("Leaderboard updated");
      })
      .catch((error) => console.error("Error updating leaderboard:", error));
  };

  return (
    <section className={styles.container}>
      <div
        className={styles.game}
        style={{ height: gameHeight, width: gameWidth }}
      >
        {!gameStarted && (
          <div className={styles.start_screen}>
            <p>Welcome to Flappy Bird!</p>
            <button onClick={startGame}>Start Game</button>
          </div>
        )}

        {gameStarted && (
          <>
            <div
              className={styles.bird}
              style={{
                top: birdPosition,
                height: birdSize,
                width: birdSize,
              }}
            ></div>
            <div
              className={styles.pipe}
              style={{
                height: pipeHeight,
                width: pipeWidth,
                left: pipeLeft,
                top: 0,
              }}
            ></div>
            <div
              className={styles.pipe}
              style={{
                height: gameHeight - pipeHeight - 150,
                width: pipeWidth,
                left: pipeLeft,
                bottom: 0,
              }}
            ></div>
            <div className={styles.score}>Score: {score}</div>
            <div className={styles.high_score}>High Score: {highScore}</div>
            {isGameOver && (
              <div className={styles.game_over}>
                <p>Game Over!</p>
                <button onClick={startGame}>Restart</button>
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.leaderboard}>
        <h2>Leaderboard</h2>
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <div key={index} className={styles.leaderboard_entry}>
              <p>
                {entry.username} - {entry.highscore}
              </p>
            </div>
          ))
        ) : (
          <p>Loading leaderboard...</p>
        )}
      </div>
    </section>
  );
}

export default FlappyBird;
