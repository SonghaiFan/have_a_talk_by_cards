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

interface GameControllerProps {
  game: ConversationGame;
  onExit: () => void;
}

const GameController: React.FC<GameControllerProps> = ({ game, onExit }) => {
  const [currentStage, setCurrentStage] = useState<GameStage>(
    GameStage.LANDING
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionPercentage, setQuestionPercentage] = useState(100);
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
    // Process all questions within each category (no separation needed)
    const categoryQuestions: any[] = [];

    game.questions
      .filter((categoryData: any) =>
        selectedCategories.includes(categoryData.category)
      )
      .forEach((categoryData: any) => {
        const questions = categoryData.questions.map(
          (question: any, qIndex: number) => ({
            ...question,
            categoryIndex: game.questions.findIndex(
              (cat: any) => cat.category === categoryData.category
            ),
            questionIndex: qIndex,
            category: categoryData.category,
          })
        );

        if (questions.length > 0) {
          categoryQuestions.push({
            category: categoryData.category,
            questions: questions,
          });
        }
      });

    // Calculate total questions to take
    const totalAvailableQuestions = categoryQuestions.reduce(
      (sum, catData) => sum + catData.questions.length,
      0
    );

    const totalQuestions = Math.round(
      (totalAvailableQuestions * questionPercentage) / 100
    );

    // Distribute questions proportionally across categories
    const questionsPerCategory = categoryQuestions.map((catData) => {
      const proportion = catData.questions.length / totalAvailableQuestions;
      const questionsForCategory = Math.round(proportion * totalQuestions);
      return {
        ...catData,
        targetCount: Math.max(1, questionsForCategory), // Ensure at least 1 question per category
      };
    });

    // Adjust for rounding differences
    const actualTotal = questionsPerCategory.reduce(
      (sum, cat) => sum + cat.targetCount,
      0
    );
    if (actualTotal > totalQuestions) {
      // Remove questions from the category with the most questions
      const maxCategory = questionsPerCategory.reduce((max, cat) =>
        cat.targetCount > max.targetCount ? cat : max
      );
      maxCategory.targetCount -= actualTotal - totalQuestions;
    }

    // Randomly sample questions from each category, maintaining category order
    const finalQuestions: any[] = [];
    questionsPerCategory.forEach((catData) => {
      const shuffledQuestions = [...catData.questions].sort(
        () => 0.5 - Math.random()
      );
      const selectedQuestions = shuffledQuestions.slice(0, catData.targetCount);
      finalQuestions.push(...selectedQuestions);
    });

    // After all other logic, move 'end' type questions to the end
    const endQuestions = finalQuestions.filter((q: any) => q.type === "end");
    const nonEndQuestions = finalQuestions.filter((q: any) => q.type !== "end");
    return [...nonEndQuestions, ...endQuestions];
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
    setQuestionPercentage(100);
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
      return (
        <GameEnding game={game} onRestart={handleRestart} onExit={onExit} />
      );

    default:
      return null;
  }
};

export default GameController;
