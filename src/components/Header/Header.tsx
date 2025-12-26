import { Search } from "@mui/icons-material";
import deutschSchnellIcon from "../../../public/icons/deutschionary_logo.svg"
import { useEffect, useState } from "react";
import { Link } from "react-scroll"

const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "courses", label: "Courses" },
    { id: "tests", label: "Tests" },
    { id: "team", label: "Team" },
    { id: "events", label: "Events" },
    { id: "register_now", label: "Register Now!" }
];

const Header = () => {
    const [activeLink, setActiveLink] = useState("")
    const [isFixed, setIsFixed] = useState(false);
    useEffect(function () {

        const handleScroll = () => {
            setIsFixed(window.scrollY > 300);
        }
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isFixed])

    return <header style={{ backgroundColor: "rgb(123,106,218)" }}>
        <div style={isFixed ? { zIndex: 100 } : {}} className={`${isFixed ? "fixed top-0 left-0" : ""} flex justify-between w-full p-5 px-20 text-white bg-indigo-600 rounded-tl-none rounded-tr-none rounded-3xl place-items-center`}>

            <div className="flex gap-5">
                <h1 className="flex gap-2 text-2xl font-bold text-white uppercase place-items-center">
                    <img src={deutschSchnellIcon} alt="logo" className="w-10 h-10" />
                    DeutschSchnell
                </h1>
                <div className="w-[1px] h-8 bg-slate-400"></div>
                <div className="relative">
                    <input type="search" className="p-2 pl-5 bg-transparent rounded-full w-200" placeholder="Type Something" />
                    <Search className="absolute text-white w-15 h-15 right-3 top-2" />
                </div>
            </div>
            <div className=" w-[50%]">
                <ul className="flex justify-between w-full place-content-center place-items-center">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={item.id}
                                smooth={true}
                                duration={1000}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveLink(item.id);
                                }}
                                className={`cursor-pointer rounded-full p-3 hover:text-[#ffbe0bff] hover:underline ${activeLink === item.id ? "bg-white/20" : ""}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </header>
}

export default Header;