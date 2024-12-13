import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    game: { type: String, required: true },
    gameId: {
      //   type: mongoose.Schema.Types.ObjectId,
      type: Number,
      // required: true, // Uncomment if you want to ensure gameId is provided
      // ref: "games", // Uncomment if the gameId references a games collection
    },
    leaderboard: [
      {
        username: { type: String, required: true },
        userid: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        highscore: { type: Number, required: true },
      },
    ],
    default: [],
  },
  { timestamps: true }
);

const leaderboardModel = mongoose.model("leaderboards", leaderboardSchema);

export default leaderboardModel;
