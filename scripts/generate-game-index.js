import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesDir = path.join(__dirname, "../public/games");
const indexPath = path.join(gamesDir, "index.json");

try {
  const languages = ["en", "zh"];
  const gamesByLanguage = {};
  let allBaseGameNames = new Set();

  // Process each language directory
  for (const lang of languages) {
    const langDir = path.join(gamesDir, lang);

    if (fs.existsSync(langDir)) {
      const files = fs.readdirSync(langDir);

      // Filter for JSON files
      const gameFiles = files.filter((file) => file.endsWith(".json"));

      gamesByLanguage[lang] = gameFiles;

      // Extract base game names (without language suffix)
      gameFiles.forEach((file) => {
        const baseName = file.replace("-CN.json", ".json");
        allBaseGameNames.add(baseName);
      });
    } else {
      gamesByLanguage[lang] = [];
    }
  }

  // Create index object
  const index = {
    games: Array.from(allBaseGameNames),
    gamesByLanguage,
    lastUpdated: new Date().toISOString(),
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    totalGames: allBaseGameNames.size,
    languages: languages.filter((lang) => gamesByLanguage[lang].length > 0),
  };

  // Write index.json
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));

  console.log(
    `✅ Generated games index with ${allBaseGameNames.size} base games:`
  );
  Array.from(allBaseGameNames).forEach((file) => console.log(`   - ${file}`));

  console.log(`\n📁 Games by language:`);
  languages.forEach((lang) => {
    console.log(`   ${lang}: ${gamesByLanguage[lang].length} games`);
  });
} catch (error) {
  console.error("❌ Error generating games index:", error);
  process.exit(1);
}
