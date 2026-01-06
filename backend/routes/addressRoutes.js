const express = require("express");
const Address = require("../models/Address");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

/* GET ALL */
router.get("/", authMiddleware, async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });
  res.json(addresses);
});

/* ADD */
router.post("/", authMiddleware, async (req, res) => {
  if (req.body.isDefault) {
    await Address.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );
  }

  const address = await Address.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(address);
});

/* EDIT */
router.put("/:id", authMiddleware, async (req, res) => {
  if (req.body.isDefault) {
    await Address.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );
  }

  const updated = await Address.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

/* DELETE */
router.delete("/:id", authMiddleware, async (req, res) => {
  await Address.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* SET DEFAULT */
router.patch("/:id/default", authMiddleware, async (req, res) => {
  await Address.updateMany(
    { user: req.user._id },
    { isDefault: false }
  );

  const address = await Address.findByIdAndUpdate(
    req.params.id,
    { isDefault: true },
    { new: true }
  );

  res.json(address);
});

module.exports = router;








