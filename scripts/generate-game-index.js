import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesDir = path.join(__dirname, '../public/games');
const indexPath = path.join(gamesDir, 'index.json');

try {
  // Read all files in the games directory
  const files = fs.readdirSync(gamesDir);
  
  // Filter for JSON files (excluding index.json itself)
  const gameFiles = files.filter(file => 
    file.endsWith('.json') && file !== 'index.json'
  );
  
  // Create index object
  const index = {
    games: gameFiles,
    lastUpdated: new Date().toISOString(),
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    totalGames: gameFiles.length
  };
  
  // Write index.json
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  
  console.log(`✅ Generated games index with ${gameFiles.length} games:`);
  gameFiles.forEach(file => console.log(`   - ${file}`));
  
} catch (error) {
  console.error('❌ Error generating games index:', error);
  process.exit(1);
}