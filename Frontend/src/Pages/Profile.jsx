import { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/Profile.module.css";
import { UserContext } from "../userContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext); // Get current user
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    walletBalance: user?.walletBalance || 0,
  });
  const [isEditable, setIsEditable] = useState({
    name: false,
    username: false,
    walletBalance: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = (field) => {
    setIsEditable((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    // Send data to the backend to update user details
    fetch("http://localhost:8000/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user); // Update context
          alert("Profile updated successfully!");
        } else {
          alert("Error updating profile: " + data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <section className={styles.container}>
      <Navbar />
      <div className={styles.profileBox}>
        {/* Left Section */}
        <div className={styles.profilePicBox}>
          <div className={styles.profilePic}></div>
          <div className={styles.profileChoices}>
            <div className={styles.profileAlt}></div>
            <div className={styles.profileAlt}></div>
            <div className={styles.profileAlt}></div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.profileDetailsBox}>
          <div className={styles.detail}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
              disabled={!isEditable.name}
            />
            <button
              className={styles.editButton}
              onClick={() => toggleEdit("name")}
            >
              {isEditable.name ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className={styles.detail}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles.inputField}
              disabled={!isEditable.username}
            />
            <button
              className={styles.editButton}
              onClick={() => toggleEdit("username")}
            >
              {isEditable.username ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className={styles.detail}>
            <label htmlFor="walletBalance">Wallet Balance:</label>
            <input
              type="number"
              id="walletBalance"
              name="walletBalance"
              value={formData.walletBalance}
              onChange={handleChange}
              className={styles.inputField}
              disabled={!isEditable.walletBalance}
            />
            <button
              className={styles.editButton}
              onClick={() => toggleEdit("walletBalance")}
            >
              {isEditable.walletBalance ? "Cancel" : "Edit"}
            </button>
          </div>

          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
