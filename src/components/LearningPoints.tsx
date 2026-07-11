import React from 'react';

type LearningPointsProps = {
    items: string[];
};

export default function LearningPoints({ items }: LearningPointsProps) {
    return (
        <div className="bg-white dark:bg-dark-violet rounded-lg p-4 sm:p-6 shadow-md">
            <h3 className="text-lg sm:text-xl font-bold text-dark-violet dark:text-light-yellow mb-3 sm:mb-4">
                What You'll Learn
            </h3>
            <ul className="space-y-2 sm:space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-light-green dark:bg-dark-green flex items-center justify-center text-dark-green dark:text-light-green font-bold text-xs sm:text-sm">
                            {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}