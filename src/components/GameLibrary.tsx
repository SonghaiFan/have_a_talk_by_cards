import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ConversationGame } from "../types/ConversationGame";
import Card from "./Card";
import LanguageSwitcher from "./LanguageSwitcher";

type PlayerGroup = "solo" | "couple" | "friends" | "strangers" | "family";
type GameType = "normal" | "edition" | "premium";

interface GameLibraryProps {
  games: ConversationGame[];
  onGameSelect: (game: ConversationGame) => void;
}

const GameLibrary: React.FC<GameLibraryProps> = ({ games, onGameSelect }) => {
  const { t } = useTranslation();
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<GameType | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<PlayerGroup | null>(null);

  // Get unique game types and player groups
  const gameTypes: GameType[] = ["normal", "edition", "premium"];
  const playerGroups: PlayerGroup[] = [
    "solo",
    "couple",
    "friends",
    "strangers",
    "family",
  ];

  // Filter games based on selected type and group
  const filteredGames = games.filter((game) => {
    const typeMatch = !selectedType || game.app.type === selectedType;
    const groupMatch =
      !selectedGroup || game.app.playerGroup.includes(selectedGroup);
    return typeMatch && groupMatch;
  });

  // Reset selected index when filters change
  useEffect(() => {
    setSelectedGameIndex(0);
  }, [selectedType, selectedGroup]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          setSelectedGameIndex((prev) =>
            prev > 0 ? prev - 1 : filteredGames.length - 1
          );
          break;
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          setSelectedGameIndex((prev) =>
            prev < filteredGames.length - 1 ? prev + 1 : 0
          );
          break;
        case "Enter":
        case " ": // Spacebar
          event.preventDefault();
          if (filteredGames[selectedGameIndex]) {
            onGameSelect(filteredGames[selectedGameIndex]);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredGames, selectedGameIndex, onGameSelect]);

  // Update hover when keyboard selection changes
  useEffect(() => {
    if (filteredGames[selectedGameIndex]) {
      setHoveredGame(filteredGames[selectedGameIndex].testID);
    }
  }, [selectedGameIndex, filteredGames]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 sm:px-8 py-8 sm:py-16">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <LanguageSwitcher />
      </div>

      {/* Header - Bold Typography */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl mb-8 sm:mb-16 mt-8 sm:mt-0"
      >
        {/* App Title with Inline Icon */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <motion.img
            src="/card-icon.svg"
            alt="CueCards Icon"
            className="w-20 h-20 md:w-24 md:h-24 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-primary tracking-tight leading-none text-center">
            CueCards
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-secondary text-intimate font-light px-4 mb-24 sm:mb-6">
          {t("gameLibrary.subtitle")}
        </p>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-5xl"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-centerrounded-2xl p-6 mb-24 sm:mb-20">
          {/* Game Type Filter */}
          <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              {t("gameLibrary.filterByType")}
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    !selectedType
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {t("gameLibrary.allTypes")}
              </button>
              {gameTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${
                      selectedType === type
                        ? "bg-black text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {t(`gameLibrary.type.${type}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Separator for Desktop */}
          <div className="hidden sm:block w-px h-12 bg-gray-200 mx-4" />

          {/* Player Group Filter */}
          <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              {t("gameLibrary.filterByGroup")}
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedGroup(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    !selectedGroup
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {t("gameLibrary.allGroups")}
              </button>
              {playerGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${
                      selectedGroup === group
                        ? "bg-black text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {t(`gameLibrary.group.${group}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Games Grid with Enhanced Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 mb-8 sm:mb-16 justify-items-center"
      >
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.testID}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            className="cursor-pointer relative"
            onHoverStart={() => setHoveredGame(game.testID)}
            onHoverEnd={() => setHoveredGame(null)}
            onClick={() => onGameSelect(game)}
          >
            {/* Card Pack Container */}
            <div className="relative">
              {/* Background Cards - Dynamic based on categories */}
              <AnimatePresence>
                {hoveredGame === game.testID && (
                  <>
                    {Object.entries(game.theme.categories).map(
                      (categoryEntry, cardIndex) => {
                        const [categoryKey, category] = categoryEntry;

                        return (
                          <Card
                            key={categoryKey}
                            size="medium"
                            variant="game"
                            className="absolute top-0 left-0"
                            style={{
                              aspectRatio: "400/250",
                              backgroundColor: category.color,
                            }}
                            initial={{
                              x: 0,
                              y: 0,
                              rotate: 0,
                              scale: 1,
                              opacity: 0,
                            }}
                            animate={{
                              x: -12 * (cardIndex + 1),
                              y: -16 * (cardIndex + 1),
                              rotate: -2.5 * (cardIndex + 1),
                              scale: 1 - 0.04 * (cardIndex + 1),
                              opacity: 1,
                            }}
                            exit={{
                              x: 0,
                              y: 0,
                              rotate: 0,
                              scale: 1,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                              delay: 0.05 + cardIndex * 0.02,
                            }}
                          />
                        );
                      }
                    )}
                  </>
                )}
              </AnimatePresence>

              {/* Main Card - Always visible (White Cover) */}
              <Card
                size="medium"
                variant="game"
                className={`relative z-10 cursor-pointer ${
                  selectedGameIndex === index
                    ? "ring-3 ring-black ring-opacity-50"
                    : ""
                }`}
                style={{
                  aspectRatio: "400/250",
                  backgroundColor: "#ffffff",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                onClick={() => onGameSelect(game)}
                onMouseEnter={() => {
                  setHoveredGame(game.testID);
                  setSelectedGameIndex(index);
                }}
                onMouseLeave={() => setHoveredGame(null)}
              >
                {/* Game Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4 text-center leading-tight px-2">
                  {game.app.title}
                </h2>

                {/* Game Description */}
                <p className="text-xs sm:text-sm text-gray-700 font-medium text-center leading-relaxed px-2">
                  {game.app.subtitle}
                </p>

                {/* Category Dots */}
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  {Object.values(game.theme.categories).map(
                    (category, index) => (
                      <div
                        key={index}
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                        title={category.name}
                      />
                    )
                  )}
                </div>

                {/* Card Count Indicator */}
                <div className="mt-3 sm:mt-4 text-xs text-gray-600 font-semibold uppercase tracking-wider text-center px-2">
                  {game.questions.reduce(
                    (total: number, category: any) =>
                      total + category.questions.length,
                    0
                  )}{" "}
                  Cards • {Object.keys(game.theme.categories).length} Categories
                </div>
              </Card>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results Message */}
      {filteredGames.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 py-12"
        >
          <p>{t("gameLibrary.noResults")}</p>
        </motion.div>
      )}

      {/* Footer - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-gray-600 font-medium"
      >
        <p className="text-sm">{t("gameLibrary.footnote")}</p>
      </motion.div>

      {/* Keyboard Hints - Subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 text-xs text-gray-500 font-medium text-right hidden sm:block"
      >
        <p>↑↓ Navigate • Enter Select</p>
      </motion.div>
    </div>
  );
};

export default GameLibrary;
