import express from "express";
import {
  getTransactions,
  createTransaction,
} from "../Controllers/TransactionController.js";

const transactionRouter = express.Router();

transactionRouter.get("/", getTransactions);

transactionRouter.post("/create", createTransaction);

export default transactionRouter;
