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
        description: "Your journey adapts in real time lessons and quizzes evolve based on your progress, strengths, and areas to improve, ensuring you’re always learning at the right pace."
    },
    {
        id: "instant-feedback",
        image: img2,
        title: "Instant Feedback with Clear Explanations",
        description: "Get immediate, actionable corrections on grammar, pronunciation, and word choice complete with simple, easy-to-understand explanations that help you learn from every mistake."
    },
    {
        id: "real-practice",
        image: img3,
        title: "Confidence Through Real-Life Practice",
        description: "Gain real-world fluency by practicing authentic scenarios like ordering coffee, asking for directions, or making small talk so you can speak confidently beyond the classroom."
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
        answer: "Yes, DeutschSchnell works seamlessly on phones, tablets, and desktops   so you can learn anytime, anywhere."
    }
];
const ServicesSection = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="services" className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 px-4 md:px-10 py-20 min-h-[30rem]">
                {benefits.map((section) => (
                    <div className="bg-gradient-to-t from-my-violet/40 to-white/40 rounded-3xl">
                        <div className="pb-4 bg-gradient-to-t from-my-violet/50 to-white/50 rounded-3xl">
                            <div
                                key={section.id}
                                className="relative p-4 rounded-3xl bg-gradient-to-t from-my-violet/50 to-gray-100/50 md:p-8"
                            >
                                <div className="absolute p-4 rounded-full bg-my-violet -top-6 -right-6 lg:p-8 lg:-top-12 lg:-right-12">
                                    <img src={section.image} alt={`service-${section.id}`} className="w-20 h-20" />
                                </div>

                                <div className="flex flex-col h-full pt-12">
                                    <h3 className="text-xl font-bold text-indigo-800">{section.title}</h3>

                                    <div className="mt-4 text-gray-800">
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedId === section.id
                                                ? 'max-h-[300px]'
                                                : 'max-h-16'
                                                }`}
                                        >
                                            {section.description}
                                        </div>

                                        {(section.description.split(' ').length > 25 || expandedId !== section.id) && (
                                            <button
                                                onClick={() => toggleExpand(section.id)}
                                                className="block mt-2 font-medium text-white  md:block sm:hidden hover:underline"
                                            >
                                                {expandedId === section.id ? 'Show Less' : 'Read More'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default ServicesSection;