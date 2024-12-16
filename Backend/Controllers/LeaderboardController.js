import leaderboardModel from "../Models/LeaderboardModel.js";
import mongoose from "mongoose";
import gameModel from "../Models/GameModel.js";

export async function getLeaderboard(req, res) {
  try {
    const leaderboard = await leaderboardModel
      .findOne({ gameId: req.params.gameId })
      .select("leaderboard") // Select only the leaderboard field
      .populate("gameId", "name description"); // Optional: Populate gameId with name and description if you want

    if (!leaderboard) {
      res.status(404).send({ message: "Leaderboard not found" });
      return;
    }

    const sortedLeaderboard = leaderboard.leaderboard.sort(
      (a, b) => b.highscore - a.highscore
    );
    res.send(sortedLeaderboard); // Return only the `leaderboard` field
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function getUserScore(req, res) {
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
      return res.status(404).send({ message: "User score not found" });
    }

    res.send({ username: userEntry.username, score: userEntry.highscore });
  } catch (error) {
    // console.error("Error:", error);
    res.status(500).send({ message: error.message });
  }
}

export async function addToLeaderboard(req, res) {
  try {
    const { gameId, userId, highscore, username } = req.body;

    if (!gameId || !userId || !username || highscore === undefined) {
      return res.status(400).send({ message: "Invalid input data" });
    }

    // Check if the gameId exists in the games collection
    const game = await gameModel.findById(gameId);
    if (!game) {
      return res.status(404).send({ message: "Game not found" });
    }

    // Find the leaderboard for the specified gameId
    let leaderboard = await leaderboardModel.findOne({ gameId });

    // If leaderboard does not exist for the game, create a new leaderboard document
    if (!leaderboard) {
      leaderboard = new leaderboardModel({
        gameId: gameId,
        game: game.name, // Optionally populate the game details like name
        leaderboard: [], // Initialize the leaderboard array
      });
    }

    // Check if the user already exists in the leaderboard
    const existingPlayer = leaderboard.leaderboard.find(
      (entry) => entry.userId.toString() === userId
    );

    if (existingPlayer) {
      // If player already exists, update the highscore if the new score is higher
      if (existingPlayer.highscore < highscore) {
        existingPlayer.highscore = highscore;
      }
    } else {
      // If player doesn't exist, add a new entry
      leaderboard.leaderboard.push({
        username: username,
        userId: userId,
        highscore: highscore,
      });
    }

    // Sort the leaderboard by highscore in descending order
    leaderboard.leaderboard.sort((a, b) => b.highscore - a.highscore);

    // Save the updated leaderboard
    await leaderboard.save();

    // Return a success response with the updated leaderboard
    res.status(200).send({
      message: "Leaderboard updated successfully",
      leaderboard: leaderboard.leaderboard,
    });
  } catch (error) {
    res.status(500).send({ message: "Error: " + error.message });
  }
}

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
