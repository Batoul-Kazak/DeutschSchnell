import { useState, useEffect, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from "../../pages/NotFound";

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

export default function Tests() {
    const { level } = useParams<{ level: 'A1' | 'A2' }>();
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ['testData', level],
        queryFn: async () => {
            const res = await fetch('/data/german-test.json');
            if (!res.ok) throw new Error('Failed to load test data');
            return res.json() as Promise<{
                A1: { timeLimitMinutes: number; questions: Question[] };
                A2: { timeLimitMinutes: number; questions: Question[] };
            }>;
        },
        staleTime: Infinity,
        enabled: !!level,
    });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setIsFinished(false);
        setTimeLeft(0);
    }, [level]);

    useEffect(() => {
        if (data && !isLoading && !error) {
            const levelData = data[level];
            if (levelData) {
                setTimeLeft(levelData.timeLimitMinutes * 60);
            }
        }
    }, [data, isLoading, error, level]);

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

    const handleAnswerSelect = (answerId: string) => {
        if (!data) return;
        const questions = data[level]?.questions || [];
        if (currentQuestionIndex >= questions.length) return;

        const questionId = questions[currentQuestionIndex].id;
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const goToNext = () => {
        if (!data) return;
        const questions = data[level]?.questions || [];
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const goToPrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        setIsFinished(true);
    };

    const reset = () => {
        window.location.reload();
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-my-yellow">
                <div className="text-my-violet">Lädt {level}-Test...</div>
            </div>
        );
    }

    if (error || !data || !data[level]) {
        return (
            <NotFound />
        );
    }

    const levelData = data[level];
    const QUESTIONS = levelData.questions;
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const selectedAnswerId = selectedAnswers[currentQuestion.id];

    if (isFinished) {
        let totalMarks = 0;
        let earnedMarks = 0;

        QUESTIONS.forEach((q) => {
            const qMarks = q.marks ?? 1;
            totalMarks += qMarks;
            if (selectedAnswers[q.id] === q.correctAnswerId) {
                earnedMarks += qMarks;
            }
        });

        const score = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;

        return (
            <div className="flex items-center justify-center min-h-screen p-4 bg-my-red">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
                    <h2 className="mb-4 text-2xl font-bold text-my-violet">{level} Test Abgeschlossen!</h2>
                    <div className="mb-2 text-5xl font-bold text-my-blue">{score}%</div>
                    <p className="mb-6 text-gray-700">
                        {earnedMarks} von {totalMarks} Punkten
                    </p>
                    <button
                        onClick={reset}
                        className="px-6 py-2 text-white transition rounded-full bg-my-blue hover:opacity-90"
                    >
                        Neustarten
                    </button>
                    <button onClick={() => navigate('/')} className="px-6 py-2 ml-10 text-white transition rounded-full bg-my-blue hover:opacity-90">
                        Zur Startseite
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-my-violet">{level} Deutsch Test</h1>
                <div className="px-4 py-2 font-mono font-bold text-white rounded-lg bg-my-red">
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="w-full bg-gray-300 rounded-full h-2.5 mb-8">
                <div
                    className="bg-my-blue h-2.5 rounded-full transition-all duration-300"
                    style={{
                        width: `${(currentQuestionIndex / QUESTIONS.length) * 100}%`,
                    }}
                ></div>
            </div>

            <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="h-[400px] overflow-y-auto p-6">
                    <h2 className="mb-6 text-xl font-semibold text-my-violet">
                        Frage {currentQuestionIndex + 1} von {QUESTIONS.length}
                    </h2>
                    <p className="mb-8 text-lg text-gray-800">{currentQuestion.text}</p>

                    <div className="space-y-4">
                        {currentQuestion.answers.map((answer) => (
                            <button
                                key={answer.id}
                                onClick={() => handleAnswerSelect(answer.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedAnswerId === answer.id
                                    ? "border-my-blue bg-my-blue/10"
                                    : "border-gray-300 hover:border-my-blue/70"
                                    }`}
                            >
                                {answer.text}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between p-6 bg-gray-100">
                    <button
                        onClick={goToPrevious}
                        disabled={currentQuestionIndex === 0}
                        className={`px-6 py-2 rounded-lg font-medium ${currentQuestionIndex === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-400 text-white hover:bg-gray-500"
                            }`}
                    >
                        Vorherige
                    </button>

                    {currentQuestionIndex === QUESTIONS.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedAnswerId}
                            className={`px-6 py-2 rounded-lg font-medium ${!selectedAnswerId
                                ? "bg-my-blue/50 text-white cursor-not-allowed"
                                : "bg-my-blue text-white hover:opacity-90"
                                }`}
                        >
                            Abschließen
                        </button>
                    ) : (
                        <button
                            onClick={goToNext}
                            disabled={!selectedAnswerId}
                            className={`px-6 py-2 rounded-lg font-medium ${!selectedAnswerId
                                ? "bg-my-blue/50 text-white cursor-not-allowed"
                                : "bg-my-blue text-white hover:opacity-90"
                                }`}
                        >
                            Nächste
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}