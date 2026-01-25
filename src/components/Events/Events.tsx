import img1 from "../../../public/images/event-01.jpg"
import img2 from "../../../public/images/event-02.jpg"
import img3 from "../../../public/images/B1.jpg"
import img4 from "../../../public/images/B2.jpg"
import { KeyboardArrowRight } from "@mui/icons-material"


const events = [
    { id: "1", img: img1, skill: "Speaking for travelling", level: "B1", date: "12 Mars 20220466", duration: "24 Hours", price: 120 },
    { id: "2", img: img2, skill: "Formal Writing | Acadimic", level: "C1", date: "3 April 2046", duration: "60 Hours", price: 240 },
    { id: "3", img: img3, skill: "Medicine in German", level: "C1", date: "16 Feb 2046", duration: "190 Hours", price: 330 },
    { id: "4", img: img4, skill: "German Leterature", level: "C2", date: "12 July 2046", duration: "150 Hours", price: 440 },
]

const Events = () => {
    return <div id="events" className="flex flex-col gap-10 place-content-center place-items-center">
        <h2 className="font-bold text-indigo-600 uppercase">Schedule</h2>
        <h1 className="pb-20 text-4xl font-bold">Upcoming Events</h1>
        <div className="flex flex-col gap-[7rem]">
            {events.map(item =>
                <div key={item.id} className="flex gap-20 bg-gray-200 shadow-lg place-content-center place-items-center rounded-3xl">
                    <div className="relative h-[10rem] w-[13rem] ">
                        <div className="absolute w-[16rem] top-[50%] -left-10 translate-y-[-50%]">
                            {/* <div className="h-[10rem] w-[30rem]"></div> */}
                            <img src={item.img} alt={item.skill} className="rounded-3xl w-[20rem] h-[16rem]  shadow-lg" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="px-5 py-1 mb-3 text-center text-indigo-600 bg-white rounded-full">Level: {item.level}</div>
                        <p className="font-bold text-indigo-600">{item.skill}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-500">Date:</p>
                        <p className="font-bold text-indigo-600">{item.date}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-500">Duration:</p>
                        <p className="font-bold text-indigo-600">{item.duration}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-500">Price:</p>
                        <p className="font-bold text-indigo-600">${item.price}</p>
                    </div>
                    <div className="relative">
                        <div className="absolute -right-5 rounded-tr-2xl rounded-br-2xl top-0 bottom-0 translate-y-[-50%] rounded-tl-full rounded-bl-full w-[4rem] bg- h-[10rem] flex place-content-center place-items-center text-white">
                            <KeyboardArrowRight />
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
}

export default Events;