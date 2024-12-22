import { useState, useEffect } from "react";
import styles from "../Styles/Captains.module.css";
import { useParams } from "react-router-dom";

const Captains = () => {
  const [players, setPlayers] = useState([]); // Initialize an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const params = useParams();

  useEffect(() => {
    const fetchTeamPlayers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/fantasyTeams/${params.teamId}`
        );
        const data = await response.json();

        // Check if fantasyTeam and team array are present
        if (data.fantasyTeam && Array.isArray(data.fantasyTeam.team)) {
          const playerIds = data.fantasyTeam.team;
        //   console.log(playerIds);

          // Fetch player details using the ObjectIds in the team array
          const playerPromises = playerIds.map((player) =>
            fetch(`http://localhost:8000/players/${player.playerId}`).then(
              (res) => res.json()
            )
          );

          // Wait for all player fetch requests to complete
          const playersData = await Promise.all(playerPromises);
          setPlayers(playersData.map((data) => data.player));
        } else {
          console.error(
            "Expected an array of player ObjectIds in fantasyTeam.team."
          );
        }
      } catch (err) {
        console.error("Error fetching team players:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamPlayers();
  }, [params.teamId]);

//   useEffect(() => {
//     console.log(players);
//   }, [players]);

  return (
    <div className={styles.captainsContainer}>
      <h1>Choose Your Captain</h1>
      <div className={styles.captainsList}>
        {/* Show loading message until data is fetched */}
        {loading ? (
          <p>Loading captains...</p>
        ) : players.length > 0 ? (
          players.map((player) => (
            <div key={player._id} className={styles.captainCard}>
              <h3>{player.playerName}</h3>
              <p>{player.playerTeam}</p>
              <button>Choose Captain</button>
            </div>
          ))
        ) : (
          <p>No players found.</p>
        )}
      </div>
    </div>
  );
};

export default Captains;
