import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
}

const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            icon,
            iconPosition = 'left',
            className = '',
            disabled = false,
            type = 'button',
            ...props
        },
        ref
    ) => {
        // Base: always has a border for "real" feel
        const baseClasses =
            'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap border';

        // Variant styles — now with explicit border + background
        const variantClasses = {
            primary:
                'bg-orange-600 border-indigo-700 text-white hover:bg-indigo-700 hover:border-indigo-800 active:bg-indigo-800 active:border-transparent focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900',
            secondary:
                'bg-black border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 active:border-transparent focus:ring-gray-500 focus:ring-offset-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:border-gray-500 dark:active:bg-gray-700 dark:active:border-transparent dark:focus:ring-offset-gray-900',
            ghost:
                'bg-transparent border-transparent text-gray-700 hover:bg-gray-100 hover:border-gray-300 active:bg-gray-200 active:border-transparent focus:ring-gray-400 focus:ring-offset-white dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:border-gray-600 dark:active:bg-gray-700 dark:focus:ring-offset-gray-900',
        };

        // Size + spacing (gap handles icon/text spacing)
        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm gap-1.5',
            md: 'px-4 py-2 text-base gap-2',
            lg: 'px-6 py-3 text-base gap-2',
        };

        const classes = [
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            fullWidth && 'w-full',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        const renderContent = () => {
            if (!icon) return children;
            if (iconPosition === 'left') {
                return (
                    <>
                        {icon}
                        {children && <span>{children}</span>}
                    </>
                );
            }
            return (
                <>
                    {children && <span>{children}</span>}
                    {icon}
                </>
            );
        };

        return (
            <button
                ref={ref}
                type={type}
                className={classes}
                disabled={disabled}
                {...props}
            >
                {renderContent()}
            </button>
        );
    }
);

Button.displayName = 'CustomButton';

export default Button;