import React, { useState, useRef } from 'react';

const FlashcardGrid = ({
  cards,
  layout = 'grid-4',
  learningMode = false,
  questionAudio = null,
  questionText = '',
  allowReplayQuestion = true,
  maxAttempts = null,
  cardContentType = 'image',
  initialFlipState = 'flipped',
  onCardClick,
  gridSize = "md"
}) => {
  const [flippedCards, setFlippedCards] = useState(
    initialFlipState === 'shown' 
      ? cards.map((_, i) => i) 
      : []
  );
  const [attempts, setAttempts] = useState(0);
  const audioRef = useRef(null);

  const gridCols = {
    'grid-4': 'grid-cols-2',
    'grid-9': 'grid-cols-3',
    'grid-16': 'grid-cols-4',
    'learning': 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
  };

  const gridWidth = gridSize === "lg" ? "w-[400px]" : 
    gridSize === "md" ? "w-[300px]" : 
    gridSize === "sm" ? "w-[200px]" : "w-[100px]";

  const cardWidth =  gridSize === "lg" ? "w-[100px]" : 
    gridSize === "md" ? "w-[80px]" : 
    gridSize === "sm" ? "w-[60px]" : "w-[40px]";

  const playQuestionAudio = () => {
    if (questionAudio && allowReplayQuestion) {
      const audio = new Audio(questionAudio);
      audio.play();
    }
  };

  const handleCardClick = (index) => {
    if (maxAttempts && attempts >= maxAttempts) return;

    if (!learningMode && !flippedCards.includes(index)) {
      setAttempts(prev => prev + 1);
    }

    if (initialFlipState === 'flipped') {
      setFlippedCards(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }

    if (cards[index].audio) {
      const audio = new Audio(cards[index].audio);
      audio.play();
    }

    if (onCardClick) {
      onCardClick(index, cards[index]);
    }
  };

  const renderCardContent = (card, index) => {
    const isFlipped = flippedCards.includes(index);
    const showContent = learningMode || isFlipped || initialFlipState === 'shown';

    if (cardContentType === 'image') {
      return (
        <div className="relative w-full h-full">
          <img
            src={showContent ? card.content : card.backImage || '/placeholder.png'}
            alt={card.label || `Card ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          {showContent && card.text && (
            <p className="absolute bottom-2 left-2 right-2 bg-white/90 dark:bg-gray-800/90 p-2 rounded text-sm text-center">
              {card.text}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-light-violet">
        <p className="text-center font-semibold">{card.content}</p>
      </div>
    );
  };

  return (
    <div className={`space-y-6 bg-yellow-300 ${gridWidth}`}>
      {/* Question Section */}
      {!learningMode && (questionAudio || questionText) && (
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          {questionText && (
            <h2 className="text-xl font-bold mb-3 text-center">{questionText}</h2>
          )}
          {questionAudio && (
            <button
              onClick={playQuestionAudio}
              disabled={!allowReplayQuestion && attempts > 0}
              className="mx-auto block px-6 py-3 bg-light-violet hover:bg-dark-violet text-white rounded-lg font-semibold transition-all disabled:opacity-50"
            >
              {attempts === 0 ? 'Play Question' : allowReplayQuestion ? 'Replay Question' : 'Question Played'}
            </button>
          )}
          {maxAttempts && (
            <p className="text-center mt-3 text-sm text-gray-600">
              Attempts: {attempts}/{maxAttempts}
            </p>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div className={`grid ${gridCols[layout] || gridCols['grid-4']} gap-4`}>
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            disabled={maxAttempts && attempts >= maxAttempts}
            className={` ${cardWidth}
              aspect-square relative overflow-hidden cursor-pointer
              transition-transform duration-300 hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed
              ${initialFlipState === 'flipped' && !flippedCards.includes(index) && !learningMode ? 'bg-gray-200 dark:bg-gray-700' : ''}
            `}
          >
            {renderCardContent(card, index)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlashcardGrid;