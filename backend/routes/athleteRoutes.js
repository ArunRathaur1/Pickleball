const express = require("express");
const router = express.Router();
const Athlete = require("../models/Athlete");

// 📌 1️⃣ Create a new athlete
router.post("/", async (req, res) => {
  try {
    const athleteData = req.body;

    let updatedAthlete = await Athlete.findOneAndUpdate(
      { DUPRID: athleteData.DUPRID },
      athleteData,
      { new: true }
    );

    if (!updatedAthlete) {
      const newAthlete = new Athlete(athleteData);
      await newAthlete.save();
      updatedAthlete = newAthlete;
    }

    res.status(201).json(updatedAthlete);
  } catch (error) {
    console.error("Error in /athletes POST:", error.message);
    res.status(400).json({ error: error.message });
  }
});


// 📌 2️⃣ Get all athletes (with filtering and sorting)
router.get("/", async (req, res) => {
  try {
    let { gender, country, sort, name, sponsor } = req.query;
    let filter = {};

    if (gender) filter.gender = gender;
    if (country) filter.country = country;
    if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
    if (sponsor) filter["sponsors.name"] = { $regex: sponsor, $options: "i" };

    let athletesQuery = Athlete.find(filter);

    // Sort by points if specified, otherwise default sorting by points descending for leaderboard
    if (sort === "points" || !sort) {
      athletesQuery = athletesQuery.sort({ points: -1 });
    }

    const athletes = await athletesQuery;
    
    // Transform the data to match frontend expectations
    const transformedAthletes = athletes.map(athlete => ({
      ...athlete.toObject(),
      // Handle imageUrl - if it's an array, take the first image
      imageUrl: Array.isArray(athlete.imageUrl) ? athlete.imageUrl[0] : athlete.imageUrl,
      // Add points field with fallback
      points: athlete.points || 0
    }));

    res.json(transformedAthletes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 📌 3️⃣ Get a single athlete by playerid
router.get("/:playerid", async (req, res) => {
  try {
    const athlete = await Athlete.findOne({ playerid: req.params.playerid });

    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    // Transform the data to match frontend expectations
    const transformedAthlete = {
      ...athlete.toObject(),
      // Handle imageUrl - if it's an array, take the first image
      imageUrl: athlete.imageUrl,
      // Add points field with fallback
      points: athlete.points || 0
    };

    res.json(transformedAthlete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/loginid/:id", async (req, res) => {
  try {
    const athlete = await Athlete.findOne({ identifier: req.params.id });
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json(athlete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 4️⃣ Update an athlete by playerid
router.put("/:playerid", async (req, res) => {
  try {
    const updatedAthlete = await Athlete.findOneAndUpdate(
      { playerid: req.params.playerid },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAthlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }

    // Transform the response data
    const transformedAthlete = {
      ...updatedAthlete.toObject(),
      imageUrl: Array.isArray(updatedAthlete.imageUrl) ? updatedAthlete.imageUrl[0] : updatedAthlete.imageUrl,
      points: updatedAthlete.points || 0
    };

    res.json(transformedAthlete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 5️⃣ Delete an athlete by playerid
router.delete("/:playerid", async (req, res) => {
  try {
    const deletedAthlete = await Athlete.findOneAndDelete({ playerid: req.params.playerid });
    if (!deletedAthlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json({ 
      message: "Athlete deleted successfully",
      deletedAthlete: {
        playerid: deletedAthlete.playerid,
        name: deletedAthlete.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 6️⃣ Get athletes by DUPRID
router.get("/duprid/:duprid", async (req, res) => {
  try {
    const athlete = await Athlete.findOne({ DUPRID: req.params.duprid });
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found with this DUPRID" });
    }

    // Transform the data
    const transformedAthlete = {
      ...athlete.toObject(),
      imageUrl: Array.isArray(athlete.imageUrl) ? athlete.imageUrl[0] : athlete.imageUrl,
      points: athlete.points || 0
    };

    res.json(transformedAthlete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 7️⃣ Get athletes with a specific title
router.get("/title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const athletes = await Athlete.find({ 
      "titlesWon.title": { $regex: title, $options: "i" } 
    }).sort({ points: -1 }); // Sort by points descending

    if (athletes.length === 0) {
      return res.status(404).json({ message: "No athletes found with this title" });
    }

    // Transform all athletes
    const transformedAthletes = athletes.map(athlete => ({
      ...athlete.toObject(),
      imageUrl: Array.isArray(athlete.imageUrl) ? athlete.imageUrl[0] : athlete.imageUrl,
      points: athlete.points || 0
    }));

    res.json(transformedAthletes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 8️⃣ Get athletes by country
router.get("/country/:country", async (req, res) => {
  try {
    const { country } = req.params;
    const athletes = await Athlete.find({ 
      country: { $regex: country, $options: "i" } 
    }).sort({ points: -1 });

    if (athletes.length === 0) {
      return res.status(404).json({ message: "No athletes found from this country" });
    }

    const transformedAthletes = athletes.map(athlete => ({
      ...athlete.toObject(),
      imageUrl: Array.isArray(athlete.imageUrl) ? athlete.imageUrl[0] : athlete.imageUrl,
      points: athlete.points || 0
    }));

    res.json(transformedAthletes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 9️⃣ Get athletes by gender
router.get("/gender/:gender", async (req, res) => {
  try {
    const { gender } = req.params;
    const athletes = await Athlete.find({ gender }).sort({ points: -1 });

    if (athletes.length === 0) {
      return res.status(404).json({ message: "No athletes found with this gender" });
    }

    const transformedAthletes = athletes.map(athlete => ({
      ...athlete.toObject(),
      imageUrl: Array.isArray(athlete.imageUrl) ? athlete.imageUrl[0] : athlete.imageUrl,
      points: athlete.points || 0
    }));

    res.json(transformedAthletes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;