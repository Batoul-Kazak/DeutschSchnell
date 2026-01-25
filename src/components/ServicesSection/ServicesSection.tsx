import { useState } from "react";
import img1 from "../../../public/images/service-01.png"
import img2 from "../../../public/images/service-02.png"
import img3 from "../../../public/images/service-03.png"
import { Add, Minimize } from "@mui/icons-material";

const benefits = [
    {
        id: "learning-paths",
        image: img1,
        title: "Personalized Learning Paths",
        description: "Lessons and quizzes automatically adjust to your current level, personal goals, and learning progress, helping you learn faster and stay motivated every step of the way."
    },
    {
        id: "instant-feedback",
        image: img2,
        title: "Instant Feedback with Clear Explanations",
        description: "Receive real-time corrections on grammar, pronunciation, and sentence structure, along with helpful explanations that turn mistakes into learning opportunities."
    },
    {
        id: "real-practice",
        image: img3,
        title: "Confidence Through Real-Life Practice",
        description: "Build fluency by practicing everyday situations like ordering food, attending job interviews, or writing emails, plus official-style mock exams to feel fully prepared."
    }
];

const germanFaqs = [
    {
        id: "1",
        question: "Do I need prior knowledge of German to start?",
        answer: "No, our platform welcomes complete beginners. Courses start from A1 level and guide you step by step with clear explanations in English."
    },
    {
        id: "2",
        question: "How are lessons structured?",
        answer: "Each lesson combines interactive exercises, real-life dialogues, grammar tips, and instant feedback. You’ll practice reading, writing, listening, and speaking in context."
    },
    {
        id: "3",
        question: "Can I track my progress?",
        answer: "Yes, you’ll see your progress in real time with skill meters, completed lessons, and personalized reviews. You’ll always know what to learn next."
    },
    {
        id: "4",
        question: "Are the tests officially recognized?",
        answer: "Our practice tests mirror official exams like Goethe and TestDaF. While they don’t grant certification, they fully prepare you to pass the real thing."
    },
    {
        id: "5",
        question: "Can I access the platform on mobile?",
        answer: "Yes, DeutschSchnell works seamlessly on phones, tablets, and desktops — so you can learn anytime, anywhere."
    }
];

const ServicesSection = () => {
    const [expanded, setExpanded] = useState("");
    const [openedIndex, setOpenedIndex] = useState(null);

    const toggleExpand = (id) => {
        setExpanded(id);
        console.log('expanded', expanded);
    };

    const toggelPanel = (index) => {
        setOpenedIndex(openedIndex => openedIndex === index ? null : index)
    }

    return <section id="services" className="flex flex-col place-content-center place-items-center">
        <div className="grid grid-cols-1 px-20 py-20 gap-[7rem] md:grid-cols-3 min-h-[30rem]">
            {benefits.map((section, i) => (
                <div
                    key={section.id}
                    className="relative flex flex-col p-8 pt-[7rem] bg-black/15 rounded-3xl"
                >
                    <div className="absolute bg-violet rounded-full p-[3rem] top-[-4rem] right-[-4rem]">
                        <img src={section.image} alt={`service-${i}`} className="w-20 h-20" />
                    </div>

                    <div className="flex flex-col justify-between h-full">
                        <h3 className="text-xl font-bold ">{section.title}</h3>
                        <p className={`py-5 ${expanded == section.id ? "line-clamp-none" : "line-clamp-3"}`}>{section.description}</p>
                        <button onClick={() => toggleExpand(section.id)} className="font-bold px-5 w-[10rem] mt-5 py-3 text-violet transition bg-white rounded-full hover:bg-indigo-600 hover:text-white">
                            {expanded == section.id ? "Show Less" : "Show More"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <div className="flex place-content-center place-items-center place-self-center w-[80%]">
            <div className="flex flex-col gap-8 px-10 bg-violet py-[5rem] rounded-[3rem] w-[50%]">
                {germanFaqs.map((item, i) => (
                    <div key={item.id} className="flex flex-col gap-5 font-bold bg-white rounded-3xl place-content-center place-items-center px-7">
                        <div className="flex justify-between w-full gap-5 mt-5 align-middle place-items-center">
                            <p className={`${openedIndex === i ? "text-indigo-600" : "text-gray-950"}`}>{item.question}</p>
                            <button onClick={() => toggelPanel(i)} className="flex p-1 text-white rounded-full cursor-pointer bg-violet place-content-center place-items-center">
                                {openedIndex === i ? <Minimize /> :
                                    <Add />}
                            </button>
                        </div>
                        <div className={`max-w-[20rem] overflow-hidden place-content-start place-items-start transition-all  duration-300 ease-in-out ${openedIndex === i ? " opacity-100 pb-7" : "min-h-0 opacity-0"}`}>
                            {openedIndex === i ? item.answer : ""}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-10 p-10 pl-20 bg-gray-200 place-content-center w-[50%]">
                <h3 className="text-2xl font-bold text-indigo-600">About us</h3>
                <h1 className="text-4xl font-bold">What make us the best academy online?</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravid risus commodo.</p>
                <button className="w-[10rem] px-4 py-3 font-bold text-violet bg-white rounded-full transition-all hover:bg-indigo-600 hover:text-white">Discover More</button>
            </div>
        </div>
    </section>
}

export default ServicesSection;