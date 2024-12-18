import express from "express";
import { getTeam, createTeam } from "../Controllers/TeamController.js";

const TeamRouter = express.Router();

// get a team
TeamRouter.get("/:teamId", getTeam);

// create a team
TeamRouter.post("/add", createTeam);

export default TeamRouter;
