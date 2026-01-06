const express = require("express");
const crypto = require("crypto");
const razorpay = require("../utils/razorpay");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/* CREATE PAYMENT ORDER */
router.post("/create", authMiddleware, async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);
  res.json(order);
});

/* VERIFY PAYMENT */
router.post("/verify", authMiddleware, (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expected === razorpay_signature) {
    return res.json({ success: true });
  }

  res.status(400).json({ success: false });
});

module.exports = router;


