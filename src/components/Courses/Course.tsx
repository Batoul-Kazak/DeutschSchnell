import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

export default function Course({ lesson, selectedCourse, lessonNumber }) {

    const getCourseImage = (courseLevel: string) => {
        return `/public/images/${courseLevel}.jpg`;
    }

    useEffect(() => {
        console.log("lesson" + lessonNumber, selectedCourse);
    }, [])

    return (
        <Link to={`/courses/${lesson.course}`} key={lesson.id}>
            <div className="p-5 px-0 dark:bg-gray-300/50 bg-gray-300 rounded-3xl place-self-center  md:hover:scale-105 transition-transform duration-500 hover:shadow-[0_4px_12px_rgba(0.8,0.8,0.8,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                <div className="relative">
                    {/* <div className="absolute w-full h-10 bg-indigo-600 z-2 -top-5"></div> */}
                    <img src={getCourseImage(selectedCourse)} alt={`German Course ${selectedCourse}`} className="object-cover place-self-center sm:w-[90%] z-5 rounded-3xl" />
                    <div className="absolute p-4 pl-6 text-sm font-bold text-white rounded-bl-full -right-1 bg-light-violet dark:bg-light-blue dark:border-1 dark:border-dark-blue -top-6 sm:text-xl">{lesson.time}</div>
                    <div className="absolute left-0 px-6 py-2 text-base font-bold text-gray-900 border-2 sm:text-xl rounded-tr-xl rounded-br-xl bg-dark-yellow bottom-7">completed</div>
                </div>
                <div className="flex flex-col flex-wrap gap-2 px-4 py-5 md:px-7">
                    <h1 className="text-xl font-bold sm:text-2xl ">{lesson.lessons}: <span className="text-indigo-600 dark:text-white">{lesson.title}</span></h1>
                    {/* <div className="h-[1px] w-full bg-gray-700"></div> */}
                    <p className="pt-2 text-sm sm:text-base text-pretty">{lesson.description}</p>
                    <div className="flex flex-col gap-2 ">
                        <p className="text-sm font-bold text-gray-800 sm:text-base">Skills you will learn:</p>
                        <p className="flex gap-2">{lesson.skills.map((skill: string) => <span key={skill} className="p-2 text-xs font-bold text-white transition-all rounded-full cursor-pointer hover:bg-white hover:shadow-lg hover:text-indigo-600 bg-dark-red">{skill}</span>)}</p>
                    </div>
                    <h3 className='text-sm sm:text-base '>100% Speak Confidently After 30 Lessons</h3>
                    <div className="flex flex-col gap-2 md:flex-row sm:flex-row">
                        <p className="font-bold text-gray-800">Tags:</p>
                        <p className="flex flex-wrap w-auto gap-2 ">{lesson.tags.map((tags: string) => <span className="p-2 text-xs font-bold text-white transition-all rounded-full cursor-pointer hover:bg-white hover:shadow-lg hover:text-indigo-600 bg-dark-blue" key={tags}>{tags}</span>)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
