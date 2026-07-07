import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackToTopButton from "../components/JumpToTopButton/JumpToTopButton";
// import Navbar from "./components/Navbar/Navbar";
import ReadingSection from "./LessonComponents/ReadingSection";
import GrammarSection from "./LessonComponents/GrammarSection";
import DialogSection from "./LessonComponents/DialogSection";
import VocabularySection from "./LessonComponents/VocabularySection";
import { useLessonData } from "../hooks/useLessonData";
import { lessonTags } from "../constants/lessonView";
import Button from "../components/Button/Button";
import ReadingTracker from "../components/ReadingTracker/ReadingTracker";
import Timer from "../components/ReadingTracker/Timer";
import NotFound from "./NotFound";
import Loading from "./Loading";
import Navbar from "../components/NavBar/NavBar";

const LessonView = () => {
    const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
    const [wordsFilter, setWordsFilter] = useState("all");

    const { data: rawData, isLoading, error } = useQuery({
        queryKey: ["lesson", courseId, lessonId],
        queryFn: async () => {
            const res = await fetch(`/data/lessons/${courseId}/lesson${lessonId}.json`);
            if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load lesson`);
            return res.json();
        },
        enabled: !!courseId && !!lessonId,
        retry: 1,
    });

    const currentLesson = rawData?.lessons?.find(
        (lesson: any) => lesson.lessonNumber === Number(lessonId)
    );
    const { filteredWords, flattenedDialogue } = useLessonData(currentLesson, wordsFilter);

    useEffect(() => {
        console.log(lessonId);
    }, []);

    if (isLoading) return <Loading />;
    if (error || !currentLesson) return <NotFound
        message="Sorry, the lesson you are looking for doesn't exist or has been moved."
        buttonText="Back to Courses"
        link="/courses"
    />;
    // if (!currentLesson) return <div className="p-10 text-yellow-300">Lesson not found. Check URL and db.json key.</div>;

    // useEffect(() => {
    // console.log(lessonId)
    // console.log(courseId)
    // }, [])

    return (
        <div className="relative flex flex-col gap-20 text-gray-800 dark:bg-gray-900 dark:text-white">
            <Navbar navItems={lessonTags} isShowSearch={false} >
                <Timer />
            </Navbar>
            <div className="relative p-4 pt-20 sm:p-10 place-content-center">
                <h1 className="text-4xl">
                    Lesson {currentLesson.lessonNumber}:{" "}
                    <span className="text-[2.4rem] text-dark-red dark:text-light-red font-bold">
                        {currentLesson.title}
                    </span>
                </h1>
                <img src={currentLesson.image} alt="lesson-image" className="w-full py-10 " />

                <p className="mt-4 text-xl">{currentLesson.description}</p>
                <VocabularySection wordsFilter={wordsFilter} setWordsFilter={setWordsFilter} filteredWords={filteredWords} />
                <DialogSection currentLesson={flattenedDialogue} />
                <ReadingSection currentLesson={currentLesson} />
                <GrammarSection currentLesson={currentLesson} />
                <div className="flex justify-between w-full p-10 px-10 place-self-center">
                    <Button variant="secondary">
                        <Link to={`/courses/${courseId?.toString()}/${Number(lessonId) - 1 > 0 ? Number(lessonId) - 1 : lessonId}`}>
                            Review Previous Lesson
                        </Link>
                    </Button>
                    <Button variant="secondary">
                        {/* must replace 3 with maximum lessons exists */}
                        <Link to={`/courses/${courseId?.toString()}/${(Number(lessonId) + 1 < 3 ? Number(lessonId) + 1 : lessonId)}`}>
                            Go to Next Lesson
                        </Link>
                    </Button>
                </div>
            </div>
            <ReadingTracker />
            <BackToTopButton />
        </div>
    );
};

export default LessonView;