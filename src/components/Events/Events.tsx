import img1 from "../../assets/images/event-01.jpg"
import img2 from "../../assets/images/event-02.jpg"
import img3 from "../../assets/images/B1.jpg"
import img4 from "../../assets/images/B2.jpg"
import Event from "./Event"
import { EventProp } from "../../types/Event"


const events = [
    { id: "1", img: img1, skill: "Speaking for travelling", level: "B1", date: "12 Mars 20220466", duration: "24 Hours", price: 120 },
    { id: "2", img: img2, skill: "Formal Writing | Acadimic", level: "C1", date: "3 April 2046", duration: "60 Hours", price: 240 },
    { id: "3", img: img3, skill: "Medicine in German", level: "C1", date: "16 Feb 2046", duration: "190 Hours", price: 330 },
    { id: "4", img: img4, skill: "German Leterature", level: "C2", date: "12 July 2046", duration: "150 Hours", price: 440 },
]

const Events = () => {
    return <div id="events" className="flex flex-col gap-10 dark:text-white place-content-center place-items-center">
        <h2 className="text-2xl font-bold uppercase text-light-violet">Schedule</h2>
        <h1 className="pb-20 text-4xl font-bold text-center">Upcoming Events</h1>
        <div className="flex flex-col gap-[7rem]">
            {events.map((item: EventProp) =>
                <Event key={item.id} item={item} />
            )}
        </div>
    </div>
}

export default Events;