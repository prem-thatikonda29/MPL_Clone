import express from "express";
import { getPlayer, createPlayer } from "../Controllers/PlayerController.js";

const PlayerRouter = express.Router();

// get a player
PlayerRouter.get("/:playerId", getPlayer);

// post a user
PlayerRouter.post("/add", createPlayer);

export default PlayerRouter;
