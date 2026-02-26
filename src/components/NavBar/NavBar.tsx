import { useEffect, useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import Logo from './components/Logo';
import NavLinksContainer from './components/NavLinksContainer';
import SideBar from './components/SideBar';
import HamburgerIcon from './components/HamburgerIcon/HamburgerIcon';
import SearchBar from './components/SearchBar';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default function Navbar({ navItems, isShowSearch, children = <div></div> }) {
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
        <header className='flex flex-col bg-light-violet dark:bg-dark-violet'>
            <section >
                {!isHamburgerIconOpen && <div
                    style={isFixed ? { zIndex: 100 } : {}}
                    className={`${isFixed ? 'fixed  z-[1000] top-0 left-0' : ''} flex md:flex-row md:h-[100px] place-content-center place-items-center lg:h-auto flex-row justify-evenly w-full p-5 lg:px-3  text-white bg-light-violet/80 dark:bg-dark-violet/80 rounded-tl-none rounded-tr-none rounded-3xl `}
                >
                    <Logo />

                    <div>{children}</div>
                    <div className="w-[1px] h-8 bg-slate-400 hidden lg:block"></div>
                    {isShowSearch &&
                        <div className='hidden md:flex'>
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
                    }

                    <NavLinksContainer navItems={navItems} setActiveLink={setActiveLink} activeLink={activeLink} />
                    <div className='hidden md:hidden sm:flex'>
                        <ThemeSwitcher />
                    </div>
                    <HamburgerIcon isOpen={isHamburgerIconOpen} setIsOpen={setHamburgerIconOpen} />
                </div>}

                {isHamburgerIconOpen && <div className="absolute inset-0 bg-[#000000a8] z-[90]" onClick={() => setHamburgerIconOpen(false)}></div>}

                <SideBar isHamburgerIconOpen={isHamburgerIconOpen} setHamburgerIconOpen={setHamburgerIconOpen} activeLink={activeLink} setActiveLink={setActiveLink} navItems={navItems} />
            </section >
            <div className='flex md:hidden place-self-center'>
                {isShowSearch &&
                    <SearchBar
                        query={query}
                        onQueryChange={setQuery}
                        onFocus={() => query && setShowResults(true)}
                        showResults={showResults}
                        results={results}
                        onResultSelect={handleSelect}
                        searchRef={searchRef}
                    />
                }
            </div>
        </header>
    );
}


