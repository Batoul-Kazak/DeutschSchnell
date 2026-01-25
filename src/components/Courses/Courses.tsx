
import { useState } from "react";
import { useCourses } from "../../hooks/useCourses";
import { getCourseImage } from "../../utils/courseImage";
import heroSectionBackground from "../../../public/images/banner-bg.jpg"
import curve from "../../../public/images/contact-dec-01.png"
import { Link } from "react-router-dom";

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

    return <section id="courses" className="flex flex-col gap-10 pt-20 pb-[15rem] cursor-pointer">
        <div className="flex flex-col gap-10 place-content-center place-items-center">
            <h2 className="font-bold text-indigo-600 uppercase ">German Courses by Level</h2>
            <h1 className="text-4xl font-bold text-gray-900">Lessons</h1>
            <div className="flex gap-10 px-10 py-3 font-bold bg-gray-300 rounded-full justify-between w-[40%]">
                {levels.map((level) => <button onClick={() => handleSelectLesson(level)} key={level} className={`text-xl ${selectedCourse === level ? "text-white bg-indigo-400 p-2 px-5 rounded-full hover:text-white" : ""} transition-colors hover:text-indigo-600`}>{level}</button>)}
            </div>
            <div className="grid grid-cols-3 gap-10 px-15">
                {selectedCourseLessons.length > 0 && selectedCourseLessons.length > 0 && selectedCourseLessons.map((lesson: Lesson) => {
                    const lessonNumber = lesson.lessons.replace("Lesson ", "").trim();

                    return (
                        <Link to={`/courses/${lesson.course}/${lessonNumber}`} key={lesson.id}>
                            <div className="p-5 px-0 bg-gray-300 rounded-3xl w-[20rem] hover:scale-105 transition-transform duration-500 hover:shadow-[0_4px_12px_rgba(0.8,0.8,0.8,0.6)] shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                                <div className="relative">
                                    {/* <div className="absolute w-full h-10 bg-indigo-600 z-2 -top-5"></div> */}
                                    <img src={getCourseImage(selectedCourse)} alt={`German Course ${selectedCourse}`} className="object-cover z-5 rounded-3xl " />
                                    <div className="absolute right-0 p-4 pl-6 font-bold text-white rounded-bl-full bg-violet -top-5">{lesson.time}</div>
                                    <div className="absolute left-0 px-6 py-2 font-bold text-white rounded-tr-xl rounded-br-xl bg-red bottom-7">completed</div>
                                </div>
                                <div className="flex flex-col flex-wrap gap-2 py-5 px-7">
                                    <h1 className="text-xl font-bold">{lesson.lessons}: <span className="text-indigo-600">{lesson.title}</span></h1>
                                    {/* <div className="h-[1px] w-full bg-gray-700"></div> */}
                                    <p className="pt-2 text-sm text-pretty">{lesson.description}</p>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-bold text-gray-800">Skills you will learn:</p>
                                        <p className="flex gap-2">{lesson.skills.map((skill: string) => <span key={skill} className="p-3 py-2 text-xs font-bold text-white transition-all rounded-full cursor-pointer hover:scale-105 hover:bg-white hover:shadow-lg hover:text-indigo-600 bg-red">{skill}</span>)}</p>
                                    </div>100% Speak Confidently After 30 Lessons
                                    <div className="flex flex-col gap-2">
                                        <p className="font-bold text-gray-800">Tags:</p>
                                        <p className="flex gap-2">{lesson.tags.map((tags: string) => <span className="p-3 py-2 text-xs font-bold text-white transition-all rounded-full cursor-pointer hover:scale-105 hover:bg-white hover:shadow-lg hover:text-indigo-600 bg-blue" key={tags}>{tags}</span>)}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
        <div className="relative flex justify-between px-[10rem] py-[7rem] rounded-tr-full rounded-br-full w-[95%]" style={{ ...imageStyles, backgroundImage: `url(${heroSectionBackground})` }}>
            <div className="absolute top-0 z-20 left-70" style={{ ...imageStyles, backgroundImage: (`url(${curve})`) }}></div>
            <p className="flex flex-col text-white gap-7"><span className="text-5xl font-extrabold">92%</span>Pass Rate <br /> on Goethe Exams</p>
            <p className="flex flex-col text-white gap-7"><span className="text-5xl font-extrabold">98%</span>Speak Confidently <br /> After 30 Lessons</p>
            <p className="flex flex-col text-white gap-7"><span className="text-5xl font-extrabold">75%</span> Non-European Students</p>
            <p className="flex flex-col text-white gap-7"><span className="text-5xl font-extrabold">4.9/5</span>Avg Rating from <br /> 500+ Reviews</p>
        </div>
    </section >
}

export default Courses;