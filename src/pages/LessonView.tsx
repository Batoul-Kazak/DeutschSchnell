import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackToTopButton from "../components/JumpToTopButton/JumpToTopButton";
// import Navbar from "./components/Navbar/Navbar";
import ReadingSection from "./LessonComponents/ReadingSection";
import GrammarSection from "./LessonComponents/GrammarSection";
import DialogSection from "./LessonComponents/DialogSection";
import VocabularySection from "./LessonComponents/VocabularySection";
import { useLessonData } from "../hooks/useLessonData";
import { lessonTags } from "../constants/lessonView";
import Button from "../components/Button";
import ReadingTracker from "../components/ReadingTracker/ReadingTracker";
import Timer from "../components/ReadingTracker/Timer";
import NotFound from "./NotFound";
import Loading from "./Loading";
import Navbar from "../components/NavBar/NavBar";
import LearningPoints from "../components/LearningPoints";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
// import manifest all lessons to see number of lessons and quizzes for each course

const items = [
    "Self-introduction using 'Ich bin...' and 'Mein Name ist...'",
    "Basic greetings: 'Hallo', 'Guten Tag', 'Auf Wiedersehen'",
    "Simple question formation with 'Wer bist du?'",
    "Numbers from 1 to 20",
    "Present tense conjugation of 'sein' (to be)"
];

const LessonView = ({ lessonId: propLessonId, courseId: propCourseId }) => {
    const params = useParams<{ courseId: string; lessonId: string }>();
    const navigate = useNavigate();

    const courseId = propCourseId || params.courseId;
    const lessonId = propLessonId || params.lessonId;

    if (!lessonId || !courseId) return <NotFound />

    const [wordsFilter, setWordsFilter] = useState("all");

    async function fetchManifestData(courseId: string) {
        const res = await fetch(`/data/lessons/${courseId}/manifest.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load manifest`);
        return res.json();
    }

    const { data: manifestData, isLoading: isManifestLoading, error: manifestError } = useQuery({
        queryKey: ["manifest", courseId],
        queryFn: () => fetchManifestData(courseId)
    });

    const { data: rawData, isLoading, error } = useQuery({
        queryKey: ["lesson", courseId, lessonId],
        queryFn: async () => {
            const lessonIdNumber = lessonId.replace('l', '');
            const res = await fetch(`/data/lessons/${courseId}/lesson${lessonIdNumber}.json`);
            if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load lesson`);
            return res.json();
        },
        enabled: !!courseId && !!lessonId,
        retry: 1,
    });

    const currentLessonNumber = lessonId.replace('l', '');

    const currentLesson = rawData?.lessons?.find(
        (lesson: any) => lesson.lessonNumber === Number(currentLessonNumber)
    );
    const { filteredWords, flattenedDialogue } = useLessonData(currentLesson, wordsFilter);



    if (isLoading || isManifestLoading || !manifestData) return <Loading />;
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

    // console.log(manifestData)


    const currentItemIndex = manifestData?.findIndex((item: any) => item.id === lessonId && item.type === "lesson");

    let nextAction: { type: "course" | "quiz", target: string } | null = null;

    if (manifestData && currentItemIndex !== -1) {
        if (currentItemIndex + 1 < manifestData.length) {
            const nextItem = manifestData[currentItemIndex + 1];
            nextAction = { type: "quiz", target: nextItem.id };

        } else {
            const nextCourseId = getNextCourse(courseId);
            if (nextCourseId)
                nextAction = { type: "course", target: nextCourseId };
        }
    }

    function getNextCourse(currentCourseId: string) {
        const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
        const idx = levels.indexOf(currentCourseId);
        return idx >= 0 && idx < levels.length - 1 ? levels[idx + 1] : null;
    }

    return (
        <div className="relative flex flex-col gap-2 text-gray-800 dark:bg-gray-900 dark:text-white">
            <Navbar navItems={lessonTags} isShowSearch={false} >
                <Timer />
            </Navbar>
            
            <Container className="relative place-content-center" >
                <Breadcrumb 
                    items={[
                        { label: 'Courses', href: '/courses' },
                        { label: courseId, href: `/courses/${courseId}` },
                        { label: `Lesson ${lessonId.replace('l', '')}`, href: `/courses/${courseId}/lesson/${lessonId.replace('l', '')}` }
                    ]} 
                />

                <h1 className="text-4xl py-6">
                    Lesson {currentLesson.lessonNumber}:{" "}
                    <span className="text-[2.4rem] text-dark-red dark:text-light-red font-bold">
                        {currentLesson.title}
                    </span>
                </h1>
                <p className="mt-4 text-xl">{currentLesson.description}</p>
                <img src={currentLesson.image} alt="lesson-image" className="w-full py-10 " />
                <LearningPoints items={items} />

                <VocabularySection wordsFilter={wordsFilter} setWordsFilter={setWordsFilter} filteredWords={filteredWords} />
                <DialogSection currentLesson={flattenedDialogue} lessonId={lessonId} />
                <ReadingSection currentLesson={currentLesson} lessonId={lessonId} />
                <GrammarSection currentLesson={currentLesson} lessonId={lessonId} />
                <div className="flex justify-between w-full p-10 px-10 place-self-center">
                    <Button
                        variant="secondary"
                        onClick={() => {
                            // Extract number, subtract 1, add 'l' back
                            const currentNum = parseInt(lessonId.replace('l', ''));
                            if (currentNum > 1) {
                                navigate(`/courses/${courseId}/lesson/l${currentNum - 1}`);
                            }
                        }}
                    >
                        Review Previous Lesson
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={nextAction?.type === 'course' ? () => navigate(`/courses/${nextAction.target}`) : undefined}
                        >
                        {nextAction?.type === 'quiz' ? (
                            <Link to={`/courses/${courseId}/quiz/${nextAction.target.replace('q', '')}`}>
                                Take Quiz 
                            </Link>
                        ) : nextAction?.type === 'course' ? (
                            "Go to Next Course"
                        ) : (
                            <span className="opacity-50 cursor-not-allowed">Course Completed</span>
                        )}
                    </Button>

                {/* </div> */}
            </div>
            </Container>
            <ReadingTracker />
            <BackToTopButton />
        </div>
    );
};

export default LessonView;