import { useEffect, useState } from "react";
import styles from "../Styles/TeamDetails.module.css";
import PlayerDetails from "./PlayerDetails";

function TeamDetails({ contest, teams, selectedPlayers, handleSelectPlayer }) {
  const [selectedTeamData, setSelectedTeamData] = useState(null);
  const [players, setPlayers] = useState([]);

  // Fetch Team Data
  useEffect(() => {
    if (teams && teams.length > 0) {
      const teamId1 = teams[0].teamId;
      const teamId2 = teams[1].teamId;

      fetch(`http://localhost:8000/teams/${teamId1}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error fetching team: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setSelectedTeamData((prev) => ({ ...prev, team1: data }));
          }
        })
        .catch((err) => console.error("Fetch team error:", err));

      fetch(`http://localhost:8000/teams/${teamId2}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error fetching team: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setSelectedTeamData((prev) => ({ ...prev, team2: data }));
          }
        })
        .catch((err) => console.error("Fetch team error:", err));
    }
  }, [teams]);

  useEffect(() => {
    if (selectedTeamData) {
      setPlayers([
        ...(selectedTeamData?.team1?.team.players || []),
        ...(selectedTeamData?.team2?.team.players || []),
      ]);
    }
  }, [selectedTeamData]);

  return (
    <div className={styles.container}>
      {selectedTeamData ? (
        <div className={styles.teamInfo}>
          <PlayerDetails
            playerIds={players}
            selectedPlayers={selectedPlayers} // Pass selectedPlayers to PlayerDetails
            handleSelectPlayer={handleSelectPlayer} // Pass handleSelectPlayer to PlayerDetails
          />
        </div>
      ) : (
        <p>Loading team data...</p>
      )}
    </div>
  );
}

export default TeamDetails;
