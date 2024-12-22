import express from "express";

import {
  createFantasyTeam,
  getFantasyTeam,
  updateCaptain,
} from "../Controllers/FantasyTeamController.js";

const FantasyRouter = express.Router();

// create a team
FantasyRouter.post("/create", createFantasyTeam);

// get a team
FantasyRouter.get("/:teamId", getFantasyTeam);

// update the captain
FantasyRouter.put("/updateCaptain/:teamId", updateCaptain);

export default FantasyRouter;
