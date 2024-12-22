import { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/TeamSelection.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import TeamDetails from "../Components/TeamDetails";

// importing team logos
import RM from "../../public/madrid.png";
import FCB from "../../public/barca.png";
import MC from "../../public/city.png";

function TeamSelection() {
  const params = useParams();
  const [contest, setContest] = useState({});
  const [teams, setTeams] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const { user } = useContext(UserContext);
  const isSaveDisabled = selectedPlayers.length !== 11;
  const nav = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/contests/${params.contestId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching contest: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.contest) {
          setContest(data.contest);
          setTeams(data.contest.teams || []);
          console.log("Contest data:", data.contest);
        } else {
          console.error("No contest data found in response");
        }
      })
      .catch((err) => console.error("Fetch contest error:", err));
  }, [params.contestId]);

  // Filter players by type
  const getPlayersByType = (type) => {
    return selectedPlayers.filter(
      (player) => player.player.playerType === type
    );
  };

  const handleSaveTeam = async () => {
    console.log("clicked");
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    // Map selectedPlayers to the required format
    const teamData = selectedPlayers.map((player) => ({
      playerId: player.player._id, // Assuming player.player._id is the ID of the player
      playerPoints: 0, // Set initial points to 0 or based on your logic
    }));

    try {
      const response = await fetch(
        "http://localhost:8000/fantasyTeams/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            team: teamData,
            contestId: params.contestId,
            userId: user._id,
          }),
        }
      );

      const data = await response.json();
      // console.log("Team saved successfully:", data.fantasyTeam);
      console.log("Fantasy Team ID:", data.fantasyTeam._id);
      if (response.ok) {
        console.log("Team saved successfully:", data.fantasyTeam);

        // Handle successful save (e.g., redirect to another page)
        nav(`/chooseCaptain/${data.fantasyTeam._id}`);
      } else {
        console.error("Failed to save team:", data);
      }
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  return (
    <section className={styles.layout}>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.header}>
          {teams && teams.length >= 2 ? (
            <>
              <div className={styles.logo}>
                <img src={RM} alt="" className={styles.bigLogo}/>
              </div>
              <div className={styles.circle}>
                <p className={styles.circle__p}>{teams[0].teamName}</p>
              </div>
              <div className={styles.circle}>
                <p style={{ color: "##666", fontSize: "1.4rem" }}>VS</p>
              </div>
              <div className={styles.circle}>
                <p className={styles.circle__p}>{teams[1].teamName}</p>
              </div>
              <div className={styles.logo}>
                <img src={MC} alt="RM" className={styles.smallLogo} />
              </div>
            </>
          ) : (
            <div className={styles.circle}>Loading teams...</div>
          )}
        </div>
        <div className={styles.content}>
          <TeamDetails
            contest={contest}
            teams={teams}
            selectedPlayers={selectedPlayers}
            handleSelectPlayer={setSelectedPlayers}
          />
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.strikers}>
          {getPlayersByType("Striker").map((player) => (
            <div key={player.player._id} className={styles.playerBox}>
              <div className={styles.playerImg}>
                <img src={player.player.playerImage} alt="player" />
              </div>
              <p>
                {player.player.playerName.split(" ")[0]
                  ? player.player.playerName.split(" ")[0]
                  : player.player.playerName.split(" ")[1]}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.midfielders}>
          {getPlayersByType("Midfielder").map((player) => (
            <div key={player.player._id} className={styles.playerBox}>
              <div className={styles.playerImg}>
                <img src={player.player.playerImage} alt="player" />
              </div>
              {player.player.playerName.split(" ")[0]
                ? player.player.playerName.split(" ")[0]
                : player.player.playerName.split(" ")[1]}
            </div>
          ))}
        </div>
        <div className={styles.defenders}>
          {getPlayersByType("Defender").map((player) => (
            <div key={player.player._id} className={styles.playerBox}>
              <div className={styles.playerImg}>
                <img src={player.player.playerImage} alt="player" />
              </div>
              {player.player.playerName.split(" ")[0]
                ? player.player.playerName.split(" ")[0]
                : player.player.playerName.split(" ")[1]}
            </div>
          ))}
        </div>
        <div className={styles.goalkeepers}>
          {getPlayersByType("Goalkeeper").map((player) => (
            <div key={player.player._id} className={styles.playerBox}>
              <div className={styles.playerImg}>
                <img src={player.player.playerImage} alt="player" />
              </div>
              {player.player.playerName.split(" ")[0]
                ? player.player.playerName.split(" ")[0]
                : player.player.playerName.split(" ")[1]}
            </div>
          ))}
        </div>
        <button
          className={styles.saveButton}
          onClick={handleSaveTeam}
          disabled={isSaveDisabled}
        >
          Save Team
        </button>
      </div>
    </section>
  );
}

export default TeamSelection;
