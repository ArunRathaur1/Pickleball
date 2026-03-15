import fs from "fs/promises";

// Step 1: Read the JSON file
const raw = await fs.readFile("Oceana/dupr_ids.json", "utf-8");
const data = JSON.parse(raw);

// Step 2: Extract and format dupr_ids
const duprIds = data
  .map((player) => player.dupr_id)
  .filter(Boolean)
  .map((id) => `"${id}"`); // wrap in double quotes

// Step 3: Join with semicolon
const result = duprIds.join(",");

// Step 4: Write to TXT file
await fs.writeFile("Oceana/dupr_ids.txt", result);

console.log(
  `✅ Saved ${duprIds.length} dupr_ids to dupr_ids.txt in the format: "ID1";"ID2";...`
);
