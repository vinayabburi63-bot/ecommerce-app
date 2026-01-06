const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/* ================= GET PRODUCTS (SEARCH + FILTER + PAGINATION) ================= */
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const sort = req.query.sort || "newest";
    const keyword = req.query.search || "";
    const category = req.query.category || "All";

    /* ===== SORT ===== */
    let sortOption = { createdAt: -1 };
    if (sort === "priceLow") sortOption = { price: 1 };
    if (sort === "priceHigh") sortOption = { price: -1 };
    if (sort === "name") sortOption = { name: 1 };

    /* ===== QUERY (SAFE) ===== */
    const query = {};

    if (keyword.trim() !== "") {
      query.name = { $regex: keyword, $options: "i" };
    }

    if (category !== "All") {
      query.category = category;
    }

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load products" });
  }
});

module.exports = router;
