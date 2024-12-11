import mongoose from "mongoose";

function dbConnector() {
  mongoose
    .connect("mongodb://localhost:27017/MPL", {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
}

export default dbConnector;
