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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16"
    >
      {/* Exit Button - Minimal */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 left-8 w-12 h-12 flex items-center justify-center text-2xl text-secondary hover:text-primary transition-colors duration-200"
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
        <h1 className="text-5xl md:text-6xl font-black text-primary mb-8 tracking-tight leading-tight">
          {game.ui.startScreen.title}
        </h1>

        {game.ui.startScreen.description.map((desc: string, index: number) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="text-xl text-secondary text-intimate font-light mb-6 leading-relaxed"
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
          className="mt-12 bg-primary text-white px-12 py-4 rounded-xl text-lg font-semibold tracking-wide transition-all duration-200 hover:bg-secondary"
          onClick={onStart}
        >
          {game.ui.startScreen.startButton}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GameLanding;
