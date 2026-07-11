import React from 'react';
import { Link } from 'react-router-dom';

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
    separator?: string;
    className?: string;
};

export default function Breadcrumb({ 
    items, 
    separator = '>',
    className 
}: BreadcrumbProps) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={`text-sm py-4 ${className}`}>
            <ol className="flex flex-wrap items-center gap-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-2">
                            {!isLast ? (
                                <>
                                    <Link
                                        to={item.href || '#'}
                                        className="text-gray-500 hover:text-dark-violet dark:text-gray-400 dark:hover:text-light-yellow transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                    <span className="text-gray-400 dark:text-gray-600">{separator}</span>
                                </>
                            ) : (
                                <span className="font-medium text-dark-violet dark:text-light-yellow">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}