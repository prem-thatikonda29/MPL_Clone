import express from "express";
import { addGame } from "../Controllers/GameController.js"; 

const gameRouter = express.Router();

// Route to add a new game
gameRouter.post("/add", addGame);

// You can add more routes here, e.g., for getting a game by ID, updating a game, etc.
// For example:
// gameRouter.get("/:gameId", getGameById);

export default gameRouter;
