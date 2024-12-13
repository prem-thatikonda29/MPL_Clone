import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  transactions: {
    type: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        amount: { type: Number, required: true },
        typeOfTransaction: {
          type: String,
          enum: ["credit", "debit"],
          required: true,
        },
        date: { type: Date, required: true },
      },
    ],
    default: [],
  },
});

const TransactionModel = mongoose.model("transactions", TransactionSchema);

export default TransactionModel;
