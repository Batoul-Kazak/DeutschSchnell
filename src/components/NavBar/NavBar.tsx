import { Search } from '@mui/icons-material';
import deutschSchnellIcon from '../../../public/icons/deutschionary_logo.svg';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSearch } from '../../hooks/useSearch';
import SearchBar from './SearchBar';

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

    useEffect(() => {
        const handleScroll = () => setIsFixed(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header style={{ backgroundColor: 'rgb(123,106,218)' }}>
            <div
                style={isFixed ? { zIndex: 100 } : {}}
                className={`${isFixed ? 'fixed top-0 left-0' : ''} flex justify-between w-full p-5 px-20 text-white bg-my-violet rounded-tl-none rounded-tr-none rounded-3xl place-items-center`}
            >
                <div className="flex gap-5">
                    <motion.h1
                        initial={{ rotate: '0deg' }}
                        animate={{ rotate: '360deg' }}
                        transition={{ duration: 1, ease: 'anticipate' }}
                        className="flex items-center gap-2 font-bold uppercase"
                    >
                        <img src={deutschSchnellIcon} alt="logo" className="w-10 h-10" />

                        <span className="tracking-[-0.05em]">
                            {Array.from("DeutschSchnell").map((char, index) => {
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
                                const color = gradientColors[index % gradientColors.length];

                                return (
                                    <span
                                        key={index}
                                        className="text-2xl"
                                        style={{ color }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </span>
                    </motion.h1>
                    <div className="w-[1px] h-8 bg-slate-400"></div>

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

                <div className="w-[50%]">
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
            </div>
        </header>
    );
}

