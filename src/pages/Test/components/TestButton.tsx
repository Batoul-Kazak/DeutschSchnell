import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'nav-blue' | 'nav-violet' | 'result';
    children: React.ReactNode;
}

export default function TestButton({
    variant = 'nav-blue',
    className = '',
    disabled,
    children,
    ...props
}: ButtonProps) {

    let baseClasses = '';
    let activeClasses = '';
    let disabledClasses = '';

    switch (variant) {
        case 'result':
            baseClasses = 'px-6 py-2 font-bold text-white transition rounded-full bg-light-violet hover:opacity-90';
            disabledClasses = 'opacity-50 cursor-not-allowed';
            break;
        case 'nav-violet':
            baseClasses = 'sm:px-6 px-3 py-2 rounded-lg text-white font-bold bg-dark-violet dark:bg-light-violet hover:bg-gray-200';
            disabledClasses = 'bg-dark-violet/80 dark:bg-light-violet/80 cursor-not-allowed';
            break;
        case 'nav-blue':
        default:
            baseClasses = 'sm:px-6 px-3 py-2 font-bold rounded-lg text-white bg-dark-blue dark:bg-light-blue hover:opacity-90';
            disabledClasses = 'bg-dark-blue/80 dark:bg-light-blue/80 cursor-not-allowed';
            break;
    }

    const finalClassName = `${baseClasses} ${disabled ? disabledClasses : ''} ${className}`.trim();

    return (
        <button
            className={finalClassName}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}