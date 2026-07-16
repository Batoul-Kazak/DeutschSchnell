import { createContext, useContext, useEffect, useState } from "react";
import { CoursesLessonsInitialState } from "../constants/CoursesMaterials";
import { userDataExample } from "../constants";

export const DeutschSchnellContext = createContext(undefined);

type AnswerValue = string | boolean | number;

interface LessonData {
    answers: Record<string, AnswerValue>;
    isCompleted: boolean;
}

interface DeutschSchnellContextType {
    userLessons: Record<string, LessonData>;
    setAnswer: (lessonId: string, questionId: string, value: AnswerValue) => void;
    getLessonProgress: (lessonId: string) => LessonData | undefined;
}

export function DeutschSchnellProvider({ children }) {
    const [userLessons, setUserLessons] = useState<Record<string, LessonData>>(() => {
        const saved = localStorage.getItem("deutschSchnell_progress");
        return saved ? JSON.parse(saved) : CoursesLessonsInitialState;
    });
    // const [userAnswers, setUserAnswers] = useState(userDataExample);

    const setAnswer = (lessonId: string, questionId: string, value: AnswerValue) => {
        setUserLessons((prev) => {
            const currentLesson = prev[lessonId] || { answers: {}, isCompleted: false };

            return {
                ...prev,
                [lessonId]: {
                    ...currentLesson,
                    answers: {
                        ...currentLesson.answers,
                        [questionId]: value,
                    },
                },
            };
        });
    };

    const getLessonProgress = (lessonId: string) => {
        return userLessons[lessonId];
    };

    useEffect(() => {
        localStorage.setItem("deutschSchnell_progress", JSON.stringify(userLessons));
    }, [userLessons]);

    return (
        <DeutschSchnellContext.Provider value={{ userLessons, 
            setAnswer,
            getLessonProgress
         }}>
            {children}
        </DeutschSchnellContext.Provider>
    );
}

export function useDeutschSchnell() {
    const context = useContext(DeutschSchnellContext);

    if (context === undefined) {
        throw new Error("useDeutschSchnell must be used inside DeutschSchenllProvider");
    }
    return context;
}