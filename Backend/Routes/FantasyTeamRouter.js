import express from "express";

import {
  createFantasyTeam,
  getFantasyTeam,
} from "../Controllers/FantasyTeamController.js";

const FantasyRouter = express.Router();

// create a team
FantasyRouter.post("/create", createFantasyTeam);

// get a team
FantasyRouter.get("/:teamId", getFantasyTeam);

export default FantasyRouter;
