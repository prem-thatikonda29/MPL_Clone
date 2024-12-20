import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Styles/Contests.module.css";

const Contests = () => {
  const [contests, setContests] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    // Fetch contests data from the API
    fetch("http://localhost:8000/contests")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching contests: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setContests(data.contests);
      })
      .catch((error) => {
        console.error("Error fetching contests:", error);
      });
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className={styles.section}>
      {contests.length > 0 ? (
        contests.map((contest) => (
          <div key={contest._id.$oid} className={styles.card}>
            <div className={styles.card__header}>
              <h4 className={styles.card__header__title}>
                {contest.teams[0].teamName} VS {contest.teams[1].teamName}
              </h4>
              <div className={styles.card__header__date}>
                {formatDate(contest.contestStartDate)}
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.card__body}>
              <div className={styles.card__body__left}>
                <p>
                  <strong>Sport:</strong> {contest.contestSport}
                </p>
                <p>
                  <strong>Series:</strong> {contest.contestSeries}
                </p>
                <p>
                  <strong>Status:</strong> {contest.contestStatus}
                </p>
              </div>
              <div className={styles.card__body__right}>
                <button
                  className={styles.button}
                  onClick={() => {
                    nav(`/contests/${contest._id}`);
                  }}
                >
                  Participate
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading contests...</p>
      )}
    </section>
  );
};

export default Contests;
