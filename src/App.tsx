import { createContext, useRef, useState } from "react";
import Contactus from "./components/ContactUs/Contactus";
import Courses from "./components/Courses/Courses";
import Events from "./components/Events/Events";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import Team from "./components/Team/Team";

export const AppContext = createContext<{
    level: string;
    setLevel: (level: string) => void;
}>({
    level: "A1",
    setLevel: () => { },
});

export default function App() {


    return (
        // <AppContext.Provider value={ }>
        <div className="relative">
            <Header />
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
        </div>
        // </AppContext.Provider>
    )
}
