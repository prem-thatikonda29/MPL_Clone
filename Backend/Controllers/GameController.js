import GameModel from "../Models/GameModel.js";

export async function addGame(req, res) {
  try {
    // Create a new game object
    const game = await GameModel.create(req.body);
    if (!game) {
      return res.status(400).send({ message: "Game not created" });
    }
    res.status(201).send({ message: "Game added successfully", game });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
