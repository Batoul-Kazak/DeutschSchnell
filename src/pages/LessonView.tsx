import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";
import Navbar from "../components/Navbar/Navbar";
import ReadingSection from "./LessonComponents/ReadingSection";
import GrammarSection from "./LessonComponents/GrammarSection";
import DialogSection from "./LessonComponents/DialogSection";
import VocabularySection from "./LessonComponents/VocabularySection";
import { useLessonData } from "../hooks/useLessonData";
import { lessonTags } from "../constants/lessonView";
import Button from "../components/Button/Button";
import ReadingTracker from "../components/ReadingTracker/ReadingTracker";
import Timer from "../components/ReadingTracker/Timer";

const LessonView = () => {
    const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
    const [wordsFilter, setWordsFilter] = useState("all");

    const { data: rawData, isLoading, error } = useQuery({
        queryKey: ["lesson", courseId, lessonId],
        queryFn: async () => {
            const res = await fetch("/data/lessons/A1/lesson1.json");
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


    if (isLoading) return <div className="p-10 text-center">Loading lesson...</div>;
    if (error) return <div className="p-10 text-red-500">❌ {error.message}</div>;
    if (!currentLesson) return <div className="p-10 text-yellow-300">Lesson not found. Check URL and db.json key.</div>;

    return (
        <div className="relative flex flex-col gap-20 text-gray-800">
            <Navbar navItems={lessonTags} isShowSearch={false} ><Timer /></Navbar>
            <div className="relative p-4 pt-20 sm:p-10 place-content-center">
                <h1 className="text-4xl">
                    Lesson {currentLesson.lessonNumber}:{" "}
                    <span className="text-[2.4rem] text-my-red font-bold">
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
                    <Button variant="secondary">Review Previous Lesson</Button>
                    <Button variant="secondary">Go to Next Lesson</Button>
                </div>
            </div>
            <ReadingTracker />
            <BackToTopButton />
        </div>
    );
};

export default LessonView;