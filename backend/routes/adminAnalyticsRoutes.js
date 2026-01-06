const express = require("express");
const Order = require("../models/Order");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= SALES ANALYTICS ================= */
router.get(
  "/sales",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const now = new Date();

      const startOfToday = new Date(now.setHours(0, 0, 0, 0));
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);

      const startOfMonth = new Date();
      startOfMonth.setDate(1);

      const todaySales = await Order.aggregate([
        { $match: { createdAt: { $gte: startOfToday } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]);

      const weekSales = await Order.aggregate([
        { $match: { createdAt: { $gte: startOfWeek } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]);

      const monthSales = await Order.aggregate([
        { $match: { createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]);

      res.json({
        today: todaySales[0]?.total || 0,
        week: weekSales[0]?.total || 0,
        month: monthSales[0]?.total || 0,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Analytics failed" });
    }
  }
);

module.exports = router;





