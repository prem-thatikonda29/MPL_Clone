import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    transactions: {
      type: {
        id: { type: mongoose.Schema.Types.ObjectId },
        amount: { type: Number, required: true },
        typeOfTransaction: {
          type: String,
          enum: ["credit", "debit"],
          required: true,
        },
        date: { type: Date, default: Date.now },
      },
      default: [],
    },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model("transactions", TransactionSchema);

export default TransactionModel;
