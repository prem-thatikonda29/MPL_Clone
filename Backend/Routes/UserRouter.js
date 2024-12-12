import express from "express";
import { getUserDetails, getUsers } from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUserDetails);

export default userRouter;
