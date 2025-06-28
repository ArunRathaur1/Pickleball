import fs from "fs/promises";

const baseUrl = "https://pickleball.global/index.php";
const headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  "X-Requested-With": "XMLHttpRequest",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
  Origin: "https://pickleball.global",
  Referer: "https://pickleball.global/players",
};

const allPlayers = [];

for (let pageNo = 1; pageNo <= 1; pageNo++) {
  const formData = new URLSearchParams({
    view_type: "list",
    coaches_input: "",
    avail: "",
    player_country: "",
    ntrp_rat_type: "",
    avaibility_date: "",
    continent: "OC", // Oceania
    event_types: "0",
    inlineCheckbox1: "",
    ntrp_rat: "0",
    page_no: pageNo.toString(),
    per_page: "100",
    player_gender: "",
    sort_by: "",
    sort_direction: "",
  });

  console.log(`📦 Fetching page ${pageNo}...`);
  try {
    const res = await fetch(
      `${baseUrl}?option=com_socialnet&task=lookingforgames.fetch_players`,
      {
        method: "POST",
        headers,
        body: formData,
      }
    );

    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      console.log("🚫 No players found on this page.");
      continue;
    }

    allPlayers.push(...json.data);

    console.log(`✅ Page ${pageNo} - Added ${json.data.length} players`);
  } catch (err) {
    console.error(`❌ Error on page ${pageNo}:`, err.message);
  }
}

// Save full raw player data to file
await fs.mkdir("Oceana", { recursive: true });
await fs.writeFile(
  "Oceana/raw_players.json",
  JSON.stringify(allPlayers, null, 2)
);

console.log(
  `\n💾 Done! Saved ${allPlayers.length} full player records to raw_players.json`
);
