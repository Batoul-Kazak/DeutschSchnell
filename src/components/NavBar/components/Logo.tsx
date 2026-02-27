import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import deutschSchnellIcon from "../../../../public/icons/deutschionary_logo.svg";
import { useTheme } from '../../../context/ThemeProvider';


const gradientDarkColors = [
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

const gradientLightColors = [
    '#999',
    '#AAA',
    '#BBB',
    '#CCC',
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


export default function Logo() {
    const { theme } = useTheme();

    return (
        <div className="flex gap-4 hover:cursor-pointer" >
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
                            const color = theme === "dark" ? gradientLightColors[index % gradientLightColors.length] : gradientDarkColors[index % gradientDarkColors.length];;

                            return (
                                <span
                                    key={index}
                                    className="text-xl lg:text-2xl"
                                    style={{ color }}
                                >
                                    {index == 7 && <div className='block lg:hidden'></div>}
                                    {char}
                                </span>
                            );
                        })}
                    </span>
                </motion.h1>
            </Link>
        </div>

    )
}
