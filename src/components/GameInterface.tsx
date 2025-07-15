import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ConversationGame } from "../types/ConversationGame";
import Card from "./Card";

interface GameInterfaceProps {
  game: ConversationGame;
  onExit: () => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ game, onExit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const allQuestions = game.questions.flatMap(
    (category: any, catIndex: number) =>
      category.questions.map((question: any, qIndex: number) => ({
        ...question,
        categoryIndex: catIndex,
        questionIndex: qIndex,
        category: category.category,
      }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex] || null;
  const currentCategory = currentQuestion
    ? game.theme.categories[currentQuestion.category]
    : null;

  const handleNext = () => {
    setDirection(1);
    setIsCardFlipped(false);
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameComplete(true);
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
      if (showStartScreen || gameComplete) return;

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
  }, [
    currentQuestionIndex,
    showStartScreen,
    gameComplete,
    isCardFlipped,
    currentQuestion,
    onExit,
  ]);

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

  const [direction, setDirection] = useState(0);

  const handleStart = () => {
    setShowStartScreen(false);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setGameComplete(false);
    setShowStartScreen(true);
  };

  if (showStartScreen) {
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

          {game.ui.startScreen.description.map(
            (desc: string, index: number) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-xl text-secondary text-intimate font-light mb-6 leading-relaxed"
              >
                {desc}
              </motion.p>
            )
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 bg-primary text-white px-12 py-4 rounded-xl text-lg font-semibold tracking-wide transition-all duration-200 hover:bg-secondary"
            onClick={handleStart}
          >
            {game.ui.startScreen.startButton}
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
            {game.ui.results.title}
          </h1>
          <p className="text-xl text-secondary text-intimate font-light mb-12">
            {game.ui.results.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-secondary"
              onClick={handleRestart}
            >
              {game.ui.results.restartButton}
            </button>
            <button
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-primary hover:text-white"
              onClick={onExit}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500"
      style={{ backgroundColor: currentCategory?.color || "#ffffff" }}
    >
      {/* Header - Minimal Navigation */}
      <header className="flex justify-between items-center p-8">
        <button
          className="w-12 h-12 flex items-center justify-center text-2xl text-white hover:text-gray-200 transition-colors duration-200"
          onClick={onExit}
        >
          ←
        </button>

        <div className="text-sm font-medium text-white opacity-90">
          {currentQuestionIndex + 1} of {allQuestions.length}
        </div>
      </header>

      {/* Main Card - Centered & Focused */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-4xl">
          {/* Category Indicator - Minimal */}
          {currentCategory && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="w-2 h-2 rounded-full bg-white opacity-90"
                />
                <span className="text-sm font-medium text-white opacity-90 uppercase tracking-wider">
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
                  className="relative"
                  style={{
                    width: "520px",
                    height: "340px",
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
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight font-sans tracking-tight">
                          {currentQuestion?.question}
                        </h2>
                        {currentQuestion?.options && (
                          <p className="mt-6 text-sm text-gray-400 font-light">
                            Click or press ↑↓ to view options
                          </p>
                        )}
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
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">
                          Options
                        </h3>
                        {currentQuestion?.options && (
                          <div className="space-y-3 text-left">
                            {Array.isArray(currentQuestion.options)
                              ? // Handle array format (conversation prompts)
                                currentQuestion.options.map(
                                  (option: string, index: number) => (
                                    <p
                                      key={index}
                                      className="text-sm text-gray-600 font-light leading-relaxed"
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
                                      className="text-sm text-gray-600 font-light leading-relaxed"
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
                        <p className="mt-6 text-sm text-gray-400 font-light">
                          Click or press ↑↓ to return to question
                        </p>
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
              className="text-center mt-8"
            >
              <p className="text-sm text-white opacity-70 font-light">
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
        className="flex justify-between items-center p-8"
      >
        <motion.button
          whileHover={{ scale: 1.08, x: -2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <span className="text-xl">←</span>
          <span>Previous</span>
        </motion.button>

        {/* Progress Indicator - Animated */}
        <div className="flex-1 mx-8 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            animate={{
              width: `${
                ((currentQuestionIndex + 1) / allQuestions.length) * 100
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
          className="flex items-center gap-2 text-white transition-colors duration-200"
          onClick={handleNext}
        >
          <span>Next</span>
          <span className="text-xl">→</span>
        </motion.button>
      </motion.div>

      {/* Keyboard Hints - Subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-white text-opacity-60 font-light text-center"
      >
        <p>←→ Navigate • ↑↓ Flip • Esc Exit</p>
      </motion.div>
    </div>
  );
};

export default GameInterface;
