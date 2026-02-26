import React from 'react'
import { Link as ScrollLink } from 'react-scroll';
import HamburgerIcon from './HamburgerIcon/HamburgerIcon';

type navItem = {
    id: string;
    label: string;
}

interface SideBarProps {
    isHamburgerIconOpen: boolean;
    setHamburgerIconOpen: (isOpen: boolean) => void;
    activeLink: string;
    setActiveLink: (id: string) => void;
    navItems: navItem[];
};

export default function SideBar({ isHamburgerIconOpen, setHamburgerIconOpen, activeLink, setActiveLink, navItems }: SideBarProps) {
    return (
        <nav className={`md:hidden w-[70%] sm:w-[30%] z-[200] bg-light-violet/90 h-full text-white fixed top-0 pt-20 transition-all duration-[750ms] right-0 ${isHamburgerIconOpen ? "translate-x-0" : "translate-x-[100%]"} `}>
            <HamburgerIcon isOpen={isHamburgerIconOpen} setIsOpen={setHamburgerIconOpen} className='absolute w-6 h-6 top-10 left-10' />
            <ul className='flex flex-col w-full '>
                {navItems.map(item => (
                    <li key={item.id} className={`w-full  cursor-pointer
                            `}>
                        <ScrollLink
                            to={item.id}
                            smooth={true}
                            duration={1000}
                            onClick={() => setActiveLink(item.id)}
                            className={` p-3 block w-full text-left hover:bg-dark-red/70 ${activeLink === item.id ? 'bg-dark-green font-bold' : ''}`}
                        >
                            {item.label}
                        </ScrollLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
