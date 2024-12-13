import leaderboardModel from "../Models/LeaderboardModel.js";

export async function getLeaderboard(req, res) {
  try {
    const leaderboard = await leaderboardModel
      .find({
        gameId: req.params.gameId,
      })
      .sort({ "leaderboard.highscore": 1 });

    if (!leaderboard || leaderboard.length === 0) {
      res.status(404).send({ message: "Leaderboard not found" });
      return;
    }
    res.send(leaderboard);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
