const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Onboarding = require("../models/onbordingModel");

const router = express.Router();

// Submit onboarding (create or update)
router.post("/", authMiddleware, async (req, res) => {
  console.log("📥 Onboarding POST hit with data:", req.body);
  try {
    // Check if MongoDB is connected
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      console.log(
        "⚠️  MongoDB not connected, simulating onboarding completion"
      );
      return res.status(200).json({
        message: "Onboarding completed (simulated - DB not connected).",
        simulated: true,
      });
    }

    const existing = await Onboarding.findOne({ userId: req.user.id });

    if (existing) {
      await Onboarding.updateOne({ userId: req.user.id }, req.body);
      return res.status(200).json({ message: "Updated onboarding data." });
    }

    const onboarding = new Onboarding({ ...req.body, userId: req.user.id });
    await onboarding.save();
    res.status(201).json({ message: "Onboarding completed." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error saving onboarding.", error: err.message });
  }
});

// Get current user's onboarding
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ userId: req.user.id });

    if (!onboarding) {
      return res.status(404).json({ message: "No onboarding found." });
    }

    res.status(200).json(onboarding);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching onboarding.", error: err.message });
  }
});

router.get("/test", authMiddleware, (req, res) => {
  res.json({ message: "Auth works!", user: req.user });
});

module.exports = router;
