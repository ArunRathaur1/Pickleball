const express = require("express");
// Dynamic import for ESM-only node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

const clientKey = "test-ck-b76375b5-06af-43d8-fff9-0a1c6e5c9192";
const clientSecret = "test-cs-ff850f0b360f499cfa6c0d07b9d5f4dc";
const base64Token = Buffer.from(`${clientKey}:${clientSecret}`).toString(
  "base64"
);

const authUrl = "https://uat.mydupr.com/api/v1.0/token";
const ratingChangesUrl =
  "https://uat.mydupr.com/api/v1.0/subscribe/rating-changes";

async function getAccessToken() {
  console.log(base64Token)
  const res = await fetch(authUrl, {
    method: "POST",
    headers: {
      "x-authorization": `Basic ${base64Token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Token request failed");

  console.log("🔥 Bearer Token received:", data.token); // <-- Log the token here

  return data.token;
}

async function getRatingChanges(token) {
  const res = await fetch(ratingChangesUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Rating change fetch failed");
  return data;
}

// Define route
router.get("/rating-changes", async (req, res) => {
  try {
    const token = await getAccessToken();
    const ratings = await getRatingChanges(token);
    res.json({
      success: true,
      token,
      ratings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
