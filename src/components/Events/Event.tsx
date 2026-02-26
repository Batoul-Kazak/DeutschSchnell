import { KeyboardArrowRight } from '@mui/icons-material'
import { EventProp } from '../../types/Event'

interface EventProps {
    item: EventProp
}

export default function Event({ item }: EventProps) {
    return (
        <div>
            <div key={item.id} className="hidden gap-20 shadow-lg bg-gray-300/80 md:flex place-content-center place-items-center rounded-3xl">
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
                    <p className="font-bold text-dark-red">{item.date}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-gray-500">Duration:</p>
                    <p className="font-bold text-my-orange">{item.duration}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-gray-500">Price:</p>
                    <p className="font-bold text-dark-blue">${item.price}</p>
                </div>
                <div className="relative">
                    <div className="absolute -right-5 rounded-tr-2xl rounded-br-2xl top-0 bottom-0 translate-y-[-50%] rounded-tl-full rounded-bl-full w-[4rem] bg- h-[10rem] flex place-content-center place-items-center text-white">
                        <KeyboardArrowRight />
                    </div>
                </div>
            </div>
            <div className='relative flex flex-col gap-2 px-10 bg-light-violet rounded-2xl md:hidden'>
                <div className='h-[18rem]'></div>
                <img src={item.img} alt={item.skill} className="rounded-3xl place-self-center rounded-tr-[10rem] rounded-tl-[10rem] absolute -translate-y-20 w-[80%] h-[20rem]  shadow-lg" />
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                    <div className="flex flex-col gap-1 col-span-full">
                        <div className="px-5 py-1 mb-3 text-center text-indigo-600 bg-white rounded-full">Level: {item.level}</div>
                        <p className="font-bold text-white">{item.skill}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-white md:text-gray-500">Date:</p>
                        <p className="font-bold text-dark-red">{item.date}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-white md:text-gray-500">Duration:</p>
                        <p className="font-bold text-my-orange">{item.duration}</p>
                    </div>
                    <div className="flex flex-col gap-1 col-span-full">
                        <p className="text-white md:text-gray-500">Price:</p>
                        <p className="font-bold text-dark-blue">${item.price}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
