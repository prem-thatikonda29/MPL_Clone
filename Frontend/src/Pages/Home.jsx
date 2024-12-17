import { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import Gamegrid from "../Components/Gamegrid";
import { UserContext } from "../userContext";

import styles from "../Styles/Home.module.css";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // Only fetch if user is available
    if (user && user._id) {
      fetch(`http://localhost:8000/users/${user._id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Handle user data here
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("User not logged in");
    }
  }, [user]);

  return (
    <section className={styles.container}>
      <Navbar />
      <Gamegrid />
    </section>
  );
};

export default Home;
