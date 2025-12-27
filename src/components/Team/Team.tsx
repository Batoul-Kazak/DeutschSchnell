import { Facebook, KeyboardArrowLeft, KeyboardArrowRight, LinkedIn, Twitter } from "@mui/icons-material"
import memberImg_1 from "../../../public/images/member-01.jpg"
import memberImg_2 from "../../../public/images/member-02.jpg"
import memberImg_3 from "../../../public/images/member-03.jpg"
import memberImg_4 from "../../../public/images/member-04.jpg"
import { useState } from "react"

const imageStyles = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "darken"
}

const teamMembers = [
    {

        id: "1",
        name: "Lukas Becker",
        role: "Exam Preparation Specialist",
        image: memberImg_1
    },
    {
        id: "2",
        name: "Sphina Rose",
        role: "Academic German Expert",
        image: memberImg_2
    },
    {
        id: "3",
        name: "Mouhammed Katze",
        role: "Conversation & Fluency Coach",
        image: memberImg_3
    },
    {
        id: "4",
        name: "Felix Wagner",
        role: "Business German Instructor",
        image: memberImg_4
    }
];

const icons = [
    { icon: <Twitter />, label: "Twitter" },
    { icon: <Facebook />, label: "Facebook" },
    { icon: <LinkedIn />, label: "LinkedIn" }
];

const testimonials = [
    {
        id: 1,
        quote: "I went from zero to conversational German in just 3 months. The real-life scenarios made all the difference!",
        name: "Claude David",
        title: "Full Stack Master",
        avatar: memberImg_1
    },
    {
        id: 2,
        quote: "The instant feedback on grammar saved me from repeating mistakes. I finally feel confident speaking.",
        name: "Lena Müller",
        title: "Marketing Manager",
        avatar: memberImg_2
    },
    {
        id: 3,
        quote: "As a busy professional, I loved how lessons adapted to my schedule. No more boring one-size-fits-all courses.",
        name: "Rafael Silva",
        title: "Software Engineer",
        avatar: memberImg_3
    },
    {
        id: 4,
        quote: "The mock exams felt exactly like the real Goethe test. I passed on my first try — thanks to DeutschSchnell!",
        name: "Anya Petrova",
        title: "University Student",
        avatar: memberImg_4
    },
    {
        id: 5,
        quote: "Learning German through stories and dialogues made it fun, not frustrating. I actually look forward to my daily lesson.",
        name: "Tomás Ruiz",
        title: "Freelance Designer",
        avatar: memberImg_1
    },
    {
        id: 6,
        quote: "The platform works perfectly on my phone during commutes. I’ve learned more in 2 weeks than in 6 months of classes.",
        name: "Sophie Chen",
        title: "Project Coordinator",
        avatar: memberImg_3
    }
];

const Team = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    function handleNext() {
        const nextIndex = currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1;
        setCurrentTestimonial(nextIndex);
    }

    function handlePrevious() {
        const prevIndex = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
        setCurrentTestimonial(prevIndex);
    }

    return <div id="team" className="flex flex-col gap-10 place-content-center place-items-center">
        <div className="flex gap-10 place-content-center place-items-center">

            {teamMembers.map((member, i) => (
                <div key={member.id} className="relative pt-[7rem] p-5 bg-gray-100 shadow-md h-[20rem] w-[15rem] rounded-3xl place-content-center place-items-center flex gap-5 flex-col">
                    <img src={member.image} alt={member.name} className="w-[12rem] hover:-translate-y-5 transition duration-300 hover:cursor-pointer h-[12rem] rounded-full absolute -top-[7rem] left-[50%] translate-x-[-50%]" />
                    <h2 className="text-center text-indigo-600 ">{member.role}</h2>
                    <h1 className="text-xl text-[#222] font-bold">{member.name}</h1>
                    <div className="flex gap-2">
                        {icons.map((icon, idx) => (
                            <div key={idx} className="p-2 text-indigo-600 transition duration-300 bg-white rounded-full cursor-pointer hover:bg-indigo-600 hover:text-white" aria-label={`${member.name} on ${icon.label}`}>{icon.icon}</div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div className="relative w-full h-[50rem]">
            <div className="bg-gray-200 absolute z-4 top-0 right-0 rounded-tl-full rounded-bl-full w-[50rem] h-[40rem]">
                <div className="absolute top-[30%] left-[50%] flex gap-10 flex-col w-[20rem]">
                    <h2 className="font-bold text-indigo-600">Testimony</h2>
                    <h1 className="text-3xl text-gray-900">What they say about us?</h1>
                    <p className="text-gray-600">You can search free CSS templates on Google using different keywords such as templatemo portfolio, templatemo gallery, templatemo blue color, etc.</p>
                </div>
            </div>
            <div className="absolute left-[10%] top-[38%] translate-y-[-50%] z-10 bg-indigo-600 overflow-hidden  w-[40rem] h-[20rem] rounded-3xl">
                <div className="flex text-white transition-transform duration-700 ease-in-out bg-indigo-600 rounded-3xl" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                    {testimonials.map(item => (
                        <div className="w-[40rem]  p-20 flex flex-col gap-10 overflow-hidden flex-shrink-0">
                            <p className="font-serif text-xl italic font-extralight">"{item.quote}"</p>
                            <div className="flex gap-10">
                                <img src={item.avatar} alt="" className="w-20 h-20 rounded-full" />
                                <div className="flex flex-col place-content-center place-items-center">
                                    <h2 className="text-[#ffbe0bff]">{item.title}</h2>
                                    <h1 className="text-2xl font-bold">{item.name}</h1>
                                </div>
                            </div>
                        </div>))}
                </div>
                <div className="absolute z-30 top-[50%] translate-y-[-50%] -right-5 flex flex-col gap-3">
                    <button onClick={handlePrevious} className="p-3 text-indigo-600 bg-white rounded-full">
                        <KeyboardArrowLeft />
                    </button>
                    <button onClick={handleNext} className="p-3 text-indigo-600 bg-white rounded-full">
                        <KeyboardArrowRight />
                    </button>
                </div>
            </div>
        </div>
    </div >
}

export default Team;
