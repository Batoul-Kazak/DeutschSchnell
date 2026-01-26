import { useState, useEffect } from "react";

// Define types
interface Answer {
    id: string;
    text: string;
}

interface Question {
    id: string;
    text: string;
    answers: Answer[];
    correctAnswerId: string;
}

const QUESTIONS: Question[] = [
    {
        id: "q1",
        text: "Wie sagt man 'Hello' auf Deutsch?",
        answers: [
            { id: "a1", text: "Hallo" },
            { id: "a2", text: "Tschüss" },
            { id: "a3", text: "Danke" },
            { id: "a4", text: "Bitte" },
        ],
        correctAnswerId: "a1",
    },
    {
        id: "q2",
        text: "Was bedeutet 'Buch' auf Englisch?",
        answers: [
            { id: "a1", text: "Pen" },
            { id: "a2", text: "Book" },
            { id: "a3", text: "Table" },
            { id: "a4", text: "Chair" },
        ],
        correctAnswerId: "a2",
    },
    {
        id: "q3",
        text: "Welches Wort ist ein Verb?",
        answers: [
            { id: "a1", text: "Haus" },
            { id: "a2", text: "Schön" },
            { id: "a3", text: "Laufen" },
            { id: "a4", text: "Blau" },
        ],
        correctAnswerId: "a3",
    },
    {
        id: "q4",
        text: "Wie lautet die Pluralform von 'Kind'?",
        answers: [
            { id: "a1", text: "Kinder" },
            { id: "a2", text: "Kindes" },
            { id: "a3", text: "Kinds" },
            { id: "a4", text: "Kindern" },
        ],
        correctAnswerId: "a1",
    },
];

const DURATION_MINUTES = 10;

export default function Tests() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(DURATION_MINUTES * 60);
    const [isFinished, setIsFinished] = useState(false);

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
        const questionId = QUESTIONS[currentQuestionIndex].id;
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const goToNext = () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
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

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const selectedAnswerId = selectedAnswers[currentQuestion.id];

    if (isFinished) {
        const correctCount = QUESTIONS.filter(
            (q) => selectedAnswers[q.id] === q.correctAnswerId
        ).length;
        const score = Math.round((correctCount / QUESTIONS.length) * 100);

        return (
            <div className="flex items-center justify-center min-h-screen p-4 ">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
                    <h2 className="mb-4 text-2xl font-bold text-violet">Test Abgeschlossen!</h2>
                    <div className="mb-2 text-5xl font-bold text-blue">{score}%</div>
                    <p className="mb-6 text-gray-700">
                        {correctCount} von {QUESTIONS.length} Fragen richtig beantwortet.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 text-white transition rounded-full bg-blue hover:opacity-90"
                    >
                        Neustarten
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-6">
            {/* Header with Timer */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-violet">Deutsch Test</h1>
                <div className="px-4 py-2 font-mono font-bold text-white rounded-lg bg-red">
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Progress Bar — starts at 0% */}
            <div className="w-full bg-gray-300 rounded-full h-2.5 mb-8">
                <div
                    className="bg-blue h-2.5 rounded-full transition-all duration-300"
                    style={{
                        width: `${(currentQuestionIndex / QUESTIONS.length) * 100}%`,
                    }}
                ></div>
            </div>

            {/* Questions Container */}
            <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="h-[400px] overflow-y-auto p-6">
                    <h2 className="mb-6 text-xl font-semibold text-violet">
                        Frage {currentQuestionIndex + 1} von {QUESTIONS.length}
                    </h2>
                    <p className="mb-8 text-lg text-gray-800">{currentQuestion.text}</p>

                    <div className="space-y-4">
                        {currentQuestion.answers.map((answer) => (
                            <button
                                key={answer.id}
                                onClick={() => handleAnswerSelect(answer.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedAnswerId === answer.id
                                    ? "border-blue bg-blue/10"
                                    : "border-gray-300 hover:border-blue/70"
                                    }`}
                            >
                                {answer.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
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
                                ? "bg-blue/50 text-white cursor-not-allowed"
                                : "bg-blue text-white hover:opacity-90"
                                }`}
                        >
                            Abschließen
                        </button>
                    ) : (
                        <button
                            onClick={goToNext}
                            disabled={!selectedAnswerId}
                            className={`px-6 py-2 rounded-lg font-medium ${!selectedAnswerId
                                ? "bg-blue/50 text-white cursor-not-allowed"
                                : "bg-blue text-white hover:opacity-90"
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