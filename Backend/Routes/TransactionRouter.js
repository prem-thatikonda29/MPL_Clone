import express from "express";
import { createTransaction } from "../Controllers/TransactionController";

const transactionRouter = express.Router();



transactionRouter.post("/create", createTransaction);

export default transactionRouter;
