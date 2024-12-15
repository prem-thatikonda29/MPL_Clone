import { useState } from "react";
import Navbar from "../Components/Navbar";
import Gamegrid from "../Components/Gamegrid";
// import { useNavigate } from "react-router-dom";

import styles from "../Styles/Home.module.css";
import { useEffect } from "react";

const Home = () => {
  const userID = localStorage.getItem("user");

  useEffect(() => {
    // getting the user
    fetch(`http://localhost:8000/users/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  return (
    <section className={styles.container}>
      <Navbar />
      <Gamegrid />
    </section>
  );
};

export default Home;
