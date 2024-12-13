import express from "express";
import {
  addToLeaderboard,
  getLeaderboard,
} from "../Controllers/LeaderboardController.js"; // Adjust the path to your controller
import leaderboardModel from "../Models/LeaderboardModel.js";

const leaderboardRouter = express.Router();

// Route to get the leaderboard for a specific game
leaderboardRouter.get("/:gameId", getLeaderboard);

leaderboardRouter.post("/add", addToLeaderboard);

// You can add more routes here, such as posting new leaderboard entries (high scores).
// For example:
// leaderboardRouter.post("/add", addToLeaderboard);

export default leaderboardRouter;
