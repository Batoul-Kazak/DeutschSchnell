

import React, { ReactNode } from 'react';


type RichTextProps = {
    text: string;
    replace?: boolean;
    replacement?: ReactNode;
    className?: string;
};

export default function RichText({
    text,
    replace = false,
    replacement = <span className="underline">_______</span>,
    className = 'font-bold text-my-orange'
}: RichTextProps) {
    if (replace) {
        const parts = text.split(/\*\*(.*?)\*\*/g);
        return (
            <>
                {parts.map((part, i) => {
                    if (i % 2 === 1) {
                        if (typeof replacement === 'function') {
                            return <React.Fragment key={i}>
                                {replacement(part, Math.floor(i / 2))}
                            </React.Fragment>;
                        }
                        return <React.Fragment key={i}>{replacement}</React.Fragment>;
                    }
                    return <React.Fragment key={i}>{part}</React.Fragment>;
                })}
            </>
        );
    }

    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <>
            {parts.map((part, i) =>
                part.startsWith('**') && part.endsWith('**') ? (
                    // <span key={i} className={twMerge("font-bold", className)}>
                    <span key={i} className={`font-bold ${className}`}>
                        {part.slice(2, -2)}
                    </span>
                ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                )
            )}
        </>
    );
}