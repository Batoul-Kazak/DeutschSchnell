
import heroSectionBackground from "../../../public/images/banner-bg.jpg"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

import img1 from "../../../public/images/banner-item-01.jpg"
import img2 from "../../../public/images/banner-item-02.jpg"
import img3 from "../../../public/images/banner-item-03.jpg"
import { useState } from "react"

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

    function goToPrevious() {
        setCurrentIndex((prev) => prev === 0 ? slides.length - 1 : prev - 1)
    }

    function goToNext() {
        setCurrentIndex((prev) => prev === slides.length - 1 ? 0 : prev + 1);
    }

    const currentSlide = slides[currentIndex];

    return <div id="home" className="text-white flex place-content-center place-items-center p-[5rem]" style={{ ...imageStyles, backgroundImage: `url(${heroSectionBackground})` }}>
        <div className="flex flex-col gap-3 p-10 place-self-end">
            <button onClick={goToPrevious} className="p-4 transition rounded-full bg-white/30 hover:bg-white/50">
                <KeyboardArrowLeft />
            </button>
            <button onClick={goToNext} className="p-4 transition rounded-full bg-white/30 hover:bg-white/50">
                <KeyboardArrowRight />
            </button>
        </div>
        <div className="overflow-hidden w-[60rem] h-[50rem] relative">
            <div className="flex h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div className="flex flex-col items-start justify-between gap-10 p-20 overflow-hidden shrink-0 w-[60rem] rounded-3xl" style={{ ...imageStyles, backgroundImage: `url(${currentSlide.image})` }}>

                        <div className="w-auto p-3 py-2 uppercase rounded-full bg-indig0 ">Our Courses</div>
                        <h1 className="text-5xl font-bold">
                            {currentSlide.headline.split('*').map((part, i) => <span key={i} className="block">{part.trim()}</span>)}
                        </h1>
                        <p className="w-[70%]">
                            {currentSlide.description}</p>
                        <button className="p-5 font-bold text-indigo-600 transition duration-300 bg-white rounded-full hover:scale-105">Apply</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default HeroSection;