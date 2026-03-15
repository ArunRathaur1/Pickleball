const express = require("express");
const router = express.Router();
const PlayerLogin = require("../models/PlayerLogin");
const ranking = require("../models/ranking");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// DUPR credentials
const clientKey = process.env.DUPR_CLIENT_KEY;
const clientSecret = process.env.DUPR_CLIENT_SECRET;
const base64Token = Buffer.from(`${clientKey}:${clientSecret}`).toString(
  "base64"
);
const tokenUrl = process.env.DUPR_TOKEN_URL;
const duprIdByEmailUrl = process.env.DUPR_ID_BY_EMAIL_URL;
const duprPlayerUrl = process.env.DUPR_PLAYER_URL;

// Step 1: Get Access Token
async function getAccessToken() {
  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "x-authorization": `${base64Token}`,
      "Content-Type": "application/json",
    },
  });
  let body;
  try {
    body = await res.json();
  } catch (err) {
    console.error("❌ Failed to parse token response JSON:", err);
    process.exit(1);
  }

  if (!res.ok) {
    console.error("❌ Token fetch failed:", body);
    process.exit(1);
  }
  console.log(body.result.token);
  console.log("✅ Access token obtained.");
  return body.result.token;
}

// Step 2: Get DUPR ID by Email
async function getDuprIdByEmail(email, token) {
  const res = await fetch(duprIdByEmailUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  console.log("📧 DUPR ID by email response:", data);

  if (!res.ok || data.status !== "SUCCESS") {
    throw new Error(data.message || "DUPR ID fetch failed");
  }

  return data.result;
}

// Step 3: Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password, DUPRID } = req.body;
    console.log("📨 Received request body:", req.body);

    // Step 1: Check if the user already exists
    const existingUser = await PlayerLogin.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      console.warn("⚠️ User already exists:", existingUser);
      return res.status(400).json({ message: "Email or Phone already exists" });
    }

    // Step 2: Get token
    const token = await getAccessToken();

    // Step 3: Get DUPR ID by email
    const officialDuprId = await getDuprIdByEmail(email, token);

    if (DUPRID && DUPRID !== officialDuprId) {
      console.warn("❌ DUPR ID mismatch:", DUPRID, "vs", officialDuprId);
      return res.status(400).json({
        message: "Provided DUPR ID does not match official records",
      });
    }

    // Step 4: Fetch full DUPR player profile
    const fetchBody = {
      duprIds: [officialDuprId],
      sortBy: "string",
    };
    console.log("📡 Fetching player profile with:", fetchBody);

    const playerDataRes = await fetch(duprPlayerUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchBody),
    });

    const rawText = await playerDataRes.text();
    console.log("🧾 Raw DUPR /player response:", rawText);

    let playerData;
    try {
      playerData = JSON.parse(rawText);
    } catch (err) {
      console.error("❌ JSON parse error:", err.message);
      throw new Error("Failed to parse DUPR /player response");
    }

    if (
      !playerDataRes.ok ||
      playerData.status !== "SUCCESS" ||
      !playerData.results.length
    ) {
      throw new Error("DUPR player data fetch failed");
    }

    const profile = playerData.results[0];
    console.log("✅ Fetched DUPR profile:", profile);

    // Step 5: Save new player to PlayerLogin
    const newPlayer = new PlayerLogin({
      name,
      phone,
      email,
      password,
      DUPRID: officialDuprId,
    });
    await newPlayer.save();

    const rankingData = {
      fullName: profile.fullName,
      firstName: profile.firstName,
      lastName: profile.lastName,
      shortAddress: profile.shortAddress,
      gender: profile.gender,
      age: profile.age,
      imageUrl: profile.imageUrl,
      ratings: profile.ratings,
      enablePrivacy: profile.enablePrivacy,
      isPlayer1: profile.isPlayer1,
      verifiedEmail: profile.verifiedEmail,
      registered: profile.registered,
      showRatingBanner: profile.showRatingBanner,
      status: profile.status,
      sponsor: profile.sponsor,
      lucraConnected: profile.lucraConnected,
    };

    const existingRanking = await ranking.findOne({ duprId: profile.duprId });

    if (existingRanking) {
      await ranking.updateOne(
        { duprId: profile.duprId },
        { $set: rankingData }
      );
      console.log("🔄 Existing ranking updated for DUPR ID:", profile.duprId);
    } else {
      const newRanking = new ranking({
        duprId: profile.duprId,
        id: profile.id,
        ...rankingData,
      });
      await newRanking.save();
      console.log("✅ New ranking saved for DUPR ID:", profile.duprId);
    }

    // Step 7: Done
    console.log("📦 Player and ranking processed");

    res.status(201).json({
      message: "Player registered successfully",
      player: newPlayer,
    });
  } catch (err) {
    console.error("💥 Registration error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
  
//Login route
router.post("/login", async (req, res) => {
  try {
    const DUPRID = req.body.DUPRID || req.body.duprid;
    const password = req.body.password;

    const player = await PlayerLogin.findOne({ DUPRID });
    if (!player) {
      return res.status(400).json({ message: "Player not found" });
    }

    if (player.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.json({ message: "Login successful", player });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Correct GET route  get the data from playerlogin model
router.get("/userdata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested ID:", id); // Should log "2L5VD4"

    const player = await PlayerLogin.findOne({ DUPRID: id }); // field is case-sensitive!

    if (!player) {
      return res.status(404).json({ message: "Player with this DUPR ID not found" });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get the data from the ranking model on the basis of duprid
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find player in Ranking model using duprId (case sensitive)
    const player = await ranking.findOne({ duprId: id });

    if (!player) {
      return res
        .status(404)
        .json({ message: "Player with this DUPR ID not found" });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//get the data of the player using playerId from the ranking model
router.get("/player/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find player in Ranking model using playerId (case sensitive)
    const player = await ranking.findOne({ playerid: id });

    if (!player) {
      return res
        .status(404)
        .json({ message: "Player with this ID not found" });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a player by ID from the athlete
router.put("/update/data", async (req, res) => {
  try {
    const { submitData } = req.body;

    if (!submitData) {
      return res.status(400).json({ message: "No data provided" });
    }

    const { DUPRID, password, ...formData } = submitData;

    // Validate required auth fields
    if (!DUPRID || !password) {
      return res.status(400).json({ message: "DUPR ID and password required" });
    }

    // Step 1: Authenticate using DUPRID and password from PlayerLogin
    const player = await PlayerLogin.findOne({ DUPRID, password });
    if (!player) {
      return res.status(401).json({ message: "Invalid DUPR ID or password" });
    }

    // Step 2: Update Ranking based on duprId
    if (!formData.duprId) {
      return res.status(400).json({ message: "duprId missing in form data" });
    }

    // Sanitize input
    delete formData._id;
    delete formData.createdAt;

    // Always mark status as PENDING
    formData.status = "PENDING";

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



// Delete a player by ID
router.delete("/:id", async (req, res) => {
  try {
    await PlayerLogin.findByIdAndDelete(req.params.id);
    res.json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
