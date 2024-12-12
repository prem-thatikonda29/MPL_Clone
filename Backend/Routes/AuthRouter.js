import express from "express";
import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../Controllers/AuthController.js";

const authRouter = express.Router();

authRouter.get("/", getUsers);

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.get("/logout", logoutUser);

export default authRouter;
