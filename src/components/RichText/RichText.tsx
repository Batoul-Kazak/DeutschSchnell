import React, { ReactNode } from 'react';

type RichTextProps = {
    text: string;
    translation?: string;
    replace?: boolean;
    replacement?: ReactNode | ((match: string, index: number) => ReactNode);
    className?: string;
};

export default function RichText({
    text,
    translation,
    replace = false,
    replacement = <span className="underline">_______</span>,
    className = 'font-bold text-dark-green'
}: RichTextProps) {
    
    const renderContent = () => {
        if (replace) {
            const parts = text.split(/\*\*(.*?)\*\*/g);
            return (
                <>
                    {parts.map((part, i) => {
                        // Odd indices are the matches inside **
                        if (i % 2 === 1) {
                            if (typeof replacement === 'function') {
                                return <React.Fragment key={i}>
                                    {replacement(part, Math.floor(i / 2))}
                                </React.Fragment>;
                            }
                            return <span key={i} className={className}>{replacement}</span>;
                        }
                        // Even indices are the plain text between matches
                        return <React.Fragment key={i}>{part}</React.Fragment>;
                    })}
                </>
            );
        }

        // Non-replace mode: just bolds text inside **
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return (
            <>
                {parts.map((part, i) =>
                    part.startsWith('**') && part.endsWith('**') ? (
                        <span key={i} className={`font-bold ${className}`}>
                            {part.slice(2, -2)}
                        </span>
                    ) : (
                        <React.Fragment key={i}>{part}</React.Fragment>
                    )
                )}
            </>
        );
    };

    return (
        <div className="flex flex-col gap-1">
            <div>{renderContent()}</div>
            {translation && (
                <span className="text-[10px] sm:text-xs text-gray-800  italic mt-1 block">
                    {translation}
                </span>
            )}
        </div>
    );
}