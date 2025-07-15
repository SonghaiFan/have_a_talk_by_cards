import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ConversationGame } from "../types/ConversationGame";

interface CategorySelectorProps {
  game: ConversationGame;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  game,
  selectedCategories,
  onCategoryChange,
}) => {
  const { t } = useTranslation();

  const handleCategoryToggle = (categoryKey: string) => {
    if (selectedCategories.includes(categoryKey)) {
      onCategoryChange(selectedCategories.filter((cat) => cat !== categoryKey));
    } else {
      onCategoryChange([...selectedCategories, categoryKey]);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6">
      {/* Section Header */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-light text-primary">
          {t("categorySelector.title")}
        </h2>
        <p className="text-sm sm:text-base text-secondary text-intimate font-light">
          {t("categorySelector.subtitle")}
        </p>
      </div>

      {/* Category Dots */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
        {Object.entries(game.theme.categories).map(
          ([categoryKey, category]) => {
            const isSelected = selectedCategories.includes(categoryKey);

            // Find questions for this category using the key
            const categoryQuestions = game.questions.find(
              (c) => c.category === categoryKey
            );
            const questionCount = categoryQuestions?.questions.length || 0;

            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col items-center gap-2 sm:gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCategoryToggle(categoryKey)}
                  className={`
                  relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 cursor-pointer touch-manipulation
                  ${
                    isSelected
                      ? "shadow-lg scale-110"
                      : "hover:shadow-md opacity-60 hover:opacity-100 active:scale-95"
                  }
                `}
                  style={{ backgroundColor: category.color }}
                  title={`${category.name} (${questionCount} questions)`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, ease: "backOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>

                <div className="text-center space-y-0.5 sm:space-y-1 max-w-[80px] sm:max-w-none">
                  <div className="text-xs sm:text-sm font-medium text-primary leading-tight">
                    {category.name}
                  </div>
                  <div className="text-xs text-secondary/70 font-light">
                    {questionCount} moments
                  </div>
                </div>
              </motion.div>
            );
          }
        )}
      </div>

      {/* Validation Message */}
      {selectedCategories.length === 0 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-secondary/70 font-light text-xs sm:text-sm px-4"
        >
          Select at least one area to begin your journey
        </motion.p>
      )}
    </div>
  );
};

export default CategorySelector;
