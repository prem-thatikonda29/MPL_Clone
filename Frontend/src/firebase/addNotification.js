import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "./firebase";

export const addNotification = async (userId, title, message) => {
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      title,
      message,
      timestamp: serverTimestamp(), // Record the time
    });
    console.log("Notification added successfully!");
  } catch (error) {
    console.error("Error adding notification:", error);
  }
};
