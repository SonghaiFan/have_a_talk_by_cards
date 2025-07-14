import React, { useState } from 'react';
import { ConversationGame } from '../types/ConversationGame';

interface GameInterfaceProps {
  game: ConversationGame;
  onExit: () => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ game, onExit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);

  const allQuestions = game.questions.flatMap((category: any, catIndex: number) =>
    category.questions.map((question: any, qIndex: number) => ({
      ...question,
      categoryIndex: catIndex,
      questionIndex: qIndex,
      category: category.category
    }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex] || null;
  const currentCategory = currentQuestion ? game.theme.categories[currentQuestion.category] : null;

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16">
        {/* Exit Button - Minimal */}
        <button 
          className="absolute top-8 left-8 w-12 h-12 flex items-center justify-center text-2xl text-secondary hover:text-primary transition-colors duration-200"
          onClick={onExit}
        >
          ←
        </button>

        {/* Start Screen - Centered & Bold */}
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-black text-primary mb-8 tracking-tight leading-tight">
            {game.ui.startScreen.title}
          </h1>
          
          {game.ui.startScreen.description.map((desc: string, index: number) => (
            <p key={index} className="text-xl text-secondary text-intimate font-light mb-6 leading-relaxed">
              {desc}
            </p>
          ))}

          <button 
            className="mt-12 bg-primary text-white px-12 py-4 rounded-xl text-lg font-semibold tracking-wide transition-all duration-200 hover:bg-secondary hover:-translate-y-0.5"
            onClick={handleStart}
          >
            {game.ui.startScreen.startButton}
          </button>
        </div>
      </div>
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
      style={{ backgroundColor: currentCategory?.color || '#ffffff' }}
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white opacity-60" />
                <span className="text-sm font-medium text-white opacity-90 uppercase tracking-wider">
                  {currentCategory.name}
                </span>
              </div>
            </div>
          )}

          {/* Question Card - Real Card Size */}
          <div className="bg-gray-50 text-center animate-fade-in mx-auto relative"
               style={{ 
                 width: 'min(320px, 90vw)', 
                 height: 'min(450px, 80vh)',
                 maxWidth: '320px',
                 maxHeight: '450px',
                 aspectRatio: '320/450',
                 borderRadius: '24px',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'space-between',
                 padding: 'min(40px, 8vw) min(30px, 6vw)',
                 boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
               }}>
            
            {/* Main Question - Centered */}
            <div className="flex-1 flex items-center justify-center">
              <h2 className="font-black uppercase tracking-wide leading-tight text-center"
                  style={{ 
                    color: currentCategory?.color || '#dc2626',
                    lineHeight: '1.2',
                    fontSize: 'clamp(16px, 4vw, 20px)'
                  }}>
                {currentQuestion?.question}
              </h2>
            </div>
            
            {/* Edition Label - Bottom */}
            <div className="text-center">
              <p className="uppercase tracking-widest font-bold opacity-70"
                 style={{ 
                   color: currentCategory?.color || '#dc2626',
                   fontSize: 'clamp(10px, 2.5vw, 12px)'
                 }}>
                {game.app.title}
              </p>
            </div>
          </div>

          {/* Category Description - Subtle */}
          {currentCategory && (
            <div className="text-center mt-8">
              <p className="text-sm text-white opacity-70 font-light">
                {currentCategory.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation - Minimal Controls */}
      <div className="flex items-center justify-between p-8">
        <button 
          className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <span className="text-lg">←</span>
          <span className="text-sm font-medium uppercase tracking-wider">
            {game.ui.navigation.prevButton}
          </span>
        </button>

        {/* Progress Indicator - Minimal */}
        <div className="flex-1 mx-12">
          <div className="h-0.5 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%`
              }}
            />
          </div>
        </div>

        <button 
          className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors duration-200"
          onClick={handleNext}
        >
          <span className="text-sm font-medium uppercase tracking-wider">
            {currentQuestionIndex === allQuestions.length - 1 ? 'Complete' : game.ui.navigation.nextButton}
          </span>
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default GameInterface;