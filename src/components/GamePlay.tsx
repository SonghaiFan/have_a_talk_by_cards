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

  // Determine colors based on question type
  const isWildcard = currentQuestion?.type === "wildcard";
  const backgroundColor = isWildcard
    ? "#ffffff"
    : currentCategory?.color || "#ffffff";
  const cardColor = isWildcard
    ? currentCategory?.color || "#ffffff"
    : "#ffffff";
  const textColor = isWildcard ? "#ffffff" : "#1f2937"; // white for wildcard, dark for regular
  const headerTextColor = isWildcard ? "#1f2937" : "#ffffff"; // dark for wildcard, white for regular

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
      style={{ backgroundColor: backgroundColor }}
    >
      {/* Header - Minimal Navigation */}
      <header className="flex justify-between items-center p-4 sm:p-8">
        <button
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl hover:text-gray-200 transition-colors duration-200"
          style={{ color: headerTextColor }}
          onClick={onExit}
        >
          ←
        </button>

        <div
          className="text-xs sm:text-sm font-medium opacity-90"
          style={{ color: headerTextColor }}
        >
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
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full opacity-90"
                  style={{ backgroundColor: headerTextColor }}
                />
                <span
                  className="text-xs sm:text-sm font-medium opacity-90 uppercase tracking-wider"
                  style={{ color: headerTextColor }}
                >
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
                        currentQuestion?.more
                          ? "cursor-pointer"
                          : "cursor-default"
                      }`}
                      style={{
                        backfaceVisibility: "hidden",
                        backgroundColor: cardColor,
                      }}
                      onClick={
                        currentQuestion?.more ? handleCardClick : undefined
                      }
                    >
                      <div className="text-center h-full flex flex-col justify-center">
                        <h2
                          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight font-sans tracking-tight px-2"
                          style={{ color: textColor }}
                        >
                          {currentQuestion?.question
                            ? currentQuestion.question
                                .split("\n")
                                .map((line: string, idx: number) => (
                                  <span key={idx}>
                                    {line}
                                    {idx !==
                                      currentQuestion.question.split("\n")
                                        .length -
                                        1 && <br />}
                                  </span>
                                ))
                            : null}
                        </h2>
                      </div>
                    </Card>

                    {/* Back Side - more */}
                    <Card
                      size="large"
                      variant="question"
                      className="absolute inset-0 shadow-2xl cursor-pointer"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundColor: cardColor,
                      }}
                      onClick={handleCardClick}
                    >
                      <div className="text-center h-full flex flex-col justify-center">
                        {currentQuestion?.more && (
                          <div className="space-y-3 text-left">
                            {Array.isArray(currentQuestion.more)
                              ? // Handle array format (conversation prompts)
                                currentQuestion.more.map(
                                  (option: string, index: number) => (
                                    <p
                                      key={index}
                                      className="text-xs sm:text-sm font-light leading-relaxed"
                                      style={{
                                        color: isWildcard
                                          ? "#ffffff"
                                          : "#6b7280",
                                      }}
                                    >
                                      • {option}
                                    </p>
                                  )
                                )
                              : // Handle object format (multiple choice)
                                Object.entries(currentQuestion.more).map(
                                  ([key, value]) => (
                                    <p
                                      key={key}
                                      className="text-xs sm:text-sm font-light leading-relaxed"
                                      style={{
                                        color: isWildcard
                                          ? "#ffffff"
                                          : "#6b7280",
                                      }}
                                    >
                                      <span
                                        className="font-medium"
                                        style={{
                                          color: isWildcard
                                            ? "#ffffff"
                                            : "#1f2937",
                                        }}
                                      >
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
              <p
                className="text-xs sm:text-sm opacity-70 font-light px-4"
                style={{ color: headerTextColor }}
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
        className="flex justify-between items-center p-4 sm:p-8"
      >
        <motion.button
          whileHover={{ scale: 1.08, x: -2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 sm:gap-2 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ color: headerTextColor }}
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
            backgroundColor: isWildcard
              ? "#e5e7eb"
              : "rgba(255, 255, 255, 0.2)",
          }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: headerTextColor }}
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
          style={{ color: headerTextColor }}
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
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs font-light text-center hidden sm:block"
        style={{ color: headerTextColor }}
      >
        <p>{t("navigation.keyboardHints")}</p>
      </motion.div>
    </div>
  );
};

export default GamePlay;
