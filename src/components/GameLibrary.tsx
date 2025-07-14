import React from 'react';
import { ConversationGame } from '../types/ConversationGame';

interface GameLibraryProps {
  games: ConversationGame[];
  onGameSelect: (game: ConversationGame) => void;
}

const GameLibrary: React.FC<GameLibraryProps> = ({ games, onGameSelect }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16">
      {/* Header - Bold Typography */}
      <div className="text-center max-w-2xl mb-16">
        <h1 className="text-6xl md:text-7xl font-black text-primary mb-6 tracking-tight leading-none">
          Connect
        </h1>
        <p className="text-xl text-secondary text-intimate font-light">
          Thoughtfully curated conversations<br />
          for deeper human connection
        </p>
      </div>

      {/* Games Grid - Card Focused */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {games.map((game) => (
          <div
            key={game.testType}
            className="group cursor-pointer"
            onClick={() => onGameSelect(game)}
          >
            <div className="bg-white border-intimate rounded-2xl p-10 transition-all duration-300 hover:shadow-intimate hover:-translate-y-1">
              {/* Game Title - Bold Typography */}
              <h2 className="text-3xl font-bold text-primary mb-4 tracking-tight">
                {game.app.title}
              </h2>
              
              {/* Subtitle */}
              <p className="text-lg text-secondary text-intimate mb-8 font-light">
                {game.app.subtitle}
              </p>

              {/* Question Count - Minimal Info */}
              <div className="flex justify-between items-center text-sm text-secondary mb-8">
                <span className="font-medium">
                  {game.questions.reduce((total: number, cat: any) => total + cat.questions.length, 0)} questions
                </span>
                <span className="text-xs uppercase tracking-wider opacity-60">
                  {game.app.type.replace('-', ' ')}
                </span>
              </div>

              {/* Categories - Minimal Indicators */}
              <div className="flex flex-wrap gap-2 mb-8">
                {Object.values(game.theme.categories).slice(0, 3).map((category: any, index: number) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full opacity-60"
                    style={{ backgroundColor: category.color }}
                  />
                ))}
                {Object.values(game.theme.categories).length > 3 && (
                  <div className="w-3 h-3 rounded-full bg-gray-300 opacity-40" />
                )}
              </div>

              {/* Call to Action - Minimal */}
              <div className="text-primary text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {game.ui.startScreen.startButton} →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {games.length === 0 && (
        <div className="text-center max-w-md">
          <h3 className="text-2xl font-bold text-primary mb-4">No conversations yet</h3>
          <p className="text-secondary text-intimate">
            Add conversation games to begin meaningful dialogues
          </p>
        </div>
      )}

      {/* Footer - Brand Consistency */}
      <div className="text-center opacity-40">
        <p className="text-xs uppercase tracking-wider text-secondary">
          Conversation Cards
        </p>
      </div>
    </div>
  );
};

export default GameLibrary;