const express = require("express");
const PDFDocument = require("pdfkit");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= USER ORDERS ================= */
router.get("/", authMiddleware, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

/* ================= SINGLE ORDER ================= */
router.get("/:id", authMiddleware, async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

/* ================= PLACE ORDER AFTER PAYMENT ================= */
router.post("/place-after-payment", authMiddleware, async (req, res) => {
  const order = await Order.create({
    user: req.user._id,
    items: req.body.items,
    address: req.body.address,
    totalAmount: req.body.totalAmount,
    paymentId: req.body.paymentId,
    paymentStatus: "Paid",
    status: "Placed"
  });

  // 🔻 Reduce stock
  for (const item of req.body.items) {
    await Product.findByIdAndUpdate(item._id, {
      $inc: { stock: -item.qty }
    });
  }

  res.status(201).json(order);
});

/* ================= UPDATE ORDER STATUS ================= */
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const order = await Order.findById(req.params.id);
    order.status = req.body.status;
    await order.save();
    res.json(order);
  }
);

/* ================= REFUND ================= */
router.patch(
  "/:id/refund",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const order = await Order.findById(req.params.id);
    order.status = "Refunded";
    order.paymentStatus = "Refunded";
    await order.save();
    res.json(order);
  }
);

/* ================= ADMIN – ALL ORDERS ================= */
router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const orders = await Order.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.json(orders);
  }
);

/* ================= INVOICE PDF ================= */
router.get("/:id/invoice", authMiddleware, async (req, res) => {
  const order = await Order.findById(req.params.id);

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  doc.fontSize(20).text("MyStore Invoice", { align: "center" });
  doc.moveDown();
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Total: ₹${order.totalAmount}`);
  doc.text(`Payment: ${order.paymentStatus}`);
  doc.moveDown();

  order.items.forEach(i => {
    doc.text(`${i.name} x ${i.qty} - ₹${i.price}`);
  });

  doc.end();
});

module.exports = router;



















