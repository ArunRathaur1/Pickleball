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

// 📤 Route to fetch & save full data for a continent
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
  } = req.query;

  const pageSize = 50;
  const skip = (parseInt(page) - 1) * pageSize;
  const filter = {};

  if (gender.toUpperCase() !== "ALL") {
    filter.gender = gender.toUpperCase();
  }

  if (continent.toUpperCase() !== "ALL") {
    filter.Continent = continent;
  }

  const ratingField =
    duprSortType === "singles" ? "ratings.singles" : "ratings.doubles";

  try {
    // Aggregation pipeline with ratingValue logic and total count
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

    const result = await Ranking.aggregate(aggregationPipeline);

    const players = result[0].paginatedResults;
    const totalPlayers = result[0].totalCount[0]?.count || 0;

    res.status(200).json({
      filters: { gender, duprSortType, continent },
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





module.exports = router;
