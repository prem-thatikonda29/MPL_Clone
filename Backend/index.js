import express from "express";
import cors from "cors";
import dbConnector from "./dbConnection.js";

const app = express();

dbConnector();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.send("Server is running");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
