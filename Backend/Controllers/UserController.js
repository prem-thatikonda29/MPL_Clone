import mongoose from "mongoose";
import userModel from "../Models/UserModel.js";

export async function getUsers(req, res) {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ message: "Error: " + err.message });
  }
}

export async function getUserDetails(req, res) {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ message: "Error: " + err.message });
  }
}
