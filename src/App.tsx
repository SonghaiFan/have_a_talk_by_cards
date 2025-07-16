import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import { ConversationGame } from "./types/ConversationGame";
import GameLibrary from "./components/GameLibrary";
import GameController from "./components/GameController";

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

      // Get the language folder
      const languageFolder = i18n.language.startsWith("zh") ? "zh" : "en";

      for (const file of gameFiles) {
        try {
          // Determine the correct file path based on language
          const filePath = getLanguageSpecificFilePath(file, languageFolder);

          const response = await fetch(filePath);
          if (response.ok) {
            const game = await response.json();
            loadedGames.push(game);
          } else {
            // Fallback to English version if language-specific version doesn't exist
            const fallbackPath = `/games/en/${file}`;
            const fallbackResponse = await fetch(fallbackPath);
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
          (game) => game.testID === currentGame.testID
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

  // Helper function to get language-specific file path
  const getLanguageSpecificFilePath = (
    fileName: string,
    languageFolder: string
  ): string => {
    if (languageFolder === "en") {
      return `/games/en/${fileName}`;
    }

    // For Chinese, we need to convert the base filename to include -CN suffix
    const fileParts = fileName.split(".");
    const extension = fileParts.pop();
    const baseName = fileParts.join(".");

    return `/games/zh/${baseName}-CN.${extension}`;
  };

  const handleGameSelect = (game: ConversationGame) => {
    setCurrentGame(game);
  };

  const handleGameExit = () => {
    setCurrentGame(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900">
        <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-primary rounded-full animate-spin mb-6"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-light">
          Loading conversations...
        </p>
      </div>
    );
  }

  if (currentGame) {
    return (
      <GameController
        key={currentGame.testID}
        game={currentGame}
        onExit={handleGameExit}
      />
    );
  }

  return <GameLibrary games={games} onGameSelect={handleGameSelect} />;
}

export default App;
