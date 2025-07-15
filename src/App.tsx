import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import { ConversationGame } from "./types/ConversationGame";
import GameLibrary from "./components/GameLibrary";
import GameInterface from "./components/GameInterface";

function App() {
  const { i18n } = useTranslation();
  const [games, setGames] = useState<ConversationGame[]>([]);
  const [currentGame, setCurrentGame] = useState<ConversationGame | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, [i18n.language]); // React to language changes

  const loadGames = async () => {
    setLoading(true);
    try {
      let gameFiles: string[] = [];

      // Load games from index.json
      try {
        const indexResponse = await fetch("/games/index.json");
        if (indexResponse.ok) {
          const index = await indexResponse.json();
          gameFiles = index.games || [];
        }
      } catch (indexError) {
        console.warn("Could not load index.json, using hardcoded games");
        gameFiles = [
          "deep-connections.json",
          "relationship-check.json",
          "test-love.json",
          "test-love-36.json",
          "we-are-not-strangers.json",
          "we-are-not-really-strangers.json",
        ];
      }

      const loadedGames: ConversationGame[] = [];

      // Filter to only process base English files (not language-specific versions)
      const baseGameFiles = gameFiles.filter((file) => {
        // Only process files that don't have language suffixes
        return !file.includes("-CN.json") && !file.includes("-TW.json");
      });

      for (const file of baseGameFiles) {
        try {
          // Determine the language-specific file name
          const languageFile = getLanguageSpecificFile(file, i18n.language);

          const response = await fetch(`/games/${languageFile}`);
          if (response.ok) {
            const game = await response.json();
            loadedGames.push(game);
          } else {
            // Fallback to English version if language-specific version doesn't exist
            const fallbackResponse = await fetch(`/games/${file}`);
            if (fallbackResponse.ok) {
              const game = await fallbackResponse.json();
              loadedGames.push(game);
            }
          }
        } catch (error) {
          console.warn(`Failed to load game: ${file}`, error);
        }
      }

      setGames(loadedGames);

      // If there's a current game, update it with the new language version
      if (currentGame) {
        const updatedGame = loadedGames.find(
          (game) => game.testType === currentGame.testType
        );
        if (updatedGame) {
          setCurrentGame(updatedGame);
        }
      }
    } catch (error) {
      console.error("Failed to load games:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get language-specific file name
  const getLanguageSpecificFile = (
    fileName: string,
    language: string
  ): string => {
    if (language === "en") {
      return fileName; // English files don't have suffix
    }

    const fileParts = fileName.split(".");
    const extension = fileParts.pop();
    const baseName = fileParts.join(".");

    // Map language codes to file suffixes
    const languageSuffixes: { [key: string]: string } = {
      zh: "-CN",
      "zh-CN": "-CN",
      "zh-TW": "-CN", // Use same Chinese version for now
    };

    const suffix = languageSuffixes[language] || "";
    return `${baseName}${suffix}.${extension}`;
  };

  const handleGameSelect = (game: ConversationGame) => {
    setCurrentGame(game);
  };

  const handleGameExit = () => {
    setCurrentGame(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="w-8 h-8 border-2 border-subtle border-t-primary rounded-full animate-spin mb-6"></div>
        <p className="text-lg text-secondary font-light">
          Loading conversations...
        </p>
      </div>
    );
  }

  if (currentGame) {
    return (
      <GameInterface
        key={currentGame.testType}
        game={currentGame}
        onExit={handleGameExit}
      />
    );
  }

  return <GameLibrary games={games} onGameSelect={handleGameSelect} />;
}

export default App;
