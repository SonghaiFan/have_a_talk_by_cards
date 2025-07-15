import React, { useState, useEffect } from "react";
import { ConversationGame } from "../types/ConversationGame";
import GameLanding from "./GameLanding";
import GameSettings from "./GameSettings";
import GamePlay from "./GamePlay";
import GameEnding from "./GameEnding";

// Game stages enum
enum GameStage {
  LANDING = "landing",
  SETTINGS = "settings",
  PLAYING = "playing",
  ENDING = "ending",
}

interface GameInterfaceProps {
  game: ConversationGame;
  onExit: () => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ game, onExit }) => {
  const [currentStage, setCurrentStage] = useState<GameStage>(
    GameStage.LANDING
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionPercentage, setQuestionPercentage] = useState(50);
  const [customQuestions, setCustomQuestions] = useState<any[]>([]);

  // Initialize default categories (all selected)
  useEffect(() => {
    const categories = Object.keys(game.theme.categories);
    setSelectedCategories(categories);
  }, [game]);

  // Update categories when game changes (but not when language changes)
  useEffect(() => {
    const categories = Object.keys(game.theme.categories);
    setSelectedCategories(categories);
  }, [game]);

  const generateCustomQuestions = () => {
    // Separate wildcard questions from regular questions
    const regularCategoryQuestions: any[] = [];
    const wildcardQuestions: any[] = [];

    game.questions
      .filter((categoryData: any) =>
        selectedCategories.includes(categoryData.category)
      )
      .forEach((categoryData: any) => {
        const categoryQuestions = categoryData.questions.map(
          (question: any, qIndex: number) => ({
            ...question,
            categoryIndex: game.questions.findIndex(
              (cat: any) => cat.category === categoryData.category
            ),
            questionIndex: qIndex,
            category: categoryData.category,
          })
        );

        // Separate wildcard questions from regular questions
        const wildcards = categoryQuestions.filter(
          (q: any) => q.type === "wildcard"
        );
        const regulars = categoryQuestions.filter(
          (q: any) => q.type !== "wildcard"
        );

        wildcardQuestions.push(...wildcards);
        if (regulars.length > 0) {
          regularCategoryQuestions.push({
            category: categoryData.category,
            questions: regulars,
          });
        }
      });

    // Calculate total questions to take
    const totalAvailableQuestions =
      regularCategoryQuestions.reduce(
        (sum, catData) => sum + catData.questions.length,
        0
      ) + wildcardQuestions.length;

    const totalQuestions = Math.round(
      (totalAvailableQuestions * questionPercentage) / 100
    );

    // Calculate how many wildcard questions to include
    const wildcardCount = Math.min(
      wildcardQuestions.length,
      Math.round(totalQuestions * 0.2) // Max 20% wildcards
    );

    // Remaining questions for regular categories
    const regularQuestionsNeeded = totalQuestions - wildcardCount;

    // Distribute regular questions proportionally across categories
    const questionsPerCategory = regularCategoryQuestions.map((catData) => {
      const totalRegularQuestions = regularCategoryQuestions.reduce(
        (sum, cat) => sum + cat.questions.length,
        0
      );
      const proportion = catData.questions.length / totalRegularQuestions;
      const questionsForCategory = Math.round(
        proportion * regularQuestionsNeeded
      );
      return {
        ...catData,
        targetCount: Math.max(1, questionsForCategory), // Ensure at least 1 question per category
      };
    });

    // Adjust for rounding differences
    const actualRegularTotal = questionsPerCategory.reduce(
      (sum, cat) => sum + cat.targetCount,
      0
    );
    if (actualRegularTotal > regularQuestionsNeeded) {
      // Remove questions from the category with the most questions
      const maxCategory = questionsPerCategory.reduce((max, cat) =>
        cat.targetCount > max.targetCount ? cat : max
      );
      maxCategory.targetCount -= actualRegularTotal - regularQuestionsNeeded;
    }

    // Randomly sample questions from each regular category, maintaining category order
    const regularQuestions: any[] = [];
    questionsPerCategory.forEach((catData) => {
      const shuffledQuestions = [...catData.questions].sort(
        () => 0.5 - Math.random()
      );
      const selectedQuestions = shuffledQuestions.slice(0, catData.targetCount);
      regularQuestions.push(...selectedQuestions);
    });

    // Randomly select wildcard questions
    const selectedWildcards = [...wildcardQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, wildcardCount);

    // Insert wildcards randomly into the regular questions sequence
    const finalQuestions = [...regularQuestions];
    selectedWildcards.forEach((wildcard) => {
      const randomIndex = Math.floor(
        Math.random() * (finalQuestions.length + 1)
      );
      finalQuestions.splice(randomIndex, 0, wildcard);
    });

    return finalQuestions;
  };

  // Stage navigation handlers
  const handleStart = () => {
    setCurrentStage(GameStage.SETTINGS);
  };

  const handleBackToLanding = () => {
    setCurrentStage(GameStage.LANDING);
  };

  const handleStartGame = () => {
    const customQuestionSet = generateCustomQuestions();
    setCustomQuestions(customQuestionSet);
    setCurrentStage(GameStage.PLAYING);
  };

  const handleGameComplete = () => {
    setCurrentStage(GameStage.ENDING);
  };

  const handleRestart = () => {
    setCurrentStage(GameStage.LANDING);
    setCustomQuestions([]);
    setQuestionPercentage(50);
    const categories = Object.keys(game.theme.categories);
    setSelectedCategories(categories);
  };

  // Render current stage
  switch (currentStage) {
    case GameStage.LANDING:
      return <GameLanding game={game} onStart={handleStart} onExit={onExit} />;

    case GameStage.SETTINGS:
      return (
        <GameSettings
          game={game}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          questionPercentage={questionPercentage}
          onPercentageChange={setQuestionPercentage}
          onStartGame={handleStartGame}
          onBack={handleBackToLanding}
        />
      );

    case GameStage.PLAYING:
      return (
        <GamePlay
          game={game}
          questions={customQuestions}
          onExit={onExit}
          onComplete={handleGameComplete}
        />
      );

    case GameStage.ENDING:
      return <GameEnding onRestart={handleRestart} onExit={onExit} />;

    default:
      return null;
  }
};

export default GameInterface;
