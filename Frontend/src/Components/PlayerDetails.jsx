import { useEffect, useState } from "react";
import styles from "../Styles/PlayerDetails.module.css";

function PlayerDetails({ playerIds, selectedPlayers, handleSelectPlayer }) {
  const [playersData, setPlayersData] = useState([]);

  // Maximum allowed players for each type
  const maxPlayers = 11;
  const typeLimits = {
    Goalkeeper: 1,
    Striker: 2,
    Midfielder: 4,
    Defender: 4,
  };

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
          const playerTypeOrder = [
            "Striker",
            "Midfielder",
            "Defender",
            "Goalkeeper",
          ];

          validPlayers.sort((a, b) => {
            return (
              playerTypeOrder.indexOf(a.player.playerType) -
              playerTypeOrder.indexOf(b.player.playerType)
            );
          });
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

    const playerType = player.player.playerType;

    if (isSelected) {
      // Unselect the player
      const updatedPlayers = selectedPlayers.filter(
        (p) => p.player._id !== player.player._id
      );
      handleSelectPlayer(updatedPlayers);
      console.log("Selected Players:", selectedPlayers);
    } else {
      // Check if adding the player exceeds any limits
      const totalSelected = selectedPlayers.length;
      const typeSelected = selectedPlayers.filter(
        (p) => p.player.playerType === playerType
      ).length;

      if (totalSelected < maxPlayers && typeSelected < typeLimits[playerType]) {
        const updatedPlayers = [...selectedPlayers, player];
        handleSelectPlayer(updatedPlayers);
      } else {
        alert(
          `Cannot select more players of type ${playerType}. Limit: ${typeLimits[playerType]}`
        );
      }
    }
  };

  // Group players by type
  const groupedPlayers = playersData.reduce((acc, player) => {
    const type = player.player.playerType;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(player);
    return acc;
  }, {});

  return (
    <div className={styles.playersContainer}>
      {Object.entries(groupedPlayers).map(([type, players]) => (
        <div key={type} className={styles.playerGroup}>
          <h2 className={styles.playerTypeHeader}>{type}</h2>
          {players.map((play) => {
            const typeSelected = selectedPlayers.filter(
              (p) => p.player.playerType === play.player.playerType
            ).length;

            const isDisabled =
              typeSelected >= typeLimits[play.player.playerType] &&
              !selectedPlayers.some((p) => p.player._id === play.player._id);

            return (
              <div
                key={play.player._id}
                className={`${styles.playerInfo} ${
                  selectedPlayers.some((p) => p.player._id === play.player._id)
                    ? styles.selected
                    : ""
                } ${isDisabled ? styles.disabled : ""}`}
                onClick={!isDisabled ? () => handlePlayerSelection(play) : null}
              >
                <div className={styles.playerDetails}>
                  <h3>{play.player.playerName}</h3>
                  <p>Team: {play.player.playerTeam}</p>
                  <p>Type: {play.player.playerType}</p>
                  <p>Price: {play.player.playerPrice}</p>
                  <p>
                    {selectedPlayers.some(
                      (p) => p.player._id === play.player._id
                    )
                      ? "Selected"
                      : "Select"}
                  </p>
                </div>
                <div className={styles.playerImg}>
                  <img
                    src={play.player.playerImage}
                    alt={play.player.playerName}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default PlayerDetails;
