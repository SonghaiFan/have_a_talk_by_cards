import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { ConversationGame } from "../types/ConversationGame";
import Card from "./Card";

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

  const currentQuestion = questions[currentQuestionIndex] || null;
  const currentCategory = currentQuestion
    ? game.theme.categories[currentQuestion.category]
    : null;

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
    if (currentQuestion?.options) {
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
          if (currentQuestion?.options) {
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

  // Card dealing animation variants
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 25 : -25,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 25 : -25,
    }),
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500"
      style={{ backgroundColor: currentCategory?.color || "#ffffff" }}
    >
      {/* Header - Minimal Navigation */}
      <header className="flex justify-between items-center p-4 sm:p-8">
        <button
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl text-white hover:text-gray-200 transition-colors duration-200"
          onClick={onExit}
        >
          ←
        </button>

        <div className="text-xs sm:text-sm font-medium text-white opacity-90">
          {t("gameInterface.progressIndicator", {
            current: currentQuestionIndex + 1,
            total: questions.length,
          })}
        </div>
      </header>

      {/* Main Card - Centered & Focused */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8 sm:py-16">
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
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-90"
                />
                <span className="text-xs sm:text-sm font-medium text-white opacity-90 uppercase tracking-wider">
                  {currentCategory.name}
                </span>
              </div>
            </motion.div>
          )}

          {/* Question Card - Animated Poker Card with Flip */}
          <div className="flex justify-center items-center">
            <div className="relative perspective-1000">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentQuestionIndex}
                  className="relative w-[340px] sm:w-[440px] md:w-[520px] h-[220px] sm:h-[280px] md:h-[340px]"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    rotateY: { duration: 0.4 },
                  }}
                >
                  {/* Card Container with Flip Animation */}
                  <motion.div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    animate={{
                      rotateY: isCardFlipped ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Front Side - Question */}
                    <Card
                      size="large"
                      variant="question"
                      className={`absolute inset-0 text-center shadow-2xl ${
                        currentQuestion?.options
                          ? "cursor-pointer"
                          : "cursor-default"
                      }`}
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                      onClick={
                        currentQuestion?.options ? handleCardClick : undefined
                      }
                    >
                      <div className="text-center h-full flex flex-col justify-center">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight font-sans tracking-tight px-2">
                          {currentQuestion?.question}
                        </h2>
                      </div>
                    </Card>

                    {/* Back Side - Options */}
                    <Card
                      size="large"
                      variant="question"
                      className="absolute inset-0 shadow-2xl cursor-pointer"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                      onClick={handleCardClick}
                    >
                      <div className="text-center h-full flex flex-col justify-center">
                        {currentQuestion?.options && (
                          <div className="space-y-3 text-left">
                            {Array.isArray(currentQuestion.options)
                              ? // Handle array format (conversation prompts)
                                currentQuestion.options.map(
                                  (option: string, index: number) => (
                                    <p
                                      key={index}
                                      className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed"
                                    >
                                      • {option}
                                    </p>
                                  )
                                )
                              : // Handle object format (multiple choice)
                                Object.entries(currentQuestion.options).map(
                                  ([key, value]) => (
                                    <p
                                      key={key}
                                      className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed"
                                    >
                                      <span className="font-medium text-gray-800">
                                        {key}.
                                      </span>{" "}
                                      {value as string}
                                    </p>
                                  )
                                )}
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Category Description - Subtle */}
          {currentCategory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-4 sm:mt-8"
            >
              <p className="text-xs sm:text-sm text-white opacity-70 font-light px-4">
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
        className="flex justify-between items-center p-4 sm:p-8"
      >
        <motion.button
          whileHover={{ scale: 1.08, x: -2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 sm:gap-2 text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <span className="text-lg sm:text-xl">←</span>
          <span className="text-sm sm:text-base">{t("common.previous")}</span>
        </motion.button>

        {/* Progress Indicator - Animated */}
        <div className="flex-1 mx-4 sm:mx-8 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
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
          className="flex items-center gap-1 sm:gap-2 text-white transition-colors duration-200"
          onClick={handleNext}
        >
          <span className="text-sm sm:text-base">{t("common.next")}</span>
          <span className="text-lg sm:text-xl">→</span>
        </motion.button>
      </motion.div>

      {/* Keyboard Hints - Subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-white text-opacity-60 font-light text-center hidden sm:block"
      >
        <p>{t("navigation.keyboardHints")}</p>
      </motion.div>
    </div>
  );
};

export default GamePlay;
