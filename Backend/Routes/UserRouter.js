import express from "express";
import { getUserDetails, getUsers, changePassword } from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUserDetails);

userRouter.put("/changePassword", changePassword);

export default userRouter;
