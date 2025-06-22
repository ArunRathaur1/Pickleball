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

const allDuprIds = [];

for (let pageNo = 1; pageNo <= 19; pageNo++) {
  const formData = new URLSearchParams({
    view_type: "list",
    coaches_input: "",
    avail: "",
    player_country: "",
    ntrp_rat_type: "",
    avaibility_date: "",
    continent: "OC", // Asia
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

    json.data.forEach((player, index) => {
      if (player.dupr_id) {
        allDuprIds.push({
          name: player.name,
          dupr_id: player.dupr_id,
          city: player.city,
          country: player.countryname,
        });
      }
    });

    console.log(`✅ Page ${pageNo} - Added ${json.data.length} players`);
  } catch (err) {
    console.error(`❌ Error on page ${pageNo}:`, err.message);
  }
}
await fs.writeFile("Oceana/dupr_ids.json", JSON.stringify(allDuprIds, null, 2));
console.log(`\n💾 Done! Saved ${allDuprIds.length} dupr_ids to dupr_ids.json`);
