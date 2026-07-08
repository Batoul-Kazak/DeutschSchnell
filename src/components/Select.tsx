import React, { useState, useRef, useEffect } from 'react';

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  colorScheme = 'violet',
  size = 'md',
  label,
  error,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const colorMap = {
    violet: {
      border: 'border-dark-violet focus:border-light-violet',
      bg: 'bg-white dark:bg-gray-800',
      hover: 'hover:bg-light-violet hover:text-white',
      selected: 'bg-light-violet text-white',
      ring: 'focus:ring-light-violet'
    },
    blue: {
      border: 'border-dark-blue focus:border-light-blue',
      bg: 'bg-white dark:bg-gray-800',
      hover: 'hover:bg-light-blue hover:text-white',
      selected: 'bg-light-blue text-white',
      ring: 'focus:ring-light-blue'
    },
    green: {
      border: 'border-dark-green focus:border-light-green',
      bg: 'bg-white dark:bg-gray-800',
      hover: 'hover:bg-light-green hover:text-dark-violet',
      selected: 'bg-light-green text-dark-violet',
      ring: 'focus:ring-light-green'
    },
    red: {
      border: 'border-dark-red focus:border-light-red',
      bg: 'bg-white dark:bg-gray-800',
      hover: 'hover:bg-light-red hover:text-white',
      selected: 'bg-light-red text-white',
      ring: 'focus:ring-light-red'
    },
    yellow: {
      border: 'border-dark-yellow focus:border-light-yellow',
      bg: 'bg-white dark:bg-gray-800',
      hover: 'hover:bg-light-yellow hover:text-dark-violet',
      selected: 'bg-light-yellow text-dark-violet',
      ring: 'focus:ring-light-yellow'
    }
  };

  const sizeMap = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };

  const colors = colorMap[colorScheme] || colorMap.violet;
  const sizeClass = sizeMap[size] || sizeMap.md;

  const selectedOption = options.find(opt => opt.value === value);
  const filteredOptions = searchable 
    ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full ${sizeClass} ${colors.bg}
          border-2 rounded-lg transition-all duration-200
          flex items-center justify-between
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${colors.border}
          ${error ? 'border-light-red' : ''}
          focus:outline-none focus:ring-2 ${colors.ring}
        `}
      >
        <span className={selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {error && (
        <p className="mt-1 text-sm text-light-red">{error}</p>
      )}

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border-2 border-dark-violet rounded-lg shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-light-violet"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-gray-500 text-center">No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-4 py-2 text-left transition-colors
                  ${value === option.value ? colors.selected : 'text-gray-700 dark:text-gray-300'}
                  ${value !== option.value ? colors.hover : ''}
                `}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Select;