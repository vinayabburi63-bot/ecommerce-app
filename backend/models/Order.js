const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [],
  address: Object,
  totalAmount: Number,
  paymentId: String,
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Refunded"],
    default: "Pending"
  },
  status: {
    type: String,
    enum: ["Placed", "Packed", "Shipped", "Delivered", "Refunded"],
    default: "Placed"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);








