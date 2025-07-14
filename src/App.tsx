import { useState, useEffect } from "react";
import "./App.css";
import { ConversationGame } from "./types/ConversationGame";
import GameLibrary from "./components/GameLibrary";
import GameInterface from "./components/GameInterface";

function App() {
  const [games, setGames] = useState<ConversationGame[]>([]);
  const [currentGame, setCurrentGame] = useState<ConversationGame | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      let gameFiles: string[] = [];
      
      // Load games from index.json
      try {
        const indexResponse = await fetch('/games/index.json');
        if (indexResponse.ok) {
          const index = await indexResponse.json();
          gameFiles = index.games || [];
        }
      } catch (indexError) {
        console.warn('Could not load index.json, using hardcoded games');
        gameFiles = ['deep-connections.json', 'relationship-check.json', 'test-love.json', 'test-love-36.json'];
      }
      
      const loadedGames: ConversationGame[] = [];
      
      for (const file of gameFiles) {
        try {
          const response = await fetch(`/games/${file}`);
          if (response.ok) {
            const game = await response.json();
            loadedGames.push(game);
          }
        } catch (error) {
          console.warn(`Failed to load game: ${file}`, error);
        }
      }
      
      setGames(loadedGames);
    } catch (error) {
      console.error('Failed to load games:', error);
    } finally {
      setLoading(false);
    }
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
        <p className="text-lg text-secondary font-light">Loading conversations...</p>
      </div>
    );
  }

  if (currentGame) {
    return (
      <GameInterface 
        game={currentGame} 
        onExit={handleGameExit}
      />
    );
  }

  return (
    <GameLibrary 
      games={games} 
      onGameSelect={handleGameSelect}
    />
  );
}

export default App;