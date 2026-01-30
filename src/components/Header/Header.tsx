// import { Search } from "@mui/icons-material";
// import deutschSchnellIcon from "../../../public/icons/deutschionary_logo.svg"
// import { useEffect, useRef, useState } from "react";
// import { scroller, Link as ScrollLink } from "react-scroll"
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"

// const navItems = [
//     { id: "home", label: "Home" },
//     { id: "services", label: "Services" },
//     { id: "courses", label: "Courses" },
//     // { id: "tests", label: "Tests" },
//     { id: "team", label: "Team" },
//     { id: "events", label: "Events" },
//     { id: "contactus", label: "Register Now!" }
// ];

// const Header = (z) => {
//     const [query, setQuery] = useState("");
//     const [results, setResults] = useState([]);
//     const [showResults, setShowResults] = useState(false);
//     const [activeLink, setActiveLink] = useState("")
//     const [isFixed, setIsFixed] = useState(false);
//     const navigate = useNavigate();
//     const searchRef = useRef();

//     useEffect(function () {
//         const handleScroll = () => {
//             setIsFixed(window.scrollY > 300);
//         }
//         window.addEventListener("scroll", handleScroll);

//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (searchRef.current && !searchRef.current.contains(e.target)) {
//                 setShowResults(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     useEffect(() => {
//         if (!query.trim()) {
//             setResults([]);
//             setShowResults(false);
//             return;
//         }

//         const q = query.toLowerCase();
//         const matches = searchData
//             .filter(item => {
//                 const title = (item.title || item.name || item.question || "").toLowerCase();
//                 const excerpt = (item.excerpt || item.answer || item.role || "").toLowerCase();
//                 return title.includes(q) || excerpt.includes(q);
//             })
//             .slice(0, 5);

//         setResults(matches);
//         setShowResults(true);
//     }, [query]);

//     const handleResultSelect = (item) => {
//         setQuery("");
//         setShowResults(false);

//         if (item.type === "lesson") {
//             navigate(`/courses/${item.id}`);
//         } else if (item.type === "page" && item.route) {
//             navigate(item.route);
//         } else if (item.type === "event") {
//             scroller.scrollTo("events", {
//                 duration: 800,
//                 smooth: "easeInOutQuart",
//                 offset: -80,
//             });
//         } else if (item.type === "instructor") {
//             scroller.scrollTo("team", {
//                 duration: 800,
//                 smooth: "easeInOutQuart",
//                 offset: -80,
//             });
//         } else if (item.type === "faq") {
//             scroller.scrollTo("faq", {
//                 duration: 800,
//                 smooth: "easeInOutQuart",
//                 offset: -80,
//             });
//         }
//     };

//     return <header style={{ backgroundColor: "rgb(123,106,218)" }}>
//         <div style={isFixed ? { zIndex: 100 } : {}} className={`${isFixed ? "fixed top-0 left-0" : ""} flex justify-between  w-full p-5 px-20 text-white bg-my-violet rounded-tl-none rounded-tr-none rounded-3xl place-items-center`}>
//             <div
//                 className="flex gap-5">
//                 <motion.h1
//                     initial={{ rotate: "0deg" }}
//                     animate={{ rotate: "360deg" }}
//                     transition={{
//                         duration: 1,
//                         ease: "anticipate"
//                     }}
//                     className="flex gap-2 text-2xl font-bold text-white uppercase place-items-center">
//                     <img src={deutschSchnellIcon} alt="logo" className="w-10 h-10" />
//                     DeutschSchnell
//                 </motion.h1>
//                 <div className="w-[1px] h-8 bg-slate-400"></div>
//                 <SearchBar
//                     query={query}
//                     onQueryChange={setQuery}
//                     onFocus={() => query && setShowResults(true)}
//                     showResults={showResults}
//                     results={results}
//                     onResultSelect={handleResultSelect}
//                 />
//             </div>
//             <div className=" w-[50%]">
//                 <ul className="flex justify-between w-full place-content-center place-items-center">
//                     {navItems.map((item) => (
//                         <li key={item.id}>
//                             <ScrollLink
//                                 to={item.id}
//                                 smooth={true}
//                                 duration={1000}
//                                 onClick={() => setActiveLink(item.id)}
//                                 className={`cursor-pointer rounded-full p-3 hover:text-[#ffbe0bff] hover:underline ${activeLink === item.id ? "bg-white/20" : ""}`}
//                             >
//                                 {item.label}
//                             </ScrollLink>
//                         </li>
//                     ))}
//                     <li><RouterLink to="/tests">Tests</RouterLink></li>
//                 </ul>
//             </div>
//         </div>
//     </header>
// }

