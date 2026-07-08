import React, { useState } from 'react';

const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false,
  colorScheme = 'violet' 
}) => {
  const colorMap = {
    violet: {
      checked: 'bg-light-violet border-light-violet',
      unchecked: 'border-dark-violet hover:border-light-violet',
      icon: 'text-white'
    },
    blue: {
      checked: 'bg-light-blue border-light-blue',
      unchecked: 'border-dark-blue hover:border-light-blue',
      icon: 'text-white'
    },
    green: {
      checked: 'bg-light-green border-light-green',
      unchecked: 'border-dark-green hover:border-light-green',
      icon: 'text-dark-green'
    },
    red: {
      checked: 'bg-light-red border-light-red',
      unchecked: 'border-dark-red hover:border-light-red',
      icon: 'text-white'
    },
    yellow: {
      checked: 'bg-light-yellow border-light-yellow',
      unchecked: 'border-dark-yellow hover:border-light-yellow',
      icon: 'text-dark-violet'
    }
  };

  const colors = colorMap[colorScheme] || colorMap.violet;
  
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
            ${checked ? colors.checked : colors.unchecked}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        >
          {checked && (
            <svg
              className={`w-3 h-3 ${colors.icon}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      {label && (
        <span className="text-sm text-gray-700 dark:text-gray-300 select-none">
          {label}
        </span>
      )}
    </label>
  );
};

// Example usage
// const CheckboxDemo = () => {
//   const [states, setStates] = useState({
//     violet: false,
//     blue: false,
//     green: false,
//     red: false,
//     yellow: false
//   });

//   const handleChange = (key) => {
//     setStates(prev => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-lg font-semibold mb-4">Custom Checkboxes</h2>
      
//       <Checkbox
//         label="Violet Theme"
//         checked={states.violet}
//         onChange={() => handleChange('violet')}
//         colorScheme="violet"
//       />
      
//       <Checkbox
//         label="Blue Theme"
//         checked={states.blue}
//         onChange={() => handleChange('blue')}
//         colorScheme="blue"
//       />
      
//       <Checkbox
//         label="Green Theme"
//         checked={states.green}
//         onChange={() => handleChange('green')}
//         colorScheme="green"
//       />
      
//       <Checkbox
//         label="Red Theme"
//         checked={states.red}
//         onChange={() => handleChange('red')}
//         colorScheme="red"
//       />
      
//       <Checkbox
//         label="Yellow Theme"
//         checked={states.yellow}
//         onChange={() => handleChange('yellow')}
//         colorScheme="yellow"
//       />
      
//       <Checkbox
//         label="Disabled Checkbox"
//         checked={false}
//         onChange={() => {}}
//         disabled
//         colorScheme="violet"
//       />
//     </div>
//   );
// };

export default Checkbox;