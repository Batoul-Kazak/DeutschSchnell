import { useState, useEffect, useRef } from 'react';

interface Answer {
    id: string;
    text: string;
}

interface Question {
    id: string;
    text: string;
    answers: Answer[];
    correctAnswerId: string;
    marks?: number;
}

interface LevelData {
    timeLimitMinutes: number;
    questions: Question[];
}

interface UseTestLogicProps {
    levelData: LevelData | undefined;
    level: string;
}

export const useTestLogic = ({ levelData, level }: UseTestLogicProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const answerRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setIsFinished(false);
        setTimeLeft(0);
    }, [level]);

    useEffect(() => {
        if (levelData) {
            setTimeLeft(levelData.timeLimitMinutes * 60);
        }
    }, [levelData]);

    useEffect(() => {
        if (timeLeft <= 0 || isFinished) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isFinished]);

    useEffect(() => {
        if (isFinished || !levelData) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const activeEl = document.activeElement;
            const isAnswerButton = answerRefs.current.includes(activeEl as HTMLButtonElement);

            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                const total = levelData.questions[currentQuestionIndex].answers.length;
                const currentIndex = answerRefs.current.findIndex(ref => ref === activeEl);

                let nextIndex;
                if (e.key === 'ArrowDown') {
                    nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % total;
                } else {
                    nextIndex = currentIndex === -1 ? total - 1 : (currentIndex - 1 + total) % total;
                }
                answerRefs.current[nextIndex]?.focus();
                return;
            }

            if ((e.key === 'Enter' || e.key === ' ') && isAnswerButton) {
                e.preventDefault();
                const answerId = (activeEl as HTMLElement).getAttribute('data-answer-id');
                if (answerId) {
                    handleAnswerSelect(answerId);
                }
                return;
            }

            if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                if (e.key === 'ArrowLeft') {
                    goToPrevious();
                } else if (e.key === 'ArrowRight') {
                    if (selectedAnswers[levelData.questions[currentQuestionIndex].id]) {
                        goToNext();
                    }
                }
                return;
            }

            if (e.key === 'Enter' && currentQuestionIndex === levelData.questions.length - 1) {
                if (selectedAnswers[levelData.questions[currentQuestionIndex].id]) {
                    handleSubmit();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentQuestionIndex, isFinished, selectedAnswers, levelData]);

    useEffect(() => {
        if (levelData && answerRefs.current[0]) {
            answerRefs.current[0].focus();
        }
    }, [currentQuestionIndex, levelData]);

    const handleAnswerSelect = (answerId: string) => {
        if (!levelData) return;
        const questionId = levelData.questions[currentQuestionIndex].id;
        setSelectedAnswers(prev => ({ ...prev, [questionId]: answerId }));
    };

    const goToNext = () => {
        if (levelData && currentQuestionIndex < levelData.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const goToPrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        setIsFinished(true);
    };

    const reset = () => {
        window.location.reload();
    };

    const getResult = () => {
        if (!levelData) return { score: 0, earned: 0, total: 0 };
        let totalMarks = 0;
        let earnedMarks = 0;
        levelData.questions.forEach(q => {
            const qMarks = q.marks ?? 1;
            totalMarks += qMarks;
            if (selectedAnswers[q.id] === q.correctAnswerId) {
                earnedMarks += qMarks;
            }
        });
        const score = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;
        return { score, earned: earnedMarks, total: totalMarks };
    };

    return {
        currentQuestionIndex,
        selectedAnswers,
        isFinished,
        timeLeft,

        answerRefs,
        containerRef,

        handleAnswerSelect,
        goToNext,
        goToPrevious,
        handleSubmit,
        reset,
        getResult,

        currentQuestion: levelData?.questions[currentQuestionIndex],
        selectedAnswerId: levelData
            ? selectedAnswers[levelData.questions[currentQuestionIndex]?.id]
            : undefined,
        questions: levelData?.questions || [],
    };
};