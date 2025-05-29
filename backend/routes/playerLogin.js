const express = require("express");
const router = express.Router();
const PlayerLogin = require("../models/PlayerLogin");

// Register a new player
router.post("/register", async (req, res) => {
    try {
        const { name, phone, email, password, DUPRID } = req.body;

        // Check if phone or email already exists
        const existingUser = await PlayerLogin.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or Phone already exists" });
        }

        // Create new player
        const newPlayer = new PlayerLogin({ name, phone, email, password, DUPRID });
        await newPlayer.save();
        res.status(201).json({ message: "Player registered successfully", player: newPlayer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login player
router.post("/login", async (req, res) => {
    try {
        const { DUPRID, password } = req.body;

        // Check if player exists
        const player = await PlayerLogin.findOne({ DUPRID });
        if (!player || player.password !== password) {
            return res.status(400).json({ message: "Invalid duprid or password" });
        }

        const { password: _, ...playerData } = player.toObject(); // Exclude password
        res.json({ message: "Login successful", player: playerData });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get all players
router.get("/", async (req, res) => {
    try {
        const players = await PlayerLogin.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a player by ID
router.get("/:id", async (req, res) => {
    console.log("hello")
    try {
        const player = await PlayerLogin.findById(req.params.id);
        if (!player) return res.status(404).json({ message: "Player not found" });
        res.json(player);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a player
router.put("/:id", async (req, res) => {
    try {
        const updatedPlayer = await PlayerLogin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a player
router.delete("/:id", async (req, res) => {
    try {
        await PlayerLogin.findByIdAndDelete(req.params.id);
        res.json({ message: "Player deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
