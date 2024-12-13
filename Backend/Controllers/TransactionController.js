import mongoose from "mongoose";

import TransactionModel from "../Models/TransactionModel.js";

export async function getTransactions(req, res) {
  try {
    const body = req.body;
    const transactions = await TransactionModel.find({ uid: body.uid });
    if (!transactions) {
      return res.status(404).send("No transactions found");
    }
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

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
