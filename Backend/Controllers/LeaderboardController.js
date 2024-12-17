import leaderboardModel from "../Models/LeaderboardModel.js";
import mongoose from "mongoose";
import gameModel from "../Models/GameModel.js";

// Function to initialize the leaderboard for a game
export async function initializeLeaderboard(req, res) {
  try {
    const { gameId } = req.body;

    // Validate input
    if (!gameId) {
      return res.status(400).send({ message: "Invalid gameId" });
    }

    // Check if the leaderboard already exists for the game
    const existingLeaderboard = await leaderboardModel.findOne({ gameId });
    if (existingLeaderboard) {
      return res
        .status(400)
        .send({ message: "Leaderboard already exists for this game" });
    }

    // Check if the game exists
    const game = await gameModel.findById(gameId);
    if (!game) {
      return res.status(404).send({ message: "Game not found" });
    }

    // Create the leaderboard
    const leaderboard = new leaderboardModel({
      gameId,
      game: game.name,
      leaderboard: [], // Initialize the leaderboard as empty
    });

    // Save the leaderboard
    await leaderboard.save();

    res
      .status(200)
      .send({ message: "Leaderboard created successfully", leaderboard });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Error: " + error.message });
  }
}

// endpoint to fetch the leaderboard for a game
export const getLeaderboard = async (req, res) => {
  try {
    const { gameId } = req.params;

    const leaderboard = await leaderboardModel
      .findOne({ gameId })
      .sort({ "leaderboard.highscore": -1 });

    if (!leaderboard) {
      return res
        .status(404)
        .json({ message: "Leaderboard not found for this game" });
    }

    return res.status(200).json({ leaderboard: leaderboard.leaderboard });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching leaderboard" });
  }
};

// endpoint to fetch a user's score for a game
export const getUserScore = async (req, res) => {
  try {
    const { gameId, userId } = req.params;

    const leaderboard = await leaderboardModel.findOne({ gameId });

    if (!leaderboard) {
      return res
        .status(404)
        .json({ message: "Leaderboard not found for this game" });
    }

    const userEntry = leaderboard.leaderboard.find(
      (entry) => entry.userId.toString() === userId.toString()
    );

    if (!userEntry) {
      return res.status(404).json({ message: "User not found in leaderboard" });
    }

    return res.status(200).json({ score: userEntry.highscore });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching user's score" });
  }
};

// Function to check if the user exists in the leaderboard
export async function checkUserLeaderboard(req, res) {
  try {
    const { gameId, userId } = req.params;

    // Validate `gameId` and `userId`
    if (
      !mongoose.Types.ObjectId.isValid(gameId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).send({ message: "Invalid gameId or userId" });
    }

    // Fetch the leaderboard for the game
    const leaderboard = await leaderboardModel.findOne({
      gameId: new mongoose.Types.ObjectId(gameId),
    });

    if (!leaderboard) {
      return res.status(404).send({ message: "Game not found" });
    }

    // Find the user's score within the leaderboard
    const userEntry = leaderboard.leaderboard.find(
      (entry) => entry.userId.toString() === userId
    );

    if (!userEntry) {
      // If user doesn't exist, return default highscore of 0
      return res.send({ username: "User not found", highscore: 0 });
    }

    // Return the user's score if they exist
    res.send({ username: userEntry.username, score: userEntry.highscore });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: error.message });
  }
}

// Function to add a new highscore to the leaderboard
export const addToLeaderboard = async (req, res) => {
  try {
    const { gameId, userId, username, highscore } = req.body;

    // Find the leaderboard for the game
    const leaderboard = await leaderboardModel.findOne({ gameId });

    if (!leaderboard) {
      // If no leaderboard exists for the game, create a new one
      const newLeaderboard = new leaderboardModel({
        gameId,
        game: "Flappy Bird", // Or dynamically pass the game name
        leaderboard: [
          {
            username,
            userId,
            highscore,
          },
        ],
      });

      await newLeaderboard.save();
      return res
        .status(200)
        .json({ message: "Leaderboard created", leaderboard: newLeaderboard });
    }

    // If the leaderboard exists, check if the user is already in the leaderboard
    const existingUserIndex = leaderboard.leaderboard.findIndex(
      (entry) => entry.userId.toString() === userId.toString()
    );

    if (existingUserIndex !== -1) {
      // If the user already exists in the leaderboard, update their highscore
      leaderboard.leaderboard[existingUserIndex].highscore = Math.max(
        leaderboard.leaderboard[existingUserIndex].highscore,
        highscore
      );
      await leaderboard.save();
      return res
        .status(200)
        .json({ message: "Leaderboard updated", leaderboard });
    }

    // If the user doesn't exist, add them to the leaderboard
    leaderboard.leaderboard.push({
      username,
      userId,
      highscore,
    });

    await leaderboard.save();
    return res
      .status(200)
      .json({ message: "Leaderboard updated", leaderboard });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating leaderboard" });
  }
};

// Function to update the highscore for a user in the leaderboard
export async function updateHighscore(req, res) {
  try {
    const { gameId, userId, highscore } = req.body;

    // Find the game and update the user's highscore if it's higher
    const game = await leaderboardModel.findOneAndUpdate(
      { gameId, "leaderboard.userId": userId }, // Match game and user
      {
        $max: { "leaderboard.$.highscore": highscore }, // Update only if the new score is higher
      },
      { new: true } // Return the updated document
    );

    if (!game) {
      return res
        .status(404)
        .send({ message: "Game or user not found in leaderboard" });
    }

    res.status(200).send({
      message: "Highscore updated successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Error: " + error.message });
  }
}
