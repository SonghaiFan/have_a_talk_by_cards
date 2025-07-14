import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ConversationGame } from "../types/ConversationGame";

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
        <h1 className="text-6xl md:text-7xl font-black text-primary mb-6 tracking-tight leading-none">
          CueCards
        </h1>
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
              {/* Background Cards - Always visible, animated on hover */}
              <AnimatePresence>
                {hoveredGame === game.testType && (
                  <>
                    {/* Card 3 - Deepest */}
                    <motion.div
                      className="absolute top-0 left-0 bg-gray-300 border border-gray-300 rounded-2xl w-full max-w-[400px] h-[250px] shadow-sm"
                      style={{ aspectRatio: "400/250" }}
                      initial={{
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 0,
                      }}
                      animate={{
                        x: -12,
                        y: -6,
                        rotate: -3,
                        scale: 0.95,
                        opacity: 0.7,
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
                      }}
                    />

                    {/* Card 2 - Middle */}
                    <motion.div
                      className="absolute top-0 left-0 bg-gray-200 border border-gray-300 rounded-2xl w-full max-w-[400px] h-[250px] shadow-md"
                      style={{ aspectRatio: "400/250" }}
                      initial={{
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 0,
                      }}
                      animate={{
                        x: -6,
                        y: -3,
                        rotate: -1.5,
                        scale: 0.98,
                        opacity: 0.8,
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
                        delay: 0.05,
                      }}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Main Card Pack - Always on top */}
              <motion.div
                className="relative z-10 bg-gray-50 text-center mx-auto border border-gray-200 rounded-2xl w-full max-w-[400px] h-[250px] flex flex-col justify-center items-center px-10 py-8 shadow-lg"
                style={{ aspectRatio: "400/250" }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {/* Game Title */}
                <h2 className="text-2xl font-bold text-primary mb-4 text-center leading-tight">
                  {game.ui.startScreen.title}
                </h2>

                {/* Game Description */}
                <p className="text-sm text-secondary font-light text-center leading-relaxed">
                  {game.ui.startScreen.description[0]}
                </p>

                {/* Card Count Indicator */}
                <div className="mt-4 text-xs text-gray-400 font-medium uppercase tracking-wider">
                  {game.questions.reduce(
                    (total: number, category: any) =>
                      total + category.questions.length,
                    0
                  )}{" "}
                  Cards
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-secondary font-light"
      >
        <p className="text-sm opacity-70">Select a conversation to begin</p>
      </motion.div>

      {/* Floating Action Text - Subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 text-xs text-secondary font-light opacity-40"
      >
        <p>Tap to start</p>
      </motion.div>
    </div>
  );
};

export default GameLibrary;
