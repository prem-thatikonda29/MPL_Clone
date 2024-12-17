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

export async function getGames(req, res) {
  try {
    const games = await GameModel.find();
    if (!games) {
      return res.status(404).send({ message: "Games not found" });
    }
    res.status(200).send(games);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function getGameById(req, res) {
  try {
    const { gameId } = req.params;
    const game = await GameModel.findById(gameId);

    if (!game) {
      return res.status(404).send({ message: "Game not found" });
    }

    res.status(200).send(game);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching game", error: error.message });
  }
}
