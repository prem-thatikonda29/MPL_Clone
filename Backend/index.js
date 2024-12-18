import express from "express";
import cors from "cors";
import authRouter from "./Routes/AuthRouter.js";
import userRouter from "./Routes/UserRouter.js";
import transactionRouter from "./Routes/TransactionRouter.js";
import gameRouter from "./Routes/GameRouter.js";
import leaderboardRouter from "./Routes/LeaderboardRouter.js";
import playerRouter from "./Routes/PlayerRouter.js";
import teamRouter from "./Routes/TeamRouter.js";
import dbConnector from "./dbConnection.js";

import verifyToken from "./middlewares/authMiddleware.js";

const app = express();

dbConnector();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.use("/games", gameRouter);

app.use("/leaderboards", leaderboardRouter);

app.use("/players", playerRouter);

app.use("/teams", teamRouter);

app.use(verifyToken);

app.use("/transactions", transactionRouter);

app.get("/health", (req, res) => {
  res.send("Server is running");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
