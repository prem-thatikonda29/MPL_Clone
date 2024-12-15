import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Game name
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    }, // Unique game ID
    description: { type: String, required: true }, // Description of the game
    photo: { type: String, required: true }, // URL of the game photo
  },
  { timestamps: true } // Optional: Tracks when the game was created/updated
);

const gameModel = mongoose.model("games", gameSchema);

export default gameModel;
