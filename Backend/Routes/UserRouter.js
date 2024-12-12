import express from "express";
import {
  getUserDetails,
  getUsers,
  changePassword,
  updateUserDetails,
} from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUserDetails);

userRouter.put("/changePassword", changePassword);

userRouter.put("/updateUserDetails", updateUserDetails);

export default userRouter;
