import React, { useState } from 'react';

const MatchComponent = ({ 
  columnA, 
  columnB, 
  correctPairs, 
  onMatchComplete,
  ColumnAText = "Column A",
  ColumnBText = "Column B",
  colorScheme = 'violet'
}) => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState([]);

  const colorMap = {
    violet: {
      selected: 'bg-light-violet text-white border-light-violet',
      matched: 'bg-light-green text-dark-violet border-light-green',
      wrong: 'bg-light-red text-white border-dark-red',
      default: 'border-dark-violet hover:border-light-violet text-gray-700'
    },
    blue: {
      selected: 'bg-light-blue text-white border-light-blue',
      matched: 'bg-light-green text-dark-violet border-light-green',
      wrong: 'bg-light-red text-white border-dark-red',
      default: 'border-dark-blue hover:border-light-blue text-gray-700'
    },
    green: {
      selected: 'bg-light-green text-dark-violet border-light-green',
      matched: 'bg-dark-green text-white border-dark-green',
      wrong: 'bg-light-red text-white border-dark-red',
      default: 'border-dark-green hover:border-light-green text-gray-700'
    },
    red: {
      selected: 'bg-light-red text-white border-light-red',
      matched: 'bg-light-green text-dark-violet border-light-green',
      wrong: 'bg-dark-red text-white border-dark-red',
      default: 'border-dark-red hover:border-light-red text-gray-700'
    },
    yellow: {
      selected: 'bg-light-yellow text-dark-violet border-light-yellow',
      matched: 'bg-light-green text-dark-violet border-light-green',
      wrong: 'bg-light-red text-white border-dark-red',
      default: 'border-dark-yellow hover:border-light-yellow text-gray-700'
    }
  };

  const colors = colorMap[colorScheme] || colorMap.violet;

  const handleSelectA = (index) => {
    if (matchedPairs.some(pair => pair.aIndex === index)) return;
    setSelectedA(index);
    
    if (selectedB !== null) {
      checkMatch(index, selectedB);
    }
  };

  const handleSelectB = (index) => {
    if (matchedPairs.some(pair => pair.bIndex === index)) return;
    setSelectedB(index);
    
    if (selectedA !== null) {
      checkMatch(selectedA, index);
    }
  };

  const checkMatch = (aIndex, bIndex) => {
    const isCorrect = correctPairs.some(
      pair => pair.aIndex === aIndex && pair.bIndex === bIndex
    );

    if (isCorrect) {
      setMatchedPairs([...matchedPairs, { aIndex, bIndex }]);
      
      if (matchedPairs.length + 1 === correctPairs.length) {
        if (onMatchComplete) onMatchComplete();
      }
    } else {
      setWrongAttempts([...wrongAttempts, { aIndex, bIndex }]);
      setTimeout(() => {
        setWrongAttempts(prev => prev.filter(
          attempt => !(attempt.aIndex === aIndex && attempt.bIndex === bIndex)
        ));
      }, 1000);
    }

    setSelectedA(null);
    setSelectedB(null);
  };

  const getItemClass = (type, index) => {
    const isMatched = matchedPairs.some(
      pair => type === 'A' ? pair.aIndex === index : pair.bIndex === index
    );
    const isSelected = type === 'A' ? selectedA === index : selectedB === index;
    const isWrong = wrongAttempts.some(
      attempt => type === 'A' ? attempt.aIndex === index : attempt.bIndex === index
    );

    if (isMatched) return colors.matched;
    if (isWrong) return colors.wrong;
    if (isSelected) return colors.selected;
    return colors.default;
  };

  return (
    <div className="flex gap-8 p-6">
      {/* Column A */}
      <div className="flex-1 space-y-3">
        <h3 className="text-lg font-semibold mb-4 text-center">{ColumnAText}</h3>
        {columnA.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSelectA(index)}
            disabled={matchedPairs.some(pair => pair.aIndex === index)}
            className={`
              w-full p-4 rounded-lg border-2 transition-all duration-200
              ${getItemClass('A', index)}
              ${matchedPairs.some(pair => pair.aIndex === index) ? 'cursor-default' : 'cursor-pointer'}
            `}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Column B */}
      <div className="flex-1 space-y-3">
        <h3 className="text-lg font-semibold mb-4 text-center">{ColumnBText}</h3>
        {columnB.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSelectB(index)}
            disabled={matchedPairs.some(pair => pair.bIndex === index)}
            className={`
              w-full p-4 rounded-lg border-2 transition-all duration-200
              ${getItemClass('B', index)}
              ${matchedPairs.some(pair => pair.bIndex === index) ? 'cursor-default' : 'cursor-pointer'}
            `}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MatchComponent;