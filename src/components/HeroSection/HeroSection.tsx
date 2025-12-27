
import heroSectionImage from "../../../public/images/banner-item-01.jpg"
import heroSectionBackground from "../../../public/images/banner-bg.jpg"
import { ArrowCircleLeftRounded, ArrowLeft, ArrowLeftOutlined, ArrowLeftRounded, ArrowLeftSharp, ArrowLeftTwoTone, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

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
        title: "Everything Is Easier",
        headline: "Learn Smarter,* Not Harder* With AI-Powered* Guidance",
        description: "Sholar is free Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro corrupti, deserunt repellendus eveniet autem architecto illo ad quis possimus soluta odio voluptate. Ullam, ad!",
        image: img1
    },
    {
        title: "Build Smarter",
        headline: "Your Success *Starts With* the Right* Teacher",
        description: "Leverage modern tools and workflows to accelerate your development cycle and deliver better results faster.",
        image: img2
    },
    {
        title: "Scale with Confidence",
        headline: "Education That Adapts* to You* Not the Other* Way Around",
        description: "Our platform grows with you — from solo projects to enterprise-grade applications.",
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

                        <div className="w-auto p-3 py-2 uppercase bg-indigo-600 rounded-full ">Our Courses</div>
                        <h1 className="text-5xl font-bold">
                            {currentSlide.headline.split('*').map((part, i) => <span key={i} className="block">{part.trim()}</span>)}
                        </h1>
                        <p className="w-[70%]">
                            {currentSlide.description}</p>
                        <button className="p-5 text-indigo-600 bg-white rounded-full ">Request Demo</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default HeroSection;