import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

export async function changePassword(req, res) {
  try {
    // username and password
    const body = req.body;

    const user = await userModel.findOne({ username: body.username });
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }

    // Encrypting the new password
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    // Updating the password
    user.password = body.password;
    await user.save();
    res.status(200).send({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error: " + error.message });
  }
}
