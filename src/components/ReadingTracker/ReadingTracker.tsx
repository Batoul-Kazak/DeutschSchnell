import { useState, useEffect } from 'react';

export default function ReadingTracker() {
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = docHeight ? (scrollTop / docHeight) * 100 : 0;
            setScrollPercent(Math.min(100, Math.max(0, percent)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full h-2 overflow-hidden bg-gray-700 rounded-full">
            <div
                className="h-full transition-all duration-100 ease-linear bg-my-red"
                style={{ width: `${scrollPercent}%` }}
            />
        </div>
    );
}