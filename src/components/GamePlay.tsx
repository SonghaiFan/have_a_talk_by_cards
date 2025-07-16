import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ConversationGame } from "../types/ConversationGame";
import QuestionCard from "./QuestionCard";

// Utility function to calculate luminance and determine contrast color
const getContrastColor = (hexColor: string): string => {
  // Remove # if present
  const hex = hexColor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate relative luminance using WCAG formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.9 ? "#000000" : "#ffffff";
};

interface GamePlayProps {
  game: ConversationGame;
  questions: any[];
  onExit: () => void;
  onComplete: () => void;
}

const GamePlay: React.FC<GamePlayProps> = ({
  game,
  questions,
  onExit,
  onComplete,
}) => {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Listen for theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
    };

    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  const currentQuestion = questions[currentQuestionIndex] || null;
  const currentCategory = currentQuestion
    ? game.theme.categories[currentQuestion.category]
    : null;

  // Color logic based on Theme × Mode
  const isWildMode = currentQuestion?.type === "wildcard";
  const categoryColor = currentCategory?.color || "#ffffff";

  const themes = {
    dark: {
      wild: { background: "#000000", card: categoryColor }, // Midnight contrast
      normal: { background: categoryColor, card: "#000000" }, // Dark canvas
    },
    light: {
      wild: { background: "#ffffff", card: categoryColor }, // Pure focus
      normal: { background: categoryColor, card: "#ffffff" }, // Light clarity
    },
  };

  const mode = isWildMode ? "wild" : "normal";
  const { background: backgroundColor, card: cardColor } =
    themes[isDarkTheme ? "dark" : "light"][mode];

  // Dynamically determine UI color based on background color contrast
  const textColor = getContrastColor(cardColor);
  const uiColor = getContrastColor(backgroundColor);

  const handleNext = () => {
    setDirection(1);
    setIsCardFlipped(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    setIsCardFlipped(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCardClick = () => {
    if (currentQuestion?.more) {
      setIsCardFlipped(!isCardFlipped);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          if (currentQuestionIndex > 0) {
            handlePrevious();
          }
          break;
        case "ArrowRight":
        case " ": // Spacebar
          event.preventDefault();
          handleNext();
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "Enter":
          event.preventDefault();
          if (currentQuestion?.more) {
            handleCardClick();
          }
          break;
        case "Escape":
          event.preventDefault();
          if (isCardFlipped) {
            setIsCardFlipped(false);
          } else {
            onExit();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestionIndex, isCardFlipped, currentQuestion, onExit]);

  return (
    <div
      className="h-full w-full flex flex-col transition-colors duration-500"
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Dark mode darkening overlay */}
      {isDarkTheme && (
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ zIndex: 0 }}
          animate={{
            opacity: isWildMode ? 0 : 0.5,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Header - Minimal Navigation */}
      <header className="flex justify-between items-center p-4 sm:p-8 relative z-10">
        <button
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl hover:text-gray-200 transition-colors duration-200"
          style={{ color: uiColor }}
          onClick={onExit}
        >
          ←
        </button>

        <div
          className="text-xs sm:text-sm font-medium opacity-90"
          style={{ color: uiColor }}
        >
          {t("gameInterface.progressIndicator", {
            current: currentQuestionIndex + 1,
            total: questions.length,
          })}
        </div>
      </header>

      {/* Main Card - Centered & Focused */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8 sm:py-16 relative z-10">
        <div className="w-full max-w-4xl">
          {/* Category Indicator - Minimal */}
          {currentCategory && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4 sm:mb-8"
            >
              <div className="inline-flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full opacity-90"
                  style={{ backgroundColor: uiColor }}
                />
                <span
                  className="text-xs sm:text-sm font-medium opacity-90 uppercase tracking-wider"
                  style={{ color: uiColor }}
                >
                  {currentCategory.name}
                </span>
              </div>
            </motion.div>
          )}

          {/* Question Card */}
          <QuestionCard
            currentQuestionIndex={currentQuestionIndex}
            direction={direction}
            isCardFlipped={isCardFlipped}
            currentQuestion={currentQuestion}
            isWildcard={isWildMode}
            cardColor={cardColor}
            textColor={textColor}
            onCardClick={handleCardClick}
          />

          {/* Category Description - Subtle */}
          {currentCategory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-4 sm:mt-8"
            >
              <p
                className="text-xs sm:text-sm opacity-70 font-light px-4"
                style={{ color: uiColor }}
              >
                {currentCategory.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation - Animated Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-between items-center p-4 sm:p-8 relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.08, x: -2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 sm:gap-2 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ color: uiColor }}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <span className="text-lg sm:text-xl">←</span>
          <span className="text-sm sm:text-base">{t("common.previous")}</span>
        </motion.button>

        {/* Progress Indicator - Animated */}
        <div
          className="flex-1 mx-4 sm:mx-8 h-1 rounded-full overflow-hidden"
          style={{
            backgroundColor: isWildMode
              ? "rgba(174, 174, 174, 0.2)"
              : "rgba(255, 255, 255, 0.2)",
          }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: uiColor }}
            animate={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.08, x: 2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 sm:gap-2 transition-colors duration-200"
          style={{ color: uiColor }}
          onClick={handleNext}
        >
          <span className="text-sm sm:text-base">{t("common.next")}</span>
          <span className="text-lg sm:text-xl">→</span>
        </motion.button>
      </motion.div>

      {/* Keyboard Hints - Subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs font-light text-center hidden sm:block"
        style={{ color: uiColor }}
      >
        <p>{t("navigation.keyboardHints")}</p>
      </motion.div>
    </div>
  );
};

export default GamePlay;
