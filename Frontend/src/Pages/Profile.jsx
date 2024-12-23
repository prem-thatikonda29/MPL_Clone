import { useContext, useState, useEffect } from "react";
import Navbar from "../Components/Navbar"; // Assuming Navbar is in the Components folder
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

  useEffect(() => {
    if (user) {
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
      handleSave();
    }
    setIsEditable((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
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
          setUser((prevUser) => ({
            ...prevUser,
            name: formData.name,
          }));
          alert("Profile updated successfully!");
        } else {
          alert("Error updating profile: " + data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.container}>
      <Navbar className={styles.navbar} />
      <div className={styles.profileContent}>
        <div className={styles.profileBox}>
          {/* Profile Picture and Details */}
          <div className={styles.profilePicBox}>
            <div className={styles.profilePic}></div>
            {/* <div className={styles.profileChoices}> */}
              {/* <div className={styles.profileAlt}></div>
              <div className={styles.profileAlt}></div>
              <div className={styles.profileAlt}></div>
              <div className={styles.profileAlt}></div> */}
            {/* </div> */}
          </div>
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
            <div className={styles.detail}>
              <label htmlFor="username">Username:</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
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
      </div>
    </section>
  );
};

export default Profile;
