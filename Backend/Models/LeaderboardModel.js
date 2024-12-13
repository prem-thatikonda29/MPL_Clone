import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    game: { type: String, required: true },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true, // Uncomment if you want to ensure gameId is provided
      ref: "games",
    },
    leaderboard: [
      {
        username: { type: String, required: true },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        highscore: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const leaderboardModel = mongoose.model("leaderboards", leaderboardSchema);

export default leaderboardModel;
