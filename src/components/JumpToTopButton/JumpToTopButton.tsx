import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const JumpToTopButton = ({ color = "bg-light-violet" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [iconDirection, setIconDirection] = useState("up");

    useEffect(() => {
        const toggleArrowState = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // 1/2 from viewport y
            if (window.scrollY > 300 && window.scrollY < 5000) {
                setIconDirection("down");
                // console.log("UUUUUPPP")
            } else if (window.scrollY > 300) {
                setIconDirection("up");
                // console.log("DOWWWWNN");
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
            top: 100,
            behavior: 'smooth'
        });
    };

    return (
        isVisible && (
            <button
                onClick={iconDirection == "up" ? scrollToTop : scrollToBottom}
                aria-label="Back to top"
                className={`fixed w-16 h-16 text-lg font-bold z-[1000] text-white transition-all duration-300 border-4 bg-dark-blue border-white rounded-full shadow-lg bg-dark-blue-600 ${color} bottom-6 right-6 hover:bg-dark-blue-700 focus:outline-none focus:ring-2 focus:ring-dark-blue-500`}
            >
                {iconDirection == "up" ? <ArrowUpward /> : <ArrowDownward />}
            </button>
        )
    );
};

export default JumpToTopButton;