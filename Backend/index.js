import express from "express";
import cors from "cors";
import authRouter from "./Routes/AuthRouter.js";
import userRouter from "./Routes/UserRouter.js";
import dbConnector from "./dbConnection.js";

const app = express();

dbConnector();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.get("/health", (req, res) => {
  res.send("Server is running");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
