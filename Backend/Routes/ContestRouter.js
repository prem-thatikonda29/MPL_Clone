import express from "express";
import {
  createContest,
  getContest,
  getContests,
  getBySport,
} from "../Controllers/ContestController.js";

const ContestRouter = express.Router();

// route to get a contest
ContestRouter.get("/:contestId", getContest);

// route to get all contests
ContestRouter.get("/", getContests);

// route to get contests of a given sport
ContestRouter.get("/sport/:sport", getBySport);

// route to create a contest
ContestRouter.post("/add", createContest);

export default ContestRouter;
