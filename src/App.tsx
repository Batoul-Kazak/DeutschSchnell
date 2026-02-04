import { createContext, useRef, useState } from "react";
import Contactus from "./components/ContactUs/Contactus";
import Courses from "./components/Courses/Courses";
import Events from "./components/Events/Events";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import Team from "./components/Team/Team";
import BackToTopButton from "./components/BackToTopButton/BackToTopButton";

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
        // <AppContext.Provider value={ }>
        <div className="relative ">
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
            <BackToTopButton color="my-blue" />
        </div>
        // </AppContext.Provider>
    )
}
