import React from "react";
import { motion } from "motion/react";
import { ConversationGame } from "../types/ConversationGame";

interface GameLandingProps {
  game: ConversationGame;
  onStart: () => void;
  onExit: () => void;
}

const GameLanding: React.FC<GameLandingProps> = ({ game, onStart, onExit }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-8 py-16">
      {/* Exit Button - Minimal */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 left-8 w-12 h-12 flex items-center justify-center text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        onClick={onExit}
      >
        ←
      </motion.button>

      {/* Start Screen - Centered & Bold */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
          {game.ui.startScreen.title}
        </h1>

        {game.ui.startScreen.description.map((desc: string, index: number) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 text-intimate font-light mb-6 leading-relaxed"
          >
            {desc}
          </motion.p>
        ))}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="mt-12 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-12 py-4 rounded-xl text-lg font-semibold tracking-wide transition-all duration-200 hover:bg-gray-700 dark:hover:bg-gray-200"
          onClick={onStart}
        >
          {game.ui.startScreen.startButton}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GameLanding;
