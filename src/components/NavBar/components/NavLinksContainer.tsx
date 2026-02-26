import React from 'react'
import { Link as ScrollLink } from 'react-scroll';
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher';
import { Link as RouterLink } from 'react-router-dom';

export default function NavLinksContainer({ navItems, setActiveLink, activeLink }) {
    return (
        <nav className="lg:max-w-[60%] max-w-[300px] hidden md:block place-self-start nav-links ">
            <ul className="flex flex-wrap justify-between w-full gap-4 pt-3 place-content-center place-items-center ">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <ScrollLink
                            to={item.id}
                            smooth={true}
                            duration={1000}
                            onClick={() => setActiveLink(item.id)}
                            className={`cursor-pointer rounded-full hover:text-[#ffbe0bff] hover:underline ${activeLink === item.id ? 'bg-white/20 p-3' : ''
                                }`}
                        >
                            {item.label}
                        </ScrollLink>
                    </li>
                ))}
                <li>
                    <RouterLink to="/tests">Tests</RouterLink>
                </li>
                <ThemeSwitcher />
            </ul>
        </nav>
    )
}
