import axios from "axios";
import fs from "fs";
import { load } from "cheerio";

const headers = {
  "Content-Type": "text/plain;charset=UTF-8",
  Accept: "text/x-component",
  Cookie: "JSID=...; SID=...", // ← Put your valid cookie values here
};

const BASE_URL = "https://pickleball.com/players";
const TOTAL_PAGES = 10;

const players = [];

const extractRanking = (card, label) => {
  const block = card.find(`span:contains(${label})`).parent();
  const spans = block.find("span");
  const points = parseFloat(spans.eq(1).text().trim()) || 0;
  const rank = spans.eq(3).text().trim() || "N/A";
  return { points, rank };
};

const scrapePage = async (pageNum) => {
  try {
    const response = await axios.post(
      BASE_URL,
      [{ params: `current_page=${pageNum}` }],
      { headers }
    );
    const $ = load(response.data);

    $("[data-testid='players-card']").each((_, el) => {
      const card = $(el);

      const name = card
        .find(".font-semibold")
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim();

      const profile_url = card.attr("href");
      const profile_image = card.find("img").first().attr("src");

      const metadataSpans = card.find("div.text-sm span");
      const role = metadataSpans.eq(0).text().trim();
      const gender = metadataSpans.eq(1).text().trim();

      const ageText = metadataSpans.eq(2).text().trim();
      const age = parseInt(ageText.split(":")[1]) || null;

      const dupr_id = metadataSpans.eq(4).text().trim();

      const countryName = card.find("div.ml-2 div").text().trim();
      const countryFlag = card.find("img[alt*='Flag']").attr("src");

      const ranking = {
        doubles: extractRanking(card, "Doubles"),
        mixed: extractRanking(card, "Mixed"),
        singles: extractRanking(card, "Singles"),
      };

      players.push({
        name,
        profile_url,
        profile_image,
        role,
        gender,
        age,
        dupr_id,
        country: {
          name: countryName,
          flag: countryFlag,
        },
        ranking,
      });
    });

    console.log(`✅ Page ${pageNum} scraped successfully`);
  } catch (err) {
    console.error(`❌ Failed to fetch page ${pageNum}:`, err.message);
  }
};

const scrapeAllPages = async () => {
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    await scrapePage(i);
  }

  fs.writeFileSync("players.json", JSON.stringify(players, null, 2), "utf-8");
  console.log(
    `✅ Scraped ${players.length} players across ${TOTAL_PAGES} pages`
  );
};

scrapeAllPages();
