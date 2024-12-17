import { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import Navbar from "../Components/Navbar";
import Gamegrid from "../Components/Gamegrid";
import styles from "../Styles/Home.module.css";

const Home = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8000/users/${user._id}`)
        .then((response) => response.json())
        .then(() => {
          console.log("User data fetched");
          // console.log("User data fetched:", data);
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
      <Navbar />
      <Gamegrid />
    </section>
  );
};

export default Home;
