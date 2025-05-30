const express = require("express");
const router = express.Router();
const BrandLogin = require('../models/brand'); // adjust path as needed

// ------------------ SIGNUP ------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Check if email or phone already exists
    const existingPlayer = await BrandLogin.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingPlayer) {
      return res
        .status(400)
        .json({ message: "Player already exists with this email or phone." });
    }

    // You can hash password here using bcrypt if needed
    const newPlayer = new BrandLogin({ name, phone, email, password });
    await newPlayer.save();

    const { password: _, ...playerData } = newPlayer.toObject(); // Exclude password from response
    res.status(201).json({ message: "Signup successful", player: playerData });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// ------------------ LOGIN ------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const player = await BrandLogin.findOne({ email });
    if (!player || player.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const { password: _, ...playerData } = player.toObject(); // Exclude password from response
    res.json({ message: "Login successful", player: playerData });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

module.exports = router;
