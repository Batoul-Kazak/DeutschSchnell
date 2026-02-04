// components/Button.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
};

export default function Button({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
}: ButtonProps) {
    const baseClasses = "font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-my-violet text-white hover:bg-my-orange focus:ring-my-red",
        secondary: "bg-my-red text-white hover:bg-my-blue focus:ring-my-violet",
        outline: "border-2 border-my-red text-my-red hover:bg-my-red/10 focus:ring-my-red",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-5 py-2 text-base",
        lg: "px-7 py-3 text-lg",
    };

    return (
        <button
            className={twMerge(
                baseClasses,
                variants[variant],
                sizes[size],
                disabled && "opacity-60 cursor-not-allowed",
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}