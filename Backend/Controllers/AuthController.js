// import mongoose from "mongoose";
import userModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants.js";

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

export async function loginUser(req, res) {
  try {
    const body = req.body;

    // Validate input
    if (!body.username || !body.password) {
      return res
        .status(400)
        .send({ message: "Username and password are required" });
    }

    // Check if the user exists
    const user = await userModel.findOne({ username: body.username });
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: body.username }, SECRET_KEY);

    return res.status(200).send({ message: "Login Successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

export async function logoutUser(req, res) {
  try {
    res.status(200).send({ message: "Logout Successful" });
  } catch (error) {
    res.status(400).send({ message: "Error: " + error.message });
  }
}
