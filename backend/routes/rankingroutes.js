const express =require("express");
const fs = require("fs"); ;
const path =require("path") ;

const router = express.Router();

const ITEMS_PER_PAGE = 20;

router.get("/:country/:currindex", async (req, res) => {
  const { country, currindex } = req.params;
  const page = parseInt(currindex, 10);

  if (!country || isNaN(page)) {
    return res.status(400).json({ message: "Invalid country or page index." });
  }

  const filePath = path.join(process.cwd(), country, "id.txt");

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const allIds = fileData.trim().split(/[\n,]+/); // handles comma or newline separated IDs

    const totalPages = Math.ceil(allIds.length / ITEMS_PER_PAGE);
    const start = page * ITEMS_PER_PAGE;
    const ids = allIds.slice(start, start + ITEMS_PER_PAGE);

    res.status(200).json({
      ids,
      page,
      totalPages,
      message: `Fetched ${ids.length} IDs from ${country} page ${page}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to read ID file",
      error: error.message,
    });
  }
});
module.exports = router;
