const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    addressType: String,
    isDefault: { type: Boolean, default: false },
    lat: Number,
    lng: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);


