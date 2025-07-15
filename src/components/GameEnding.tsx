import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface GameEndingProps {
  onRestart: () => void;
  onExit: () => void;
}

const GameEnding: React.FC<GameEndingProps> = ({ onRestart, onExit }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16"
    >
      <div className="text-center max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight"
        >
          {t("gameInterface.wellDone")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-secondary text-intimate font-light mb-12"
        >
          {t("gameInterface.thankYou")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-secondary"
            onClick={onRestart}
          >
            {t("common.restart")}
          </motion.button>

          <motion.button
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-primary hover:text-white"
            onClick={onExit}
          >
            {t("common.exit")}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameEnding;
