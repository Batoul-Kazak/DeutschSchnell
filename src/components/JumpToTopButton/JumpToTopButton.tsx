import { ArrowUpward } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const JumpToTopButton = ({ color = "bg-light-violet" }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className={`fixed w-16 h-16 text-lg font-bold z-[1000] text-white transition-all duration-300 border-4 bg-dark-blue border-white rounded-full shadow-lg bg-dark-blue-600 ${color} bottom-6 right-6 hover:bg-dark-blue-700 focus:outline-none focus:ring-2 focus:ring-dark-blue-500`}
            >
                <ArrowUpward />
            </button>
        )
    );
};

export default JumpToTopButton;