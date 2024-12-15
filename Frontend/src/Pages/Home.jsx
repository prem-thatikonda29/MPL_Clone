import { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

import styles from "../Styles/Home.module.css";

const Home = () => {
  return (
    <section className={styles.container}>
      <Navbar />
    </section>
  );
};

export default Home;
