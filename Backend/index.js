import express from "express";
import dbConnector from "./dbConnection.js";
const app = express();

dbConnector();

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
