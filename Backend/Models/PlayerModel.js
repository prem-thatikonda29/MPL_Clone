import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: true,
    },
    playerSport: {
      type: String,
      required: true,
      enum: ["Cricket", "Football"],
    },
    playerTeam: {
      type: String,
      required: true,
    },
    playerCountry: {
      type: String,
      required: true,
    },
    playerPrice: {
      type: Number,
      required: true,
      default: 6,
      min: 1,
      max: 10,
    },
    playerRole: {
      type: String,
      required: true,
      enum: ["Captain", "Vice Captain", "Player"],
    },
    playerType: {
      type: String,
      required: true,
      enum: [
        "Batsman",
        "Bowler",
        "All-rounder",
        "Wicketkeeper",
        "Striker",
        "Midfielder",
        "Defender",
        "Goalkeeper",
      ],
    },
    playerPoints: {
      type: Number,
      default: 0,
    },
    playerImage: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const PlayerModel = mongoose.model("players", PlayerSchema);

export default PlayerModel;
