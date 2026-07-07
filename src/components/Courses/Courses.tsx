
import { useState } from "react";
import { useCourses } from "../../hooks/useCourses";
import heroSectionBackground from "../../../public/images/banner-bg.jpg"
import curve from "../../../public/images/contact-dec-01.png"
import Course from "./Course";

const imageStyles = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "darken"
}

interface Lesson {
    id: string;
    course: string;
    lessons: string;
    time: string;
    title: string;
    skills: string[];
    tags: string[];
    completed: boolean;
    description: string;
}

const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];

const Courses = () => {
    const { data: courses = [], isLoading, error } = useCourses();
    const [selectedCourse, setSelectedCourse] = useState("A1");

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    const grouped = courses.reduce((acc: Record<string, Lesson[]>, lesson: Lesson) => {
        if (!acc[lesson.course]) acc[lesson.course] = [];
        acc[lesson.course].push(lesson);
        return acc;
    }, {})

    const selectedCourseLessons = grouped[selectedCourse] || [];

    function handleSelectLesson(level: string) {
        setSelectedCourse(level)
    }

    return <section id="courses" className="flex flex-col gap-10 pt-20 pb-[15rem] cursor-pointer  sm:px-10">
        <div className="flex flex-col gap-10 place-content-center place-items-center">
            <h2 className="text-xl font-bold text-center uppercase md:text-3xl text-dark-violet dark:text-white">German Courses by Level</h2>
            <h1 className="text-xl font-bold text-dark-violet md:text-3xl dark:text-light-violet">Lessons</h1>
            <div className="flex gap-0 px-4 py-3 w-[80%]  font-bold bg-gray-300 dark:bg-gray-300/70 rounded-xl sm:rounded-full justify-evenly md:gap-8 lg:px-8 ">
                {levels.map((level) => <button onClick={() => handleSelectLesson(level)} key={level} className={`sm:text-xl px-2 text-base ${selectedCourse === level ? "text-white bg-light-red  py-2 sm:px-5 sm:rounded-full rounded-xl hover:text-white" : ""} transition-colors dark:hover:text-white hover:text-indigo-600`}>{level}</button>)}
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 place-items-center place-content-center md:grid-cols-2 px-15">
                {selectedCourseLessons.length > 0 && selectedCourseLessons.length > 0 && selectedCourseLessons.map((lesson: Lesson) => {
                    const lessonNumber = lesson.lessons.replace("Lesson ", "").trim();
                    return (
                        <Course key={lesson.id} lesson={lesson} selectedCourse={selectedCourse} lessonNumber={lessonNumber} />
                    )
                })}
            </div>
        </div>
        <div className="relative place-self-start justify-between -ml-10 sm:px-[2rem] lg:px-[10rem] py-[7rem] rounded-tr-full rounded-br-full hidden flex-wrap sm:flex md:w-[95%]" style={{ ...imageStyles, backgroundImage: `url(${heroSectionBackground})` }}>
            <div className="absolute top-0 z-20 left-70" style={{ ...imageStyles, backgroundImage: (`url(${curve})`) }}></div>
            <p className="flex flex-col text-white gap-7"><span className="text-5xl font-extrabold text-red-100 [text-shadow:0_2px_4px_rgba(255,255,255,1)]">92%</span>Pass Rate <br /> on Goethe Exams</p>
            <p className="flex flex-col text-white gap-7"><span className="text-5xl font-extrabold text-red-100 [text-shadow:0_2px_4px_rgba(255,255,255,1)]">98%</span>Speak Confidently <br /> After 30 Lessons</p>
            <p className="flex flex-col text-white gap-7"><span className="text-5xl font-extrabold text-red-100 [text-shadow:0_2px_4px_rgba(255,255,255,1)]">75%</span> Non-European Students</p>
            <p className="flex flex-col text-white gap-7"><span className="text-5xl font-extrabold text-red-100 [text-shadow:0_2px_4px_rgba(255,255,255,1)]">4.9</span>Avg Rating from <br /> 500+ Reviews</p>
        </div>
    </section >
}

export default Courses;