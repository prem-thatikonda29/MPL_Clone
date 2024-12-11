import express from "express";
import { getUsers, registerUser } from "../Controllers/AuthController.js";

const authRouter = express.Router();

authRouter.get("/", getUsers);

authRouter.post("/register", registerUser);

export default authRouter;

// 