import express from "express";
import { getUsers, loginUser, registerUser } from "../Controllers/AuthController.js";

const authRouter = express.Router();

authRouter.get("/", getUsers);

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser)

export default authRouter;