
import heroSectionBackground from "../../assets/images/banner-bg.jpg"
import heroSectionDarkBackground from "../../assets/images/banner-bg-dark.png"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

import img1 from "../../assets/images/banner-item-01.jpg"
import img2 from "../../assets/images/banner-item-02.jpg"
import img3 from "../../assets/images/banner-item-03.jpg"
import { useState } from "react"
import { useTheme } from "../../context/ThemeProvider"

const imageStyles = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "darken"
}

const slides = [
    {
        title: "Alles Wird Einfacher",
        headline: "Lernen Sie Intelligenter,* Nicht Härter* Mit KI-Unterstützung*",
        description: "Sholar ist kostenlos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro corrupti, deserunt repellendus eveniet autem architecto illo ad quis possimus soluta odio voluptate. Ullam, ad!",
        image: img1
    },
    {
        title: "Lernen Sie Effektiver",
        headline: "Ihr Erfolg *Beginnt Mit* Dem Richtigen* Lehrer",
        description: "Nutzen Sie moderne Methoden und interaktive Übungen, um schneller Deutsch zu sprechen, zu schreiben und zu verstehen mit sofortigem Feedback und personalisiertem Lernpfad.",
        image: img2
    },
    {
        title: "Wachsen Sie Mit Sicherheit",
        headline: "Deutschunterricht, Der Sich* An Sie* Anpasst Nicht Umgekehrt*",
        description: "Unsere Plattform begleitet Sie vom A1-Niveau bis hin zu fließendem B2/C1 mit kultursensiblen Inhalten, echten Dialogen und praxisnahen Szenarien.",
        image: img3
    }
];

function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { theme } = useTheme();

    function goToPrevious() {
        setCurrentIndex((prev) => prev === 0 ? slides.length - 1 : prev - 1)
    }

    function goToNext() {
        setCurrentIndex((prev) => prev === slides.length - 1 ? 0 : prev + 1);
    }

    // const currentSlide = slides[currentIndex];

    return <div id="home" className="relative flex items-center justify-center min-h-screen w-full p-4 sm:p-8 lg:p-[5rem]" style={{ ...imageStyles, backgroundImage: `url(${theme === "light" ? heroSectionBackground : heroSectionDarkBackground})` }}>
        <div className="absolute z-20 flex flex-col gap-4 -translate-y-1/2 right-4 top-1/2">
            <button onClick={goToPrevious} className="p-4 transition rounded-full bg-white/30 hover:bg-white/50">
                <KeyboardArrowLeft />
            </button>
            <button onClick={goToNext} className="p-4 transition rounded-full bg-white/30 hover:bg-white/50">
                <KeyboardArrowRight />
            </button>
        </div>
        <div className="relative w-full max-w-7xl h-[60vh] md:h-[700px] overflow-hidden rounded-3xl shadow-2xl">
            <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map(currentSlide => (
                    <div className="relative flex flex-col justify-between w-full h-full p-6 shrink-0 sm:p-10 md:p-20" style={{ ...imageStyles, backgroundImage: `url(${currentSlide.image})` }}>
                        <div className="relative py-10">
                            <span className="absolute p-3 py-2 text-white uppercase rounded-full top-5 left-5 bg-light-violet">Our Courses</span>
                        </div>
                        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            {currentSlide.headline.split('*').map((part, i) => <span key={i} className="block">{part.trim()}</span>)}
                        </h1>
                        <p className="max-w-2xl text-sm text-gray-200 sm:text-base md:text-lg">
                            {currentSlide.description}</p>
                        <button className="p-5 px-10 font-bold text-indigo-600 transition duration-300 bg-white rounded-full place-self-start hover:scale-105">Apply</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default HeroSection;