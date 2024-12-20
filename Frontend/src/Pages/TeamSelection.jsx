import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/TeamSelection.module.css";
import { useParams } from "react-router-dom";
import TeamDetails from "../Components/TeamDetails";

function TeamSelection() {
  const params = useParams();
  const [contest, setContest] = useState({});
  const [teams, setTeams] = useState([]);

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

  return (
    <section className={styles.layout}>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.header}>
          {teams && teams.length >= 2 ? (
            <>
              <div className={styles.circle}>{teams[0].teamName}</div>
              <div className={styles.circle}>VS</div>
              <div className={styles.circle}>{teams[1].teamName}</div>
            </>
          ) : (
            <div className={styles.circle}>Loading teams...</div>
          )}
        </div>
        <div className={styles.content}>
          <TeamDetails contest={contest} teams={teams} />
        </div>
      </div>
      <div className={styles.sidebar}></div>
    </section>
  );
}

export default TeamSelection;
