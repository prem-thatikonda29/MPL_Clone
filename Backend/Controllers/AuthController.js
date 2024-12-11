// import mongoose from "mongoose";
import userModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function getUsers(req, res) {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ message: "Error: " + err.message });
  }
}

export async function registerUser(req, res) {
  try {
    const body = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ username: body.username });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Generate salt and encrypt the password
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    // Create the user in the database
    await userModel.create(body);
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error: " + err.message });
  }
}
