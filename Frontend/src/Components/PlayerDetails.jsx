import { useEffect, useState } from "react";
import styles from "../Styles/PlayerDetails.module.css";

function PlayerDetails({ playerIds, selectedPlayers, handleSelectPlayer }) {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    if (playerIds && playerIds.length > 0) {
      const playerFetchPromises = playerIds.map((playerId) =>
        fetch(`http://localhost:8000/players/${playerId}`)
          .then((res) => res.json())
          .catch((err) => console.error("Fetch player error:", err))
      );

      Promise.all(playerFetchPromises)
        .then((players) => {
          const validPlayers = players.filter((player) => player !== null);
          validPlayers.sort(
            (a, b) => b.player.playerPrice - a.player.playerPrice
          );
          setPlayersData(validPlayers);
        })
        .catch((err) => console.error("Error in fetching players:", err));
    }
  }, [playerIds]);

  // Function to handle player selection and unselection
  const handlePlayerSelection = (player) => {
    const isSelected = selectedPlayers.some(
      (p) => p.player._id === player.player._id
    );
    let updatedPlayers;

    if (isSelected) {
      // If player is selected, remove it from the selection
      updatedPlayers = selectedPlayers.filter(
        (p) => p.player._id !== player.player._id
      );
    } else {
      // If player is not selected, add it to the selection
      updatedPlayers = [...selectedPlayers, player];
    }

    // Update the selected players in the parent component
    handleSelectPlayer(updatedPlayers);
  };

  return (
    <div className={styles.playersContainer}>
      {playersData.length > 0 ? (
        playersData.map((play) => (
          <div
            key={play.player._id}
            className={`${styles.playerInfo} ${
              selectedPlayers.some((p) => p.player._id === play.player._id)
                ? styles.selected
                : ""
            }`}
            onClick={() => handlePlayerSelection(play)} // Handle player selection/unselection on click
          >
            <h3>{play.player.playerName}</h3>
            <p>Team: {play.player.playerTeam}</p>
            <p>Type: {play.player.playerType}</p>
            <p>Price: {play.player.playerPrice}</p>
            <p>
              {selectedPlayers.some((p) => p.player._id === play.player._id)
                ? "Selected"
                : "Select"}
            </p>
          </div>
        ))
      ) : (
        <p>Loading players...</p>
      )}
    </div>
  );
}

export default PlayerDetails;
