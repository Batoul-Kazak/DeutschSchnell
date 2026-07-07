import { motion } from 'framer-motion';


const HamburgerIcon = ({ isOpen = false, setIsOpen, className = "w-6 h-6" }) => {
    return (
        <button onClick={() => setIsOpen((isOpen: boolean) => !isOpen)} className='md:hidden lg:hidden'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                className={className}
                aria-hidden="true"
                style={{ overflow: "visible" }}
            >
                <motion.rect
                    x="0.5"
                    y="2.5"
                    width="15"
                    height="3"
                    rx="1"
                    fill="#000000"
                    animate={{ translateX: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                />

                <motion.rect
                    x="0.5"
                    y="5.5"
                    width="15"
                    height="3"
                    rx="1"
                    fill="#cc0000"
                    animate={{
                        translateX: isOpen ? -3 : 0,
                        // opacity: isOpen ? 0 : 1
                    }}
                    transition={{ duration: 0.15 }}
                />

                <motion.rect
                    x="0.5"
                    y="8.5"
                    width="15"
                    height="3"
                    rx="1"
                    fill="#ffa500"
                    animate={{ translateX: isOpen ? -5 : 0 }}
                    transition={{ duration: 0.15 }}
                />
            </svg>
        </button>
    );
};

export default HamburgerIcon;