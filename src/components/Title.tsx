import React from 'react'
import { twMerge } from 'tailwind-merge';

export default function Title({number="", title="Title", className=""}:{number: string, title: string, className?: string}) {
    return (
        <h2 className={twMerge("sm:text-3xl text-2xl bg-light-green dark:bg-inherit p-4 pt-6 flex flex-row place-items-center place-content-start font-bold text-light-violet place-self-start border-b-4 border-light-red mb-6 w-full", className)}>
            <span className="text-gray-100 dark:text-dark-violet mr-4 bg-light-violet rounded-full p-2" >{number}</span>
            <p>{title}</p>
        </h2>
    )
}
