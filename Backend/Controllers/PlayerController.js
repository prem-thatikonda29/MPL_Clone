import PlayerModel from "../Models/PlayerModel";

// Function to create a new player
export async function createPlayer(req, res) {
  try {
    const player = await PlayerModel.create(req.body);
    if (!player) {
      return res.status(400).send({ message: "Player not created" });
    }
    return res.status(201).send({ message: "Player created", player });
  } catch (error) {
    console.log("Error in createPlayer", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Function to get a player
export async function getPlayer(req, res) {
  try {
    const { playerId } = req.params;
    const player = await PlayerModel.findOne({ _id: playerId });
    if (!player) {
      return res.status(404).send({ message: "Player not found" });
    }
    return res.status(200).send({ message: "Player found", player });
  } catch (error) {
    console.log("Error in getPlayer", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
