import { useContext, useEffect, useState } from "react";
import { fetchNotifications } from "../firebase/fetchNotifications.js";
import { UserContext } from "../userContext";
import styles from "../Styles/Notifications.module.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("User ID from context:", user._id);

    const getNotifications = async () => {
      try {
        const data = await fetchNotifications(user._id);
        console.log("Fetched notifications:", data);
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getNotifications();
  }, [user._id]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Notifications</h2>
      {notifications.length > 0 ? (
        <div className={styles.notificationList}>
          {notifications.map((notification) => (
            <div className={styles.notificationCard} key={notification.id}>
              <h4 className={styles.notificationTitle}>{notification.title}</h4>
              <p className={styles.notificationMessage}>
                {notification.message}
              </p>
              <small className={styles.notificationTimestamp}>
                {new Date(
                  notification.timestamp?.seconds * 1000
                ).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noNotifications}>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
