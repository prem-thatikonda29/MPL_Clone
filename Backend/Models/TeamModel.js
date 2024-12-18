import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    teamSport: {
      type: String,
      required: true,
    },
    numOfPlayers: {
      type: Number,
      // required: true,
    },
    players: [
      {
        playerId: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
        ref: "players",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const TeamModel = mongoose.model("teams", TeamSchema);

export default TeamModel;
