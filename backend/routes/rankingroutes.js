const express = require("express");
const fs = require("fs");
const path = require("path");
const Ranking = require("../models/ranking"); 
require("dotenv").config(); 
const router = express.Router();

const tokenUrl = process.env.DUPR_TOKEN_URL;
const apiUrl = process.env.DUPR_API_URL;
const clientKey = process.env.DUPR_CLIENT_KEY;
const clientSecret = process.env.DUPR_CLIENT_SECRET;
const encoded = Buffer.from(`${clientKey}:${clientSecret}`).toString("base64");

// 🔐 Get DUPr API token
async function getAccessToken() {
  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "x-authorization": encoded,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok || !data.result?.token) {
    throw new Error("Failed to fetch access token.");
  }

  return data.result.token;
}

// 🔄 Fetch player details for a batch of duprIds
async function fetchPlayerDetails(token, duprIds) {
  const body = {
    duprIds,
    sortBy: "string",
  };

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch player details");
  }

  return data.results || [];
}

// 📥 Save player data into MongoDB
async function savePlayersToDB(players, continent) {
  const operations = players.map((player) => {
    return {
      updateOne: {
        filter: { duprId: player.duprId },
        update: {
          $set: {
            ...player,
            Continent: continent,
          },
        },
        upsert: true,
      },
    };
  });

  // Use bulkWrite for efficient batch insert/update
  await Ranking.bulkWrite(operations);
}

