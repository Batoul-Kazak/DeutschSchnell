import React from 'react';

const CustomButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  colorScheme = 'violet',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button'
}) => {
  const colorMap = {
    violet: {
      primary: 'bg-light-violet hover:bg-dark-violet text-white',
      secondary: 'bg-transparent border-2 border-light-violet text-light-violet hover:bg-light-violet hover:text-white',
      danger: 'bg-light-red hover:bg-dark-red text-white'
    },
    blue: {
      primary: 'bg-light-blue hover:bg-dark-blue text-white',
      secondary: 'bg-transparent border-2 border-light-blue text-light-blue hover:bg-light-blue hover:text-white',
      danger: 'bg-light-red hover:bg-dark-red text-white'
    },
    green: {
      primary: 'bg-light-green hover:bg-dark-green text-dark-violet',
      secondary: 'bg-transparent border-2 border-light-green text-dark-green hover:bg-light-green',
      danger: 'bg-light-red hover:bg-dark-red text-white'
    },
    red: {
      primary: 'bg-light-red hover:bg-dark-red text-white',
      secondary: 'bg-transparent border-2 border-light-red text-light-red hover:bg-light-red hover:text-white',
      danger: 'bg-dark-red hover:bg-light-red text-white'
    },
    yellow: {
      primary: 'bg-light-yellow hover:bg-dark-yellow text-dark-violet',
      secondary: 'bg-transparent border-2 border-light-yellow text-dark-yellow hover:bg-light-yellow',
      danger: 'bg-light-red hover:bg-dark-red text-white'
    }
  };

  const sizeMap = {
    sm: `px-3 py-1.5 text-sm ${fullWidth ? 'w-full' : 'w-[100px]'}`,
    md: `px-4 py-2 text-base ${fullWidth ? 'w-full' : 'w-[200px]'}`,
    lg: `px-6 py-3 text-lg ${fullWidth ? 'w-full' : 'w-60'}`
  };

  const colors = colorMap[colorScheme] || colorMap.violet;
  const variantClass = colors[variant] || colors.primary;
  const sizeClass = sizeMap[size] || sizeMap.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClass}
        ${sizeClass}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg font-semibold transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${colorScheme === 'violet' && 'focus:ring-light-violet'}
        ${colorScheme === 'blue' && 'focus:ring-light-blue'}
        ${colorScheme === 'green' && 'focus:ring-light-green'}
        ${colorScheme === 'red' && 'focus:ring-light-red'}
        ${colorScheme === 'yellow' && 'focus:ring-light-yellow'}
      `}
    >
      {children}
    </button>
  );
};

export default CustomButton;