import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type PageContainerProps = {
    children: ReactNode;
    className?: string;
};

export default function Container({ children, className }: PageContainerProps) {
    return (
        <div className={twMerge(`w-full max-w-7xl mx-auto px-2 sm:px-10 text-gray-800 dark:bg-gray-900 dark:text-white lg:px-20 py-6 sm:py-8`, className)}>
            {children}
        </div>
    );
}