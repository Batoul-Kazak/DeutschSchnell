import { Search, Visibility } from '@mui/icons-material';
import deutschSchnellIcon from '../../../public/icons/deutschionary_logo.svg';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSearch } from '../../hooks/useSearch';
import SearchBar from './SearchBar';

const gradientColors = [
    '#000000',
    '#222222',
    '#444444',
    '#660000',
    '#880000',
    '#aa0000',
    '#cc0000',
    '#e63900',
    '#ff4500',
    '#ff6300',
    '#ff7700',
    '#ff8c00',
    '#ffa500',
    '#ffb733',
    '#ffc966',
    '#ffd700',
    '#ffe033',
    '#ffea66',
    '#fff0b3'
];

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'courses', label: 'Courses' },
    { id: 'team', label: 'Team' },
    { id: 'events', label: 'Events' },
    { id: 'contactus', label: 'Register Now!' },
];

export default function Navbar() {
    const [activeLink, setActiveLink] = useState<string>('');
    const [isFixed, setIsFixed] = useState<boolean>(false);
    const { query, setQuery, results, showResults, setShowResults, searchRef, handleSelect } = useSearch();
    const [isHamburgerIconOpen, setHamburgerIconOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsFixed(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header style={{ backgroundColor: 'rgb(123,106,218)' }}>
            <div
                style={isFixed ? { zIndex: 100 } : {}}
                className={`${isFixed ? 'fixed  z-[1000] top-0 left-0' : ''} flex md:flex-row md:h-[100px] place-content-center place-items-center lg:h-auto flex-row justify-between w-full p-5 lg:px-20  text-white bg-my-violet rounded-tl-none rounded-tr-none rounded-3xl place-items-center`}
            >
                <div className="flex gap-5 hover:cursor-pointer min-w-[100px]" >
                    <Link to="/">
                        <motion.h1
                            initial={{ rotate: '0deg' }}
                            animate={{ rotate: '360deg' }}
                            transition={{ duration: 1, ease: 'anticipate' }}
                            className="flex items-center gap-2 font-bold uppercase"

                        >
                            <img src={deutschSchnellIcon} alt="logo" className="w-10 h-10" />

                            <span className="tracking-[-0.05em] " >
                                {Array.from("DeutschSchnell").map((char, index) => {
                                    const color = gradientColors[index % gradientColors.length];

                                    return (
                                        <span
                                            key={index}
                                            className="text-2xl"
                                            style={{ color }}
                                        >
                                            {index == 7 && <div className='block md:hidden'></div>}
                                            {char}
                                        </span>
                                    );
                                })}
                            </span>
                        </motion.h1>
                    </Link>
                </div>

                <div className="w-[1px] h-8 bg-slate-400 hidden lg:block"></div>
                <div className='hidden search md:block sm:block'>
                    <SearchBar
                        query={query}
                        onQueryChange={setQuery}
                        onFocus={() => query && setShowResults(true)}
                        showResults={showResults}
                        results={results}
                        onResultSelect={handleSelect}
                        searchRef={searchRef}
                    />
                </div>

                <div className="lg:max-w-[50%] max-w-[300px] hidden md:block place-self-start nav-links">
                    <ul className="flex flex-wrap justify-between w-full place-content-center place-items-center">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <ScrollLink
                                    to={item.id}
                                    smooth={true}
                                    duration={1000}
                                    onClick={() => setActiveLink(item.id)}
                                    className={`cursor-pointer rounded-full p-3 hover:text-[#ffbe0bff] hover:underline ${activeLink === item.id ? 'bg-white/20' : ''
                                        }`}
                                >
                                    {item.label}
                                </ScrollLink>
                            </li>
                        ))}
                        <li>
                            <RouterLink to="/tests">Tests</RouterLink>
                        </li>
                    </ul>
                </div>

                <HamburgerIcon isOpen={isHamburgerIconOpen} setIsOpen={setHamburgerIconOpen} />
            </div>

            <div className={`md:hidden w-[70%] sm:w-[30%] z-[200] bg-my-violet/90 h-full text-white fixed top-[13%] pt-20 transition-all duration-300 right-0 ${isHamburgerIconOpen ? "translate-x-0" : "translate-x-[100%]"} `}>
                <ul className='flex flex-col w-full '>
                    {navItems.map(item => (
                        <li key={item.id} className={`w-full p-4 cursor-pointer hover:bg-my-violet/80 ${activeLink === item.id ? 'bg-white/20' : ''
                            }`}>
                            <ScrollLink
                                to={item.id}
                                smooth={true}
                                duration={1000}
                                onClick={() => setActiveLink(item.id)}
                                className={` rounded-full p-3  w-full `}
                            >
                                {item.label}
                            </ScrollLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header >
    );
}

export const HamburgerIcon = ({ isOpen = false, setIsOpen, className = "w-6 h-6" }) => {
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
                    fill="#000000"
                    animate={{ translateX: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                />

                <motion.rect
                    x="0.5"
                    y="5.5"
                    width="15"
                    height="3"
                    fill="#880000"
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
                    fill="#e63900"
                    animate={{ translateX: isOpen ? -5 : 0 }}
                    transition={{ duration: 0.15 }}
                />
            </svg>
        </button>
    );
};

