import { useState, useEffect, useContext } from "react";
import styles from "../Styles/Captains.module.css";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../userContext.jsx";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebase/firebase"; // Adjust the path based on your Firebase configuration file

const Captains = () => {
  const [players, setPlayers] = useState([]); // Initialize an empty array for players
  const [loading, setLoading] = useState(true); // Track loading state
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Track the selected player
  const [saving, setSaving] = useState(false); // Track save state (loading)
  const [contest, setContest] = useState({});
  const [contestName, setContestName] = useState("");
  const { user } = useContext(UserContext);
  const params = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/fantasyTeams/${params.teamId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error fetching fantasy team: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setContest(data.fantasyTeam);

        // Fetch contest name immediately if contestId is available
        if (data.fantasyTeam.contestId) {
          return fetch(
            `http://localhost:8000/contests/${data.fantasyTeam.contestId}`
          );
        }
        throw new Error("contestId is undefined in fantasy team.");
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error fetching contest name: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setContestName(data.contest.contestName);
      })
      .catch((error) => {
        console.error("Error fetching contests or fantasy team:", error);
      });
  }, [params.teamId]);

  useEffect(() => {
    if (!contest.contestId) {
      console.warn("contest.contestId is undefined. Skipping fetch.");
      return;
    }

    fetch(`http://localhost:8000/contests/${contest.contestId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching contests: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setContestName(data.contest.contestName);
      })
      .catch((error) => {
        console.error("Error fetching contests:", error);
      });
  }, [contest]);

  useEffect(() => {
    console.log("Contest updated:", contest);
  }, [contest]);

  useEffect(() => {
    console.log("contest.contestId:", contest.contestId);
  }, [contest.contestId]);

  useEffect(() => {
    console.log("contestName:", contestName);
  }, [contestName]);

  useEffect(() => {
    const fetchTeamPlayers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/fantasyTeams/${params.teamId}`
        );
        const data = await response.json();

        if (data.fantasyTeam && Array.isArray(data.fantasyTeam.team)) {
          const playerIds = data.fantasyTeam.team;

          const playerPromises = playerIds.map((player) =>
            fetch(`http://localhost:8000/players/${player.playerId}`).then(
              (res) => res.json()
            )
          );

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

  const handleSelectPlayer = (playerId) => {
    setSelectedPlayer(
      (prevPlayer) => (prevPlayer === playerId ? null : playerId) // Toggle selection
    );
  };

  const handleSaveCaptain = async () => {
    if (selectedPlayer) {
      try {
        setSaving(true);

        // Send the selected captain to the server to update the fantasy team
        const response = await fetch(
          `http://localhost:8000/fantasyTeams/updateCaptain/${params.teamId}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              teamId: params.teamId,
              captainId: selectedPlayer,
            }),
          }
        );

        if (response.ok) {
          // Toast success message
          const message = `Team added for contest ${contestName} successfully`;
          toast.success(message, { duration: 3000 });

          // Add notification to Firestore
          try {
            await addDoc(collection(db, "notifications"), {
              userId: user._id,
              title: "Captain Selected",
              message,
              timestamp: serverTimestamp(),
            });
            console.log("Notification added to Firestore successfully.");
          } catch (err) {
            console.error("Error adding notification to Firestore:", err);
          }

          // Navigate to home after delay
          setTimeout(() => {
            nav("/home");
          }, 3000); // Delay navigation by 3 seconds
        } else {
          console.log("Failed to save captain.");
        }
      } catch (err) {
        console.error("Error saving captain:", err);
      } finally {
        setSaving(false);
      }
    } else {
      alert("Please select a captain before saving.");
    }
  };

  return (
    <div className={styles.captainsContainer}>
      <Toaster />
      <h1>Choose Your Captain</h1>
      <div className={styles.captainsList}>
        {loading ? (
          <p>Loading captains...</p>
        ) : players.length > 0 ? (
          players.map((player) => (
            <div
              key={player._id}
              className={`${styles.captainCard} ${
                selectedPlayer === player._id ? styles.selected : ""
              } ${
                player.playerTeam === "Real Madrid"
                  ? styles.realMadrid
                  : player.playerTeam === "Manchester City"
                  ? styles.city
                  : ""
              }`}
              onClick={() => handleSelectPlayer(player._id)}
            >
              <div className={styles.overlay}></div>
              <div>
                <h3>{player.playerName}</h3>
                <p>{player.playerTeam}</p>
              </div>
              <button
                disabled={
                  selectedPlayer !== null && selectedPlayer !== player._id
                }
              >
                {selectedPlayer === player._id
                  ? "Unselect Captain"
                  : "Choose Captain"}
              </button>
            </div>
          ))
        ) : (
          <p>No players found.</p>
        )}
      </div>

      {/* Show save button only if a player is selected */}
      {selectedPlayer && (
        <div className={styles.saveContainer}>
          <button
            className={styles.saveButton}
            onClick={handleSaveCaptain}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Captain"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Captains;
