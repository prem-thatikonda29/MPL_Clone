import { useEffect, useState } from "react";
import styles from "../Styles/TeamDetails.module.css";
import PlayerDetails from "./PlayerDetails";

function TeamDetails({ contest, teams }) {
  const [selectedTeamData, setSelectedTeamData] = useState(null);
  const [players, setPlayers] = useState([]);

  // Fetch Team Data
  useEffect(() => {
    if (teams && teams.length > 0) {
      const teamId1 = teams[0].teamId;
      const teamId2 = teams[1].teamId;
      console.log("1st Team ID for fetch:", teamId1);
      console.log("2nd Team ID for fetch:", teamId2);

      fetch(`http://localhost:8000/teams/${teamId1}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error fetching team: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched Team 1 data:", data);
          if (data) {
            setSelectedTeamData((prev) => ({ ...prev, team1: data }));
          } else {
            console.error("Fetched data is null or undefined");
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
          console.log("Fetched Team 2 data:", data);
          if (data) {
            setSelectedTeamData((prev) => ({ ...prev, team2: data }));
          } else {
            console.error("Fetched data is null or undefined");
          }
        })
        .catch((err) => console.error("Fetch team error:", err));
    }
  }, [contest]);

  useEffect(() => {
    console.log("Updated Selected Team Data:", selectedTeamData);
  }, [selectedTeamData]);

  useEffect(() => {
    if (selectedTeamData) {
      //   console.log("Team 1 Players:", selectedTeamData?.team1?.team.players);
      //   console.log("Team 2 Players:", selectedTeamData?.team2?.team.players);

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
          <PlayerDetails playerIds={players.length > 0 ? players : []} />
        </div>
      ) : (
        <p>Loading team data...</p>
      )}
    </div>
  );
}

export default TeamDetails;