router.get("/full/:country", async (req, res) => {
  const { country } = req.params;
  const filePath = path.join(process.cwd(), country, "id.txt");

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const allIds = fileData
      .trim()
      .split(/[\n,]+/)
      .map((id) => id.replace(/"/g, "").trim())
      .filter(Boolean);

    const token = await getAccessToken();
    const batchSize = 1000;
    const allResults = [];

    for (let i = 0; i < allIds.length; i += batchSize) {
      const batch = allIds.slice(i, i + batchSize);
      const results = await fetchPlayerDetails(token, batch);
      allResults.push(...results);
      await savePlayersToDB(results, country);
      console.log(`✅ Saved batch ${i / batchSize + 1} for ${country}`);
    }

    res.status(200).json({
      country,
      totalPlayers: allResults.length,
      message: "All player data saved to MongoDB.",
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      message: "Failed to fetch and save player data",
      error: error.message,
    });
  }
});


//route that will automatically sync players from dupr API based on country
router.get("/sync-from-dupr/:country", async (req, res) => {
  const { country } = req.params;

  try {
    // Step 1: Get all duprIds from DB
    const allPlayers = await Ranking.find(
      { Continent: country },
      { duprId: 1, _id: 0 }
    );

    const duprIds = allPlayers.map((p) => p.duprId).filter(Boolean);

    if (duprIds.length === 0) {
      return res.status(404).json({ message: "No players found for update." });
    }

    const token = await getAccessToken();
    const batchSize = 1000;
    const updatedResults = [];

    for (let i = 0; i < duprIds.length; i += batchSize) {
      const batch = duprIds.slice(i, i + batchSize);
      const results = await fetchPlayerDetails(token, batch);

      // Filter allowed fields for update only
      const filteredResults = results.map((player) => ({
        duprId: player.duprId,
        id: player.id,
        fullName: player.fullName,
        firstName: player.firstName,
        lastName: player.lastName,
        shortAddress: player.shortAddress,
        gender: player.gender,
        age: player.age,
        imageUrl: player.imageUrl,
        ratings: player.ratings,
        enablePrivacy: player.enablePrivacy,
        isPlayer1: player.isPlayer1,
        verifiedEmail: player.verifiedEmail,
        registered: player.registered,
        showRatingBanner: player.showRatingBanner,
        status: player.status,
        sponsor: player.sponsor,
        lucraConnected: player.lucraConnected,
        Continent: country, // to ensure it remains consistent
      }));

      await savePlayersToDB(filteredResults, country);
      updatedResults.push(...filteredResults);

      console.log(`✅ Synced batch ${i / batchSize + 1} (${batch.length} IDs)`);
    }

    res.status(200).json({
      country,
      totalUpdated: updatedResults.length,
      message: "✅ Successfully synced players from DUPr API.",
    });
  } catch (error) {
    console.error("❌ Sync Error:", error);
    res.status(500).json({
      message: "Failed to sync players from DUPr API.",
      error: error.message,
    });
  }
});


// 📥 Route to get players by continent
router.get("/details/:continent", async (req, res) => {
  const { continent } = req.params;

  try {
    const players = await Ranking.find({ Continent: continent });

    if (!players || players.length === 0) {
      return res.status(404).json({
        message: `No players found for continent: ${continent}`,
      });
    }

    res.status(200).json({
      continent,
      count: players.length,
      players,
    });
  } catch (error) {
    console.error("❌ Error fetching players by continent:", error);
    res.status(500).json({
      message: "Failed to retrieve players",
      error: error.message,
    });
  }
});



router.get("/filtered-players", async (req, res) => {
  const {
    gender = "ALL",
    duprSortType = "singles",
    page = 1,
    continent = "ALL",
    status = "ALL",
    name = "",
    maxAge = "",
  } = req.query;

  const pageSize = 50;
  const skip = (parseInt(page) - 1) * pageSize;

  // Build MongoDB filter
  const filter = {};

  if (gender.toUpperCase() !== "ALL") {
    filter.gender = gender.toUpperCase();
  }

  if (continent.toUpperCase() !== "ALL") {
    filter.Continent = continent;
  }

  if (status.toUpperCase() !== "ALL") {
    filter.status = status.toUpperCase();
  }

  if (name.trim() !== "") {
    filter.fullName = { $regex: name.trim(), $options: "i" }; // case-insensitive name match
  }

  const parsedMaxAge = parseInt(maxAge);
  if (!isNaN(parsedMaxAge)) {
    filter.age = { $lte: parsedMaxAge };
  }

  const ratingField =
    duprSortType === "doubles" ? "ratings.doubles" : "ratings.singles";

  try {
    const aggregationPipeline = [
      { $match: filter },
      {
        $addFields: {
          ratingValue: {
            $cond: [
              {
                $or: [
                  { $eq: [`$${ratingField}`, "NR"] },
                  { $eq: [`$${ratingField}`, null] },
                  { $eq: [`$${ratingField}`, ""] },
                  { $not: [`$${ratingField}`] },
                ],
              },
              null,
              { $toDouble: `$${ratingField}` },
            ],
          },
        },
      },
      { $sort: { ratingValue: -1 } },
      {
        $facet: {
          paginatedResults: [{ $skip: skip }, { $limit: pageSize }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await Ranking.aggregate(aggregationPipeline, {
      allowDiskUse: true,
    });

    const players = result[0].paginatedResults;
    const totalPlayers = result[0].totalCount[0]?.count || 0;

    res.status(200).json({
      filters: { gender, duprSortType, continent, status, name, maxAge },
      page: parseInt(page),
      pageSize,
      totalPlayers,
      totalPages: Math.ceil(totalPlayers / pageSize),
      players,
    });
  } catch (error) {
    console.error("❌ Error filtering players:", error);
    res.status(500).json({
      message: "Failed to retrieve filtered players",
      error: error.message,
    });
  }
});


router.get("/status-only/:status", async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
    const upperStatus = status.toUpperCase();

    if (!validStatuses.includes(upperStatus)) {
      return res.status(400).json({ message: "Invalid status filter" });
    }

    const players = await Ranking.find({ status: upperStatus });

    res.status(200).json({ players });
  } catch (error) {
    console.error("❌ Error fetching athletes by status:", error);
    res.status(500).json({
      message: "Failed to retrieve athletes by status",
      error: error.message,
    });
  }
});

// ✅ Route to fetch players with non-empty playerid
router.get("/with-playerid", async (req, res) => {
  try {
    const players = await Ranking.find({
      playerid: { $exists: true, $ne: "" }, // ensures playerid exists and is not an empty string
    });

    res.status(200).json({ players });
  } catch (error) {
    console.error("❌ Error fetching players with playerid:", error);
    res.status(500).json({
      message: "Failed to retrieve players with playerid",
      error: error.message,
    });
  }
});

router.get("/fill-rankings", async (req, res) => {
  try {
    const players = await Ranking.find();

    const singlesList = [];
    const doublesList = [];

    for (const player of players) {
      const singlesRating = parseFloat(player?.ratings?.singles);
      const doublesRating = parseFloat(player?.ratings?.doubles);

      singlesList.push({
        _id: player._id,
        value: !isNaN(singlesRating) ? singlesRating : -1,
      });

      doublesList.push({
        _id: player._id,
        value: !isNaN(doublesRating) ? doublesRating : -1,
      });
    }

    // Sort: valid ratings (highest to lowest), then invalid ones (value = -1)
    singlesList.sort((a, b) => b.value - a.value);
    doublesList.sort((a, b) => b.value - a.value);

    const bulkOps = [];

    for (let i = 0; i < singlesList.length; i++) {
      bulkOps.push({
        updateOne: {
          filter: { _id: singlesList[i]._id },
          update: { $set: { singlerank: i + 1 } },
        },
      });
    }

    for (let i = 0; i < doublesList.length; i++) {
      bulkOps.push({
        updateOne: {
          filter: { _id: doublesList[i]._id },
          update: { $set: { doublerank: i + 1 } },
        },
      });
    }

    // Use bulkWrite for efficiency
    await Ranking.bulkWrite(bulkOps);

    res.status(200).json({
      message: "Ranks updated for all players (singles and doubles).",
      totalPlayers: players.length,
    });
  } catch (error) {
    console.error("❌ Error updating rankings:", error);
    res.status(500).json({
      message: "Failed to update rankings.",
      error: error.message,
    });
  }
});





module.exports = router;
