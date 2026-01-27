import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import { useTestLogic } from '../../hooks/useTestLogic';

export default function Tests() {
    const { level } = useParams<{ level: string }>();
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ['testData', level],
        queryFn: () => fetch('/data/german-test.json').then(res => {
            if (!res.ok) throw new Error('Failed to load test data');
            return res.json();
        }),
        staleTime: Infinity,
        enabled: !!level,
    });

    const {
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
        currentQuestion,
        selectedAnswerId,
        questions,
    } = useTestLogic({ levelData: data?.[level], level });

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-my-yellow">
                <div className="text-my-violet">Loading {level} test...</div>
            </div>
        );
    }

    if (error || !data || !data[level]) {
        return <NotFound />;
    }

    if (isFinished) {
        const { score, earned, total } = getResult();
        return (
            <div className="flex items-center justify-center min-h-screen p-4 bg-my-red">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-xl rounded-2xl">
                    <h2 className="mb-4 text-2xl font-bold text-my-violet">{level} Test Completed!</h2>
                    <div className="mb-2 text-5xl font-bold text-my-blue">{score}%</div>
                    <p className="mb-6 text-gray-700">{earned} from {total} Points</p>
                    <button
                        onClick={reset}
                        className="px-6 py-2 text-white transition rounded-full bg-my-blue hover:opacity-90"
                    >
                        Restart
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 ml-10 text-white transition rounded-full bg-my-blue hover:opacity-90"
                    >
                        To Main Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-6 custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-my-violet">{level} German Test</h1>
                <div className="px-4 py-2 font-mono font-bold text-white rounded-lg bg-my-red">
                    {formatTime(timeLeft)}
                </div>
            </div>
            <hr className="h-1 bg-my-violet" />

            <div className="w-full mb-8 bg-gray-300 rounded-full">
                <div
                    className="transition-all duration-300 rounded-full bg-my-blue"
                    style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
                />
            </div>

            <div className="overflow-hidden rounded-2xl">
                <div className="p-6">
                    <h2 className="mb-6 text-xl font-semibold text-my-violet">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    <p className="mb-8 text-lg text-gray-800">{currentQuestion?.text}</p>

                    <div className="space-y-4" ref={containerRef}>
                        {currentQuestion?.answers.map((answer, index) => (
                            <button
                                key={answer.id}
                                ref={el => (answerRefs.current[index] = el)}
                                data-answer-id={answer.id}
                                onClick={() => handleAnswerSelect(answer.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-my-violet ${selectedAnswerId === answer.id
                                    ? 'border-my-blue bg-my-blue/10'
                                    : 'border-gray-300 hover:border-my-blue/70'
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
                        className={`px-6 py-2 rounded-lg text-white font-bold ${currentQuestionIndex === 0
                            ? 'bg-my-violet cursor-not-allowed'
                            : 'bg-my-violet hover:bg-gray-500'
                            }`}
                    >
                        Previous
                    </button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedAnswerId}
                            className={`px-6 py-2 rounded-lg font-bold ${!selectedAnswerId
                                ? 'bg-my-blue/95 text-white cursor-not-allowed'
                                : 'bg-my-blue text-white hover:opacity-90'
                                }`}
                        >
                            Finish
                        </button>
                    ) : (
                        <button
                            onClick={goToNext}
                            disabled={!selectedAnswerId}
                            className={`px-6 py-2 font-bold rounded-lg ${!selectedAnswerId
                                ? 'bg-my-blue/50 text-gray-800 cursor-not-allowed'
                                : 'bg-my-blue text-gray-900 hover:opacity-90'
                                }`}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}