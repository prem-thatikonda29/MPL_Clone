import React from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/Profile.module.css";

const Profile = () => {
  return (
    <section className={styles.container}>
      <Navbar />
      <h1>Profile</h1>
    </section>
  );
};

export default Profile;
