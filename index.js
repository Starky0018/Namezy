const express = require("express");
const cors = require("cors");
const { generateAdvancedNames } = require("./ai");
const { checkDomainAvailability } = require("./domainCheck");
const { logKeyword, getTrendingKeywords } = require("./keywords");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { keywords, style } = req.body;
  logKeyword(keywords); // Track trending
  try {
    const names = await generateAdvancedNames(keywords, style);
    const results = await Promise.all(
      names.map(async name => ({
        name,
        domainAvailable: await checkDomainAvailability(name)
      }))
    );
    res.json({ names: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/trending", (req, res) => {
  res.json({ trending: getTrendingKeywords() });
});

app.listen(5000, () => console.log("API running on port 5000"));