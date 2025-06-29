const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const ranking = require("../models/ranking");

// ✅ Admin Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.put("/update/data", async (req, res) => {
  try {
    const { submitData } = req.body;

    if (!submitData) {
      return res.status(400).json({ message: "No data provided" });
    }

    const { email, password, ...formData } = submitData;

    // ✅ Step 1: Validate auth input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // ✅ Step 2: Authenticate admin
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Step 3: Validate ranking update payload
    if (!formData.duprId) {
      return res.status(400).json({ message: "duprId missing in form data" });
    }

    // ✅ Step 4: Sanitize input
    delete formData._id;
    delete formData.createdAt;

    // ✅ Step 5: Force status to PENDING
    formData.status = "PENDING";

    // ✅ Step 6: Update Ranking
    const updatedRanking = await ranking.findOneAndUpdate(
      { duprId: formData.duprId },
      formData,
      { new: true }
    );

    if (!updatedRanking) {
      return res
        .status(404)
        .json({ message: "No ranking found for this duprId" });
    }

    return res.status(200).json({
      message:
        "Player ranking data updated successfully (status set to PENDING)",
      updatedRanking,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
