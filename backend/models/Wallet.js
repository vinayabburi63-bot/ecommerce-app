const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    transactions: [transactionSchema],
  },
  { timestamps: true }
);

/* ======================
   INSTANCE METHODS
====================== */

// Credit money
walletSchema.methods.credit = function (amount, reason = "Wallet Credit") {
  this.balance += amount;
  this.transactions.push({
    amount,
    type: "credit",
    reason,
  });
  return this.save();
};

// Debit money
walletSchema.methods.debit = function (amount, reason = "Wallet Debit") {
  if (this.balance < amount) {
    throw new Error("Insufficient wallet balance");
  }
  this.balance -= amount;
  this.transactions.push({
    amount,
    type: "debit",
    reason,
  });
  return this.save();
};

module.exports = mongoose.model("Wallet", walletSchema);

