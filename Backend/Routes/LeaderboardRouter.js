import express from "express";
import {
  addToLeaderboard,
  getLeaderboard,
  getUserScore,
  updateHighscore,
  initializeLeaderboard,
  checkUserLeaderboard,
} from "../Controllers/LeaderboardController.js";

const leaderboardRouter = express.Router();

// Route to initalize a new leaderboard for a game
leaderboardRouter.post("/initialize", initializeLeaderboard);

// Route to get the leaderboard for a specific game
leaderboardRouter.get("/:gameId", getLeaderboard);

// checking for user existing in the leaderboard
leaderboardRouter.get("/:gameId/user/:userId/status", checkUserLeaderboard);

// Route to get a user's score for a specific game
leaderboardRouter.get("/getscore/:gameId/:userId", getUserScore);

// Route to add a new leaderboard entry
leaderboardRouter.post("/add", addToLeaderboard);

// updating a high score
leaderboardRouter.put("/update", updateHighscore);

export default leaderboardRouter;
