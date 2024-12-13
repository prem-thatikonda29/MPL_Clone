import express from "express";
import {
  addToLeaderboard,
  getLeaderboard,
} from "../Controllers/LeaderboardController.js";

const leaderboardRouter = express.Router();

// Route to get the leaderboard for a specific game
leaderboardRouter.get("/:gameId", getLeaderboard);

// Route to add a new leaderboard entry
leaderboardRouter.post("/add", addToLeaderboard);

export default leaderboardRouter;
