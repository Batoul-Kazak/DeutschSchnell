import React from 'react'

export default function TeamTestimony({ item }) {
    return (
        <div className="w-[40rem]  p-20 flex flex-col gap-10 overflow-hidden flex-shrink-0">
            <p className="font-serif text-xl italic font-extralight">"{item.quote}"</p>
            <div className="flex gap-10">
                <img src={item.avatar} alt="" className="w-20 h-20 rounded-full" />
                <div className="flex flex-col place-content-center place-items-center">
                    <h2 className="text-[#ffbe0bff]">{item.title}</h2>
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                </div>
            </div>
        </div>
    )
}
