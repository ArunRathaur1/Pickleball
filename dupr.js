import fs from "fs";
const tokenUrl = "https://prod.mydupr.com/api/auth/v3/token";
const apiUrl = "https://prod.mydupr.com/api/club/v3/members";

const clientKey = "ck-65e264b5-721d-4381-feae-c9868ca2de08";
const clientSecret = "cs-8e4e014368754a04ffbbc8a360e3661f";

const encoded = Buffer.from(`${clientKey}:${clientSecret}`).toString("base64");

async function getAccessToken() {
  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "x-authorization": encoded,
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

  console.log("✅ Access token obtained.");
  console.log("Access Token:", body);
  return body.result.token;
}

async function callProtectedApi(token) {
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ clubId: 5577670522 }),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  let body;
  try {
    body = await res.json();
  } catch (err) {
    console.error("❌ Failed to parse API response JSON:", err);
    return;
  }

  if (!res.ok) {
    console.error("❌ API call failed:", body);
  } else {
    console.log("✅ API call successful. Data saved to members.json");
  }
}

(async () => {
  const token = await getAccessToken();
  await callProtectedApi(token);
})();
