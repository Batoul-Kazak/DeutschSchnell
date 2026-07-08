import React from 'react';

const Typography = ({ 
  as: Component = 'p', 
  variant = 'body', 
  children, 
  className = '', 
  color = 'default',
  align = 'left',
  weight = 'normal'
}) => {
  const variants = {
    h1: 'text-4xl md:text-5xl font-bold leading-tight',
    h2: 'text-3xl md:text-4xl font-bold leading-snug',
    h3: 'text-2xl md:text-3xl font-semibold leading-normal',
    h4: 'text-xl md:text-2xl font-semibold leading-normal',
    h5: 'text-lg md:text-xl font-medium',
    h6: 'text-base md:text-lg font-medium uppercase tracking-wide',
    body: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
    caption: 'text-xs text-gray-500 uppercase tracking-wider',
    large: 'text-lg md:text-xl leading-relaxed'
  };

  const colors = {
    default: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-600 dark:text-gray-400',
    violet: 'text-light-violet',
    blue: 'text-light-blue',
    green: 'text-dark-green',
    red: 'text-light-red',
    white: 'text-white'
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const baseClass = variants[variant] || variants.body;
  const colorClass = colors[color] || colors.default;
  const alignClass = alignments[align];
  const weightClass = weights[weight];

  return (
    <Component 
      className={`
        font-sans 
        ${baseClass} 
        ${colorClass} 
        ${alignClass} 
        ${weight === 'normal' && variant.includes('h') ? weights.semibold : weightClass}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default Typography;