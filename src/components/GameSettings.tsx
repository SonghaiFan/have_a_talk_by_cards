import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ConversationGame } from "../types/ConversationGame";
import CategorySelector from "./CategorySelector";
import TimePercentageSlider from "./TimePercentageSlider";

interface GameSettingsProps {
  game: ConversationGame;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  questionPercentage: number;
  onPercentageChange: (percentage: number) => void;
  onStartGame: () => void;
  onBack: () => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  game,
  selectedCategories,
  onCategoryChange,
  questionPercentage,
  onPercentageChange,
  onStartGame,
  onBack,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16"
    >
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 left-8 w-12 h-12 flex items-center justify-center text-2xl text-secondary hover:text-primary transition-colors duration-200"
        onClick={onBack}
      >
        ←
      </motion.button>


      {/* Main Content Container */}
      <div className="text-center max-w-2xl w-full space-y-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-light text-primary tracking-tight leading-tight">
            {t("gameInterface.createYourJourney")}
          </h1>
          <p className="text-lg text-secondary text-intimate font-light max-w-md mx-auto">
            {t("gameInterface.createJourneySubtitle")}
          </p>
        </motion.div>

        {/* Category Selection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <CategorySelector
            game={game}
            selectedCategories={selectedCategories}
            onCategoryChange={onCategoryChange}
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-16 h-px bg-gray-200 mx-auto"
        />

        {/* Time Selection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-6"
        >
          <TimePercentageSlider
            game={game}
            selectedCategories={selectedCategories}
            percentage={questionPercentage}
            onPercentageChange={onPercentageChange}
          />
        </motion.div>

        {/* Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="pt-4"
        >
          <motion.button
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-white px-12 py-4 rounded-xl text-lg font-light tracking-wide transition-all duration-200 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            onClick={onStartGame}
            disabled={selectedCategories.length === 0}
          >
            {t("gameInterface.beginTheJourney")}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameSettings;
