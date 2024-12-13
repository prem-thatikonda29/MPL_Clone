import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    transaction: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      amount: { type: Number, required: true },
      typeOfTransaction: {
        type: String,
        enum: ["credit", "debit"],
        required: true,
      },
      date: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model("transactions", TransactionSchema);

export default TransactionModel;
