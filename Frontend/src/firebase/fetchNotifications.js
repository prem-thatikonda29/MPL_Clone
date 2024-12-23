import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import db from "./firebase";

export const fetchNotifications = async (userId) => {
  try {
    console.log("Fetching notifications for userId:", userId);
    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(10)
    );
    const querySnapshot = await getDocs(notificationsQuery);

    const notifications = [];
    querySnapshot.forEach((doc) => {
      console.log("Notification doc:", doc.id, doc.data());
      notifications.push({ id: doc.id, ...doc.data() });
    });
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
