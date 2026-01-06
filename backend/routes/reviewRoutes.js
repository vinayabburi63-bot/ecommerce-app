const express = require("express");
const Review = require("../models/Review");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= GET ALL REVIEWS FOR PRODUCT ================= */
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "email");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to load reviews" });
  }
});

/* ================= GET RATING SUMMARY ================= */
router.get("/:productId/summary", async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    });

    const total = reviews.length;
    const avg =
      total === 0
        ? 0
        : reviews.reduce((s, r) => s + r.rating, 0) / total;

    const breakdown = [5, 4, 3, 2, 1].map(star => ({
      star,
      count: reviews.filter(r => r.rating === star).length,
    }));

    res.json({ avg, total, breakdown });
  } catch {
    res.status(500).json({ message: "Failed to load rating summary" });
  }
});

/* ================= ADD REVIEW ================= */
router.post("/:productId", authMiddleware, async (req, res) => {
  try {
    const review = await Review.create({
      user: req.user._id,
      product: req.params.productId,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json(review);
  } catch {
    res.status(500).json({ message: "Review failed" });
  }
});

module.exports = router;







