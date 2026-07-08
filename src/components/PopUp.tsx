import React, { useEffect } from 'react';

const PopUp = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  size = 'md', 
  colorScheme = 'violet',
  closeOnBackdrop = true 
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl'
  };

  const colorMap = {
    violet: 'border-t-4 border-light-violet',
    blue: 'border-t-4 border-light-blue',
    green: 'border-t-4 border-light-green',
    red: 'border-t-4 border-light-red',
    yellow: 'border-t-4 border-light-yellow'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${closeOnBackdrop ? 'cursor-pointer' : ''}`}
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Modal Content */}
      <div 
        className={`
          relative w-full ${sizeClasses[size]} 
          bg-white dark:bg-gray-800 rounded-xl shadow-2xl 
          transform transition-all scale-100 opacity-100
          ${colorMap[colorScheme]}
        `}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
          {title && (
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl border-t border-gray-100 dark:border-gray-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUp;