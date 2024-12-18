import mongoose from "mongoose";

const ContestSchema = new mongoose.Schema({
  contestName: {
    type: String,
    required: true,
  },
  contestSport: {
    type: String,
    required: true,
  },
  contestSeries: {
    type: String,
    required: true,
  },
  contestStartDate: {
    type: Date,
    required: true,
  },
  contestEndDate: {
    type: Date,
    required: true,
  },
  contestStatus: {
    type: String,
    required: true,
    enum: ["Upcoming", "Live", "Completed"],
  },
  contestWinner: {
    type: String,
    required: true,
    default: "Not Declared",
  },
  teams: [
    {
      teamId: mongoose.Schema.Types.ObjectId,
      teamNames: String,
      ref: "teams",
      default: null,
    },
  ],
});

const ContestModel = mongoose.model("contests", ContestSchema);

export default ContestModel;
