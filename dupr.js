// const fetch = require("node-fetch");

const clientKey = "test-ck-b76375b5-06af-43d8-fff9-0a1c6e5c9192";
const clientSecret = "test-cs-ff850f0b360f499cfa6c0d07b9d5f4dc";
const base64Token = Buffer.from(`${clientKey}:${clientSecret}`).toString(
  "base64"
);

const authUrl = "https://uat.mydupr.com/api/v1.0/token";
const ratingChangesUrl =
  "https://uat.mydupr.com/api/v1.0/subscribe/rating-changes";

async function getAccessToken() {
  const res = await fetch(authUrl, {
    method: "POST",
    headers: {
      "x-authorization": `Basic ${base64Token}`, // ✅ as per DUPR docs
    },
  });
  console.log(base64Token);

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Token request failed");
  return data.token;
}

async function getRatingChanges(token) {
  const res = await fetch(ratingChangesUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Use bearer token
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Rating change fetch failed");
  return data;
}

(async () => {
  try {
    const token = await getAccessToken();
    console.log("✅ Access Token:", token);

    const ratings = await getRatingChanges(token);
    console.log("📊 Rating Change Data:", JSON.stringify(ratings, null, 2));
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
