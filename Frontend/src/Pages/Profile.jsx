import { useContext, useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import styles from "../Styles/Profile.module.css";
import { UserContext } from "../userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    walletBalance: 0,
  });

  const [isEditable, setIsEditable] = useState({
    name: false,
  });

  // Sync formData with user data
  useEffect(() => {
    if (user) {
      console.log(user);
      setFormData({
        name: user.name || "",
        username: user.username || "",
        walletBalance: user.balance || 0,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = (field) => {
    if (isEditable[field]) {
      // If already editable, save the data
      handleSave();
    }
    setIsEditable((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    // Ensure formData includes username and fields to update
    if (!formData.username) {
      alert("Username is required");
      return;
    }

    fetch("http://localhost:8000/users/updateUserDetails", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statuscode === 200) {
          // If the update is successful, update the context with the new name
          setUser((prevUser) => ({
            ...prevUser, // Ensure you're keeping all the other properties of the user
            name: formData.name, // Update only the name property
          }));
          alert("Profile updated successfully!");
        } else {
          alert("Error updating profile: " + data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  if (!user) {
    return <div>Loading...</div>; // Add a loading spinner here
  }

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
            <div className={styles.profileAlt}></div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.profileDetailsBox}>
          <div className={styles.detail}>
            <label htmlFor="name">Name:</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.inputField}
                disabled={!isEditable.name}
              />
              <span
                className={styles.editIcon}
                onClick={() => toggleEdit("name")}
              >
                <FontAwesomeIcon
                  icon={isEditable.name ? faFloppyDisk : faPen}
                  className={styles.icon}
                />
              </span>
            </div>
          </div>

          {/* Username is not editable */}
          <div className={styles.detail}>
            <label htmlFor="username">Username:</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={styles.inputField}
                disabled
              />
            </div>
          </div>

          <div className={styles.detail}>
            <label htmlFor="walletBalance">Wallet Balance:</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                id="walletBalance"
                name="walletBalance"
                value={formData.walletBalance}
                className={styles.inputField}
                disabled
              />
            </div>
          </div>

          <button className={styles.saveButton} onClick={handleSave}>
            Save All Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
