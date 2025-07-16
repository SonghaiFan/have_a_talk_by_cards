import React from "react";
import { motion } from "motion/react";
import { ConversationGame } from "../types/ConversationGame";
import Button from "./Button";

interface GameLandingProps {
  game: ConversationGame;
  onStart: () => void;
  onExit: () => void;
}

const GameLanding: React.FC<GameLandingProps> = ({ game, onStart, onExit }) => {
  return (
    <div className="h-full w-full bg-white dark:bg-black overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-16">
        {/* Exit Button - Minimal */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 left-4 sm:top-8 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 sm:mb-8 tracking-tight leading-tight">
            {game.ui.startScreen.title}
          </h1>

          {game.ui.startScreen.description.map(
            (desc: string, index: number) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 text-intimate font-light mb-4 sm:mb-6 leading-relaxed"
              >
                {desc}
              </motion.p>
            )
          )}

          <div className="flex justify-center">
            <Button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 sm:mt-12 font-semibold"
              variant="primary"
              onClick={onStart}
            >
              {game.ui.startScreen.startButton}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameLanding;
