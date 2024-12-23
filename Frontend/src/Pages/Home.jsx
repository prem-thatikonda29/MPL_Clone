import { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import Navbar from "../Components/Navbar";
import Notifications from "../Components/Notifications";
import Gamegrid from "../Components/Gamegrid";
import styles from "../Styles/Home.module.css";

const Home = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8000/users/${user._id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("User data fetched:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [user]);

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <section className={styles.container}>
      <Navbar className={styles.navbar} />
      <div className={styles.mainContent}>
        <Gamegrid className={styles.gameGrid} />
        <Notifications className={styles.notifications} />
      </div>
    </section>
  );
};

export default Home;
