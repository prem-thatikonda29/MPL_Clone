import TransactionModel from "../Models/TransactionModel.js";
import userModel from "../Models/UserModel.js";

export async function getTransactions(req, res) {
  try {
    const body = req.body;
    const transactions = await TransactionModel.find({ uid: body.uid });
    if (!transactions) {
      return res.status(404).send({ message: "No transactions found" });
    }
    res.status(200).send(transactions);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export async function createTransaction(req, res) {
  try {
    const body = req.body;
    const user = await userModel.findById(body.uid);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const newTransaction = await TransactionModel.create(body);
    if (!newTransaction) {
      return res.status(400).send({ message: "Invalid data" });
    }

    if (newTransaction.transaction.typeOfTransaction === "debit") {
      if (user.balance < newTransaction.transaction.amount) {
        return res.status(400).send({ message: "Insufficient balance" });
      }
      await user.updateOne({
        $set: { balance: user.balance - newTransaction.transaction.amount },
      });
    } else if (newTransaction.transaction.typeOfTransaction === "credit") {
      await user.updateOne({
        $set: { balance: user.balance + newTransaction.transaction.amount },
      });
    } else {
      return res.status(400).send({ message: "Invalid data" });
    }

    res.status(201).send(newTransaction);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
