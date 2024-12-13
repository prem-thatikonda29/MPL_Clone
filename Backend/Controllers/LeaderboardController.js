import leaderboardModel from "../Models/LeaderboardModel.js";
import gameModel from "../Models/GameModel.js";

export async function getLeaderboard(req, res) {
  try {
    const leaderboard = await leaderboardModel
      .findOne({ gameId: req.params.gameId }) 
      .select("leaderboard") // Select only the `leaderboard` field
      .populate("gameId", "name description") // Optional: Populate gameId with name and description if you want
      .sort({ "leaderboard.highscore": -1 }); // Sort leaderboard by highscore in descending order

    if (!leaderboard) {
      res.status(404).send({ message: "Leaderboard not found" });
      return;
    }

    res.send(leaderboard.leaderboard); // Return only the `leaderboard` field
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function addToLeaderboard(req, res) {
  try {
    const { gameId, username, userId, highscore } = req.body;

    // Check if the gameId exists in the games collection
    const game = await gameModel.findById(gameId);
    if (!game) {
      return res.status(400).send({ message: "Game not found" });
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
    res
      .status(200)
      .send({ message: "Leaderboard updated successfully", leaderboard });
  } catch (error) {
    res.status(500).send({ message: "Error: " + error.message });
  }
}
