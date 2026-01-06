const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  isAdmin: { type: Boolean, default: false },

  wallet: {
    balance: { type: Number, default: 0 },
    transactions: [
      {
        amount: Number,
        type: { type: String }, // refund / purchase
        date: { type: Date, default: Date.now },
        orderId: String,
      },
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);












