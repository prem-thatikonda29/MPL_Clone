import express from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../Controllers/AuthController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.get("/logout", logoutUser);

authRouter.post("/changePassword", changePassword);

export default authRouter;
