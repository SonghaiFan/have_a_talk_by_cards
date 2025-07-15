import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ConversationGame } from "../types/ConversationGame";
import Card from "./Card";

interface GameLibraryProps {
  games: ConversationGame[];
  onGameSelect: (game: ConversationGame) => void;
}

const GameLibrary: React.FC<GameLibraryProps> = ({ games, onGameSelect }) => {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16">
      {/* Header - Bold Typography */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl mb-16"
      >
        {/* App Title with Inline Icon */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.img
            src="/card-icon.svg"
            alt="CueCards Icon"
            className="w-20 h-20 md:w-24 md:h-24 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <h1 className="text-6xl md:text-7xl font-black text-primary tracking-tight leading-none">
            CueCards
          </h1>
        </div>
        <p className="text-xl text-secondary text-intimate font-light">
          Thoughtfully curated conversations
          <br />
          for deeper human connection
        </p>
      </motion.div>

      {/* Games Grid - Animated Card Packs */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {games.map((game, index) => (
          <motion.div
            key={game.testType}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            className="cursor-pointer relative"
            onHoverStart={() => setHoveredGame(game.testType)}
            onHoverEnd={() => setHoveredGame(null)}
            onClick={() => onGameSelect(game)}
          >
            {/* Card Pack Container */}
            <div className="relative">
              {/* Background Cards - Dynamic based on categories */}
              <AnimatePresence>
                {hoveredGame === game.testType && (
                  <>
                    {Object.entries(game.theme.categories).map(
                      (categoryEntry, cardIndex) => {
                        const [categoryKey, category] = categoryEntry;

                        return (
                          <Card
                            key={categoryKey}
                            size="medium"
                            variant="game"
                            className="absolute top-0 left-0"
                            style={{
                              aspectRatio: "400/250",
                              backgroundColor: category.color,
                            }}
                            initial={{
                              x: 0,
                              y: 0,
                              rotate: 0,
                              scale: 1,
                              opacity: 0,
                            }}
                            animate={{
                              x: -12 * (cardIndex + 1),
                              y: -16 * (cardIndex + 1),
                              rotate: -2.5 * (cardIndex + 1),
                              scale: 1 - 0.04 * (cardIndex + 1),
                              opacity: 1,
                            }}
                            exit={{
                              x: 0,
                              y: 0,
                              rotate: 0,
                              scale: 1,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                              delay: 0.05 + cardIndex * 0.02,
                            }}
                          />
                        );
                      }
                    )}
                  </>
                )}
              </AnimatePresence>

              {/* Main Card - Always visible (White Cover) */}
              <Card
                size="medium"
                variant="game"
                className="relative z-10 cursor-pointer"
                style={{
                  aspectRatio: "400/250",
                  backgroundColor: "#ffffff",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                onClick={() => onGameSelect(game)}
                onMouseEnter={() => setHoveredGame(game.testType)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                {/* Game Title */}
                <h2 className="text-2xl font-bold text-black mb-4 text-center leading-tight">
                  {game.ui.startScreen.title}
                </h2>

                {/* Game Description */}
                <p className="text-sm text-gray-700 font-medium text-center leading-relaxed">
                  {game.ui.startScreen.description[0]}
                </p>

                {/* Category Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {Object.values(game.theme.categories).map(
                    (category, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                        title={category.name}
                      />
                    )
                  )}
                </div>

                {/* Card Count Indicator */}
                <div className="mt-4 text-xs text-gray-600 font-semibold uppercase tracking-wider text-center">
                  {game.questions.reduce(
                    (total: number, category: any) =>
                      total + category.questions.length,
                    0
                  )}{" "}
                  Cards • {Object.keys(game.theme.categories).length} Categories
                </div>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-600 font-medium"
      >
        <p className="text-sm">Select a conversation to begin</p>
      </motion.div>

      {/* Floating Action Text - Subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 text-xs text-gray-500 font-medium"
      >
        <p>Tap to start</p>
      </motion.div>
    </div>
  );
};

export default GameLibrary;
