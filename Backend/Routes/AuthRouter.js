import express from "express";
import { getUsers } from "../Controllers/AuthController.js";

const authRouter = express.Router();

authRouter.get("/", getUsers);

export default authRouter;