// export default Header;


// function SearchBar({
//     query,
//     onQueryChange,
//     onFocus,
//     showResults,
//     results,
//     onResultSelect,
// }) {
//     return (
//         <div className="relative">
//             <input
//                 type="search"
//                 value={query}
//                 onChange={(e) => onQueryChange(e.target.value)}
//                 onFocus={onFocus}
//                 placeholder="Type Something"
//                 className="p-2 pl-5 pr-8 bg-transparent rounded-full w-[200px] text-white placeholder:text-white/70"
//             />
//             <Search className="absolute text-white w-5 h-5 right-3 top-2.5" />

//             {showResults && (
//                 <div
//                     style={{
//                         position: "absolute",
//                         top: "100%",
//                         left: 0,
//                         right: 0,
//                         background: "white",
//                         color: "black",
//                         borderRadius: "8px",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                         zIndex: 1000,
//                         maxHeight: "250px",
//                         overflowY: "auto",
//                         marginTop: "8px",
//                     }}
//                 >
//                     {results.length > 0 ? (
//                         results.map((r, i) => {
//                             const item = r.item;
//                             const title = item.title || item.name || item.question || "";
//                             return (
//                                 <div
//                                     key={i}
//                                     onClick={() => onResultSelect(item)}
//                                     onMouseDown={(e) => e.preventDefault()}
//                                     style={{
//                                         padding: "10,16px",
//                                         cursor: "pointer",
//                                         borderBottom: "1px solid #eee",
//                                     }}
//                                 >
//                                     {title}
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <div style={{ padding: "10px 16px", color: "#888" }}>
//                             No results found
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }


import { Search } from '@mui/icons-material';
import deutschSchnellIcon from '../../../public/icons/deutschionary_logo.svg';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSearch } from '../../hooks/useSearch';
import { SearchItem } from '../../types/search';

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'courses', label: 'Courses' },
    { id: 'team', label: 'Team' },
    { id: 'events', label: 'Events' },
    { id: 'contactus', label: 'Register Now!' },
];

export default function Header() {
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
                    <ul className="flex justify-between w-full place-content-center place-items-center">
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

// Pure component — fully typed
interface SearchBarProps {
    query: string;
    onQueryChange: (value: string) => void;
    onFocus: () => void;
    showResults: boolean;
    results: SearchItem[];
    onResultSelect: (item: SearchItem) => void;
    searchRef: React.RefObject<HTMLDivElement>;
}

function SearchBar({
    query,
    onQueryChange,
    onFocus,
    showResults,
    results,
    onResultSelect,
    searchRef,
}: SearchBarProps) {
    return (
        <div className="relative" ref={searchRef}>
            <input
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onFocus={onFocus}
                placeholder="Type Something"
                className="p-2 pl-5 pr-8 bg-transparent rounded-full w-[200px] text-white placeholder:text-white/70"
            />
            <Search className="absolute text-white w-5 h-5 right-3 top-2.5" />

            {showResults && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        color: 'black',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 1000,
                        maxHeight: '250px',
                        overflowY: 'auto',
                        marginTop: '8px',
                    }}
                >
                    {results.length > 0 ? (
                        results.map((item, i) => {
                            const title =
                                item.type === 'instructor'
                                    ? item.name
                                    : item.type === 'faq'
                                        ? item.question
                                        : item.title;
                            return (
                                <div
                                    key={i}
                                    onClick={() => onResultSelect(item)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    style={{
                                        padding: '10px 16px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #eee',
                                    }}
                                >
                                    {title}
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ padding: '10px 16px', color: '#888' }}>No results found</div>
                    )}
                </div>
            )}
        </div>
    );
}