import { useEffect, useState } from "react";
import styles from "../Styles/PlayerDetails.module.css";

function PlayerDetails({ playerIds }) {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    if (playerIds && playerIds.length > 0) {
      // Log player IDs to check what is passed
      //   console.log("Player IDs received:", playerIds);

      // Create an array of fetch promises for each playerId
      const playerFetchPromises = playerIds.map((playerId) =>
        fetch(`http://localhost:8000/players/${playerId}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Error fetching player: ${res.statusText}`);
            }
            return res.json();
          })
          .then((data) => {
            // console.log("Player data fetched:", data);
            if (data) {
              return data;
            } else {
              console.error("No player data found in response");
              return null;
            }
          })
          .catch((err) => {
            console.error("Fetch player error:", err);
            return null; // Return null in case of an error
          })
      );

      // Once all fetches are completed, set the players data
      Promise.all(playerFetchPromises)
        .then((players) => {
          // Check the array of players
          //   console.log("Fetched players:", players);

          // Filter out null values
          const validPlayers = players.filter((player) => player !== null);

          // Check valid players
          // console.log("Valid players:", validPlayers);

          // sorting the players based on their price
          validPlayers.sort(
            (a, b) => b.player.playerPrice - a.player.playerPrice
          );

          // Set the valid players to state
          setPlayersData(validPlayers);
        })
        .catch((err) => console.error("Error in fetching players:", err));
    } else {
      console.error("No player IDs provided or playerIds is empty.");
    }
  }, [playerIds]);

  // useEffect(() => {
  //   console.log("Players Data:", playersData);
  // }, [playersData]);

  return (
    <div className={styles.playersContainer}>
      {playersData.length > 0 ? (
        playersData.map((play) => (
          <div key={play.player._id} className={styles.playerInfo}>
            <h3>{play.player.playerName}</h3>
            <p>Team: {play.player.playerTeam}</p>
            <p>Type: {play.player.playerType}</p>
            <p>Price: {play.player.playerPrice}</p>
            {/* <img src={play.player.playerImage} alt={play.playerName} /> */}
          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default PlayerDetails;
