import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    // gameId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   unique: true,
    //   default: new mongoose.Types.ObjectId(),
    // },
    name: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true } // Optional: Tracks when the game was created/updated
);

const gameModel = mongoose.model("games", gameSchema);

export default gameModel;
