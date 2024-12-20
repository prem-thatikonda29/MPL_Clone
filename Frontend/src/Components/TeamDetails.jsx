import { useEffect, useState } from "react";
import styles from "../Styles/TeamDetails.module.css";
import PlayerDetails from "./PlayerDetails";

function TeamDetails({ contest, teams }) {
  const [selectedTeamData, setSelectedTeamData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [filterType, setFilterType] = useState("All");

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
  }, [contest]);

  useEffect(() => {
    if (selectedTeamData) {
      setPlayers([
        ...(selectedTeamData?.team1?.team.players || []),
        ...(selectedTeamData?.team2?.team.players || []),
      ]);
    }
  }, [selectedTeamData]);

  useEffect(() => {
    console.log("Selected", selectedTeamData);
  }, [selectedTeamData]);

  // Filtered Players based on `filterType`
  const filteredPlayers =
    filterType === "All"
      ? players
      : players.filter((player) => player.playerType === filterType);

  return (
    <div className={styles.container}>
      {selectedTeamData ? (
        <>
          {/* Filter Buttons */}
          <div className={styles.filterButtons}>
            <button
              className={styles.filterButton}
              onClick={() => setFilterType("All")}
            >
              All
            </button>
            <button
              className={styles.filterButton}
              onClick={() => setFilterType("Striker")}
            >
              Striker
            </button>
            <button
              className={styles.filterButton}
              onClick={() => setFilterType("Midfielder")}
            >
              Midfielder
            </button>
            <button
              className={styles.filterButton}
              onClick={() => setFilterType("Defender")}
            >
              Defender
            </button>
            <button
              className={styles.filterButton}
              onClick={() => setFilterType("Goalkeeper")}
            >
              Goalkeeper
            </button>
          </div>

          <div className={styles.teamInfo}>
            <PlayerDetails playerIds={players.length > 0 ? players : []} />
          </div>
        </>
      ) : (
        <p>Loading team data...</p>
      )}
    </div>
  );
}

export default TeamDetails;
