import React, { useState } from 'react';

const TriStateCheckbox = ({ 
  label, 
  onChange,
  value = "unanswered",
  colorScheme = 'violet' 
}) => {
  // const [answer, setAnswer] = useState('unanswered');

  const handleClick = () => {
    const states = ['unanswered', 'true', 'false'];
    const currentIndex = states.indexOf(value);
    const nextAnswer = states[(currentIndex + 1) % states.length];
    // setAnswer(nextAnswer);
    if (onChange) onChange(nextAnswer);
  };

  const colorMap = {
    violet: {
      true: 'bg-dark-green border-dark-green',
      false: 'bg-dark-red border-dark-red',
      unanswered: 'border-dark-violet dark:border-light-violet hover:border-light-violet'
    },
    blue: {
      true: 'bg-light-green border-light-green',
      false: 'bg-dark-red border-dark-red',
      unanswered: 'border-dark-blue dark:border-light-blue hover:border-light-blue'
    },
    green: {
      true: 'bg-dark-green border-dark-green',
      false: 'bg-dark-red border-dark-red',
      unanswered: 'border-dark-green dark:border-light-green hover:border-light-green'
    },
    red: {
      true: 'bg-dark-green border-dark-green',
      false: 'bg-dark-red border-dark-red',
      unanswered: 'border-dark-red dark:border-light-red hover:border-light-red'
    },
    yellow: {
      true: 'bg-dark-green border-dark-green',
      false: 'bg-dark-red border-dark-red',
      unanswered: 'border-dark-yellow dark:border-light-yellow hover:border-light-yellow'
    }
  };

  const colors = colorMap[colorScheme] || colorMap.violet;

  const renderIcon = () => {
    if (value === 'true') {
      return (
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (value === 'false') {
      return (
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    return null;
  };

  const getColorClass = () => {
    if (value === 'true') return colors.true;
    if (value === 'false') return colors.false;
    return colors.unanswered;
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      
      {label && (
        <span className="text-sm text-gray-700 dark:text-gray-300 select-none">
          {label}
        </span>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={handleClick}
          className={`
            w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
            ${getColorClass()}
          `}
        >
          {renderIcon()}
        </button>
      </div>
    </label>
  );
};

export default TriStateCheckbox;