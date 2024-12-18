import React from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/Wallet.module.css";

const Wallet = () => {
  return (
    <section className={styles.container}>
      <Navbar />
      <h1>Wallet</h1>
    </section>
  );
};

export default Wallet;
