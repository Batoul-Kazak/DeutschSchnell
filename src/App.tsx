import { createContext, useRef, useState } from "react";
import Navbar from "./components/NavBar/NavBar";
import HeroSection from "./components/HeroSection/HeroSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import Courses from "./components/Courses/Courses";
import Team from "./components/Team/Team";
import Events from "./components/Events/Events";
import Contactus from "./components/ContactUs/Contactus";
import Footer from "./components/Footer/Footer";
import JumpToTopButton from "./components/JumpToTopButton/JumpToTopButton";

export const AppContext = createContext<{
    level: string;
    setLevel: (level: string) => void;
}>({
    level: "A1",
    setLevel: () => { },
});

const homePageItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'courses', label: 'Courses' },
    { id: 'team', label: 'Team' },
    { id: 'events', label: 'Events' },
    { id: 'contactus', label: 'Register Now!' },
];


export default function App() {

    return (
        <div className="relative dark:bg-dark-violet ">
            <Navbar navItems={homePageItems} isShowSearch={true} />
            <HeroSection />
            <ServicesSection />
            <Courses />
            <Team />
            <div className="flex flex-col gap-20">

                <Events />
                <Contactus />
            </div>
            {/* <Translation word="Hund" language="de" /> */}
            {/* <LessonView /> */}
            <Footer />
            {/* <TabbedComponent /> */}
            <JumpToTopButton />
        </div>
    )
}
