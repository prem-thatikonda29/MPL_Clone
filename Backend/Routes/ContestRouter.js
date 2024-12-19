import express from "express";
import { createContest, getContest } from "../Controllers/ContestController.js";

const ContestRouter = express.Router();

// route to get a contest
ContestRouter.get("/:contestId", getContest);

// route to create a contest
ContestRouter.post("/add", createContest);

export default ContestRouter;
