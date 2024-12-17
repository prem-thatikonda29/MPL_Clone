import { useState, useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import styles from "./FlappyBird.module.css";

function FlappyBird() {
  const [birdPosition, setBirdPosition] = useState(300);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [pipeLeft, setPipeLeft] = useState(500);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const gameHeight = 600;
  const gameWidth = 400;
  const pipeWidth = 50;
  const birdSize = 40;
  const [pipePassed, setPipePassed] = useState(false);
  const [username, setUsername] = useState("");
  const { user } = useContext(UserContext);

  const gameId = "675bebfc39d9ec117ca4b4cb";

  // Fetch leaderboard and username
  useEffect(() => {
    if (user) {
      // Fetch leaderboard for the current game
      fetch(`http://localhost:8000/leaderboards/${gameId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the fetched leaderboard data
          console.log(data);

          // Find the user entry in the leaderboard
          const userEntry = data.leaderboard.find(
            (entry) => entry.userId.toString() === user._id.toString()
          );

          if (userEntry) {
            setUsername(userEntry.username); // Set the username
            setHighScore(userEntry.highscore); // Set the highscore
          } else {
            setUsername(user.username); // If not in leaderboard, use user's current username
            setHighScore(0); // Default score if user not found
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    let gravity;
    if (!isGameOver) {
      gravity = setInterval(() => {
        setBirdPosition((prev) => Math.min(prev + 5, gameHeight - birdSize));
      }, 30);
    }
    return () => clearInterval(gravity);
  }, [isGameOver]);

  useEffect(() => {
    let pipeInterval;
    if (!isGameOver) {
      pipeInterval = setInterval(() => {
        setPipeLeft((prev) => {
          if (prev < -pipeWidth) {
            setPipeHeight(Math.random() * (gameHeight - 150));
            setPipePassed(false); // Reset flag when pipe goes offscreen
            return gameWidth; // Reset pipe position to the right
          }
          return prev - 5; // Move pipe to the left
        });
      }, 30);
    }
    return () => clearInterval(pipeInterval);
  }, [isGameOver]);

  useEffect(() => {
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

    // Check if the bird hits the bottom
    if (birdBottom >= gameHeight) {
      endGame();
    }

    // Only increment the score if the bird crosses the pipe's right edge
    if (pipeLeft + pipeWidth <= 0 && !pipePassed) {
      setScore((s) => s + 1); // Increment score only when the pipe has fully passed
      setPipePassed(true); // Mark that the pipe has been passed
    }
  }, [birdPosition, pipeLeft, pipeHeight, pipePassed]);

  useEffect(() => {
    const handleSpacebar = (event) => {
      if (event.code === "Space" && !isGameOver) {
        setBirdPosition((prev) => Math.max(prev - 50, 0));
      }
    };

    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [isGameOver]);

  const resetGame = () => {
    setIsGameOver(false);
    setBirdPosition(300); // Reset bird position
    setScore(0); // Reset score
    setPipeLeft(500); // Reset pipe position
    setPipeHeight(200); // Reset pipe height
    setPipePassed(false); // Reset pipe pass status
  };

  const endGame = () => {
    setIsGameOver(true);
    const newHighScore = Math.max(score, highScore);
    setHighScore(newHighScore);

    // Update or add the new score in the leaderboard
    fetch("http://localhost:8000/leaderboards/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        gameId: "675bebfc39d9ec117ca4b4cb", // Your gameId
        userId: user._id,
        username: user.username,
        highscore: newHighScore,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Leaderboard updated:", data))
      .catch((error) => console.error("Error updating leaderboard:", error));
  };

  return (
    <div
      className={styles.game}
      style={{ height: gameHeight, width: gameWidth }}
    >
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
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default FlappyBird;
