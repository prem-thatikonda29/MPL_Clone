import { useContext, useEffect, useState } from "react";
import { fetchNotifications } from "../firebase/fetchNotifications.js";
import { UserContext } from "../userContext";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("User ID from context:", user._id); // Log user ID to verify it's correct

    const getNotifications = async () => {
      try {
        const data = await fetchNotifications(user._id);
        console.log("Fetched notifications:", data); // Debugging fetched notifications
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getNotifications();
  }, [user._id]);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id}>
            <h4>{notification.title}</h4>
            <p>{notification.message}</p>
            <small>
              {new Date(
                notification.timestamp?.seconds * 1000
              ).toLocaleString()}
            </small>
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
