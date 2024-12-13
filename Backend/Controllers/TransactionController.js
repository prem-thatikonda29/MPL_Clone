import mongoose from "mongoose";

import TransactionModel from "../Models/TransactionModel.js";

export async function createTransaction(req, res) {
  try {
    const body = req.body;
    const newTransaction = await TransactionModel.create(body);

    if (!newTransaction) {
      return res.status(400).send("Invalid data");
    }
    res.status(201).send(newTransaction);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}