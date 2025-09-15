import mongoose from "mongoose";
import autoIncrementId from "../plugins/custom-auto-increment-id.plugin.js";

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['credit', 'debit']
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  account: {
    type: String,
    ref: 'Account',
    required: true
  }
}, {
  timestamps: true
});

transactionSchema.plugin(autoIncrementId, { 
    modelName: 'Transaction', prefix: 'txn_', paddingLength: 3 
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;