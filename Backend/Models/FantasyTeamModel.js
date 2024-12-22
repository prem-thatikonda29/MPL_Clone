import mongoose from "mongoose";

const FantasyTeamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },

  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "contests",
  },

  team: [
    {
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "players",
      },
      playerPoints: {
        type: Number,
        default: 0,
      },
    },
  ],

  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "players",
    default: null,
  },
});

const FantasyTeamModel = mongoose.model("fantasyTeams", FantasyTeamSchema);

export default FantasyTeamModel;
