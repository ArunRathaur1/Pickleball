const express = require('express');
const Tournament = require('../models/Tournament');

const router = express.Router();

// Add a new tournament with location (lat, lng)
// Add or Update tournament by brandId
router.post('/add-or-update', async (req, res) => {
  try {
    const {
      brandId,
      name,
      organizer,
      location,
      city,
      state,
      country,
      continent,
      registrationLink,
      contactPerson,
      emailId,
      contactNo,
      format,
      registrationEnd,
      categories,
      prizeMoney,
      tier,
      startDate,
      endDate,
      imageUrl,
      description,
      locationCoords,
    } = req.body;

    if (!brandId) {
      return res.status(400).json({ message: "brandId is required" });
    }

    if (!Array.isArray(locationCoords) || locationCoords.length !== 2) {
      return res.status(400).json({ message: "Invalid location coordinates. Provide [latitude, longitude]." });
    }

    const tournamentData = {
      brandId,
      name,
      organizer,
      location,
      city,
      state,
      country,
      continent,
      registrationLink,
      contactPerson,
      emailId,
      contactNo,
      format,
      registrationEnd,
      categories,
      prizeMoney,
      tier,
      startDate,
      endDate,
      imageUrl,
      description,
      locationCoords,
    };

    const updatedOrCreated = await Tournament.findOneAndUpdate(
      { brandId }, // search by brandId
      tournamentData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Tournament added or updated successfully",
      tournament: updatedOrCreated,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all tournaments
router.get('/all', async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all pending tournaments
router.get('/pending', async (req, res) => {
    try {
        const pendingTournaments = await Tournament.find({ status: "pending" });
        res.status(200).json(pendingTournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all approved tournaments
router.get('/approved', async (req, res) => {
    try {
        const approvedTournaments = await Tournament.find({ status: "approved" });
        res.status(200).json(approvedTournaments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/brand/:brandid", async (req, res) => {
  try {
    console.log("Fetching tournaments for brandId:", req.params.brandid);
    const tournaments = await Tournament.find({ brandId: req.params.brandid });

    if (tournaments.length === 0) {
      return res
        .status(404)
        .json({ message: "No tournaments found for this brandId" });
    }

    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update tournament status (approve or reject)
router.put('/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!updatedTournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json({ message: "Tournament status updated successfully", tournament: updatedTournament });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a tournament
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTournament = await Tournament.findByIdAndDelete(req.params.id);

        if (!deletedTournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json({ message: "Tournament deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /tournaments/data/:id
router.get("/data/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;