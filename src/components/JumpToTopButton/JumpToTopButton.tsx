import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const JumpToTopButton = ({ color = "bg-light-violet" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [iconDirection, setIconDirection] = useState("up");

    useEffect(() => {
        const toggleArrowState = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollPosition > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            if (scrollPosition < (docHeight / 2)) {
                setIconDirection("down");
            } else {
                setIconDirection("up");
            }
        };

        window.addEventListener('scroll', toggleArrowState);
        return () => window.removeEventListener('scroll', toggleArrowState);
    }, []);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    function scrollToBottom() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        isVisible && (
            <button
                onClick={iconDirection === "up" ? scrollToTop : scrollToBottom}
                aria-label={iconDirection === "up" ? "Back to top" : "Go to bottom"}
                className={`fixed w-16 h-16 text-lg font-bold z-[1000] text-white transition-all duration-300 border-4 border-white rounded-full shadow-lg ${color} bottom-6 right-6 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-blue`}
            >
                {iconDirection === "up" ? <ArrowUpward /> : <ArrowDownward />}
            </button>
        )
    );
};

export default JumpToTopButton;