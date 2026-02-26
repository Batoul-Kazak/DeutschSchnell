import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { useState } from "react"
import TeamMember from "./TeamMember"
import TeamTestimony from "./TeamTestimony"
import { TESTIMONIALS } from "./../../constants/TESTIMONIALS"
import { TEAM_MEMBERS } from "../../constants/TEAM_MEMBERS"

const Team = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    function handleNext() {
        const nextIndex = currentTestimonial === TESTIMONIALS.length - 1 ? 0 : currentTestimonial + 1;
        setCurrentTestimonial(nextIndex);
    }

    function handlePrevious() {
        const prevIndex = currentTestimonial === 0 ? TESTIMONIALS.length - 1 : currentTestimonial - 1;
        setCurrentTestimonial(prevIndex);
    }

    return <div id="team" className="flex flex-col gap-10 place-content-center place-items-center">
        <div className="grid  lg:gap-10 md:w-auto w-[90%] gap-[40px] lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 place-content-center place-items-center">
            {TEAM_MEMBERS.map((member) => (
                <TeamMember member={member} />
            ))}
        </div>
        <div className="relative w-full h-[50rem]">
            <div className="bg-gray-200 absolute z-4 top-0 right-0 rounded-tl-full rounded-bl-full w-[50rem] h-[40rem]">
                <div className="absolute top-[30%] left-[50%] flex gap-10 flex-col w-[20rem]">
                    <h2 className="font-bold text-indigo-600">Testimony</h2>
                    <h1 className="text-3xl text-gray-900">What they say about us?</h1>
                    <p className="text-gray-600">You can search free CSS templates on Google using different keywords such as templatemo portfolio, templatemo gallery, templatemo dark-blue color, etc.</p>
                </div>
            </div>
            <div className="absolute left-[10%] top-[38%] translate-y-[-50%] z-10 bg-light-violet overflow-hidden  w-[40rem] h-[20rem] rounded-3xl">
                <div className="flex text-white transition-transform duration-700 ease-in-out bg-light-violet rounded-3xl" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                    {TESTIMONIALS.map(item => (
                        <TeamTestimony item={item} />
                    ))}
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
