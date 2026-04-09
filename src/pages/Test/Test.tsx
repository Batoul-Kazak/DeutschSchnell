import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import { useTestLogic } from '../../hooks/useTestLogic';
import deutschSchnellIcon from '../../../public/icons/deutschionary_logo.svg';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import TestButton from './components/TestButton';
import LoadingTest from './components/LoadingTest';
import FinishedTest from './components/FinishedTest';
import { useEffect } from 'react';

export default function Tests() {
    const { level } = useParams<{ level: string }>();
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ['testData', level],
        queryFn: () => fetch(`/data/tests/${level}.json`).then(res => {
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
        score,
        feedback,
        currentQuestion,
        selectedAnswerId,
        questions,
    } = useTestLogic({ levelData: data, level });

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        console.log(data);
    })


    if (isLoading) {
        return (
            <LoadingTest level={level} />
        );
    }

    if (error || !data || !data[level]) {
        return <NotFound message="Sorry the requested test in unavailable for now, we are working on adding more tests!" link="tests" buttonText="Go Back to Tests Page" />;
    }

    if (isFinished) {
        return <FinishedTest getResult={getResult} feedback={feedback} reset={reset} navigate={navigate} level={level} />
    }

    return (
        <div className="min-h-screen p-4 overflow-y-auto text-sm bg-gray-100 sm:text-base dark:text-white text-light-violet dark:bg-gray-800 md:p-6 custom-scrollbar">
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: 'url(/images/C2.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            />
            <div className="absolute inset-0 -z-10 bg-black/70"></div>

            <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
                <h1 className="flex items-center content-center gap-3 text-2xl font-bold text-light-violet dark:text-white">
                    <img src={deutschSchnellIcon} alt="logo" className="w-10 h-10" />
                    {level} German Test</h1>
                <div className="px-4 py-2 font-mono font-bold text-white rounded-lg bg-dark-red dark:bg-light-red">
                    {formatTime(timeLeft)}
                </div>
                <div className='py-2 bg-black rounded-full dark:bg-light-yellow'>
                    <ThemeSwitcher />
                </div>

            </div>
            <hr className="h-1 bg-light-violet" />

            <div className="w-full mb-8 bg-gray-300 rounded-full">
                <div
                    className="transition-all duration-300 rounded-full bg-dark-blue dark:bg-light-blue"
                    style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
                />
            </div>

            <div className="overflow-hidden rounded-2xl">

                <div className="p-2 sm:p-6">
                    <h2 className="mb-6 text-xl font-semibold dark:text-light-blue text-dark-blue">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    <p className="mb-8 text-lg ">{currentQuestion?.text}</p>

                    <div className="space-y-4 " ref={containerRef}>
                        {currentQuestion?.answers.map((answer, index) => (
                            <button
                                key={answer.id}
                                ref={el => (answerRefs.current[index] = el)}
                                data-answer-id={answer.id}
                                onClick={() => handleAnswerSelect(answer.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-light-violet 
                                    ${selectedAnswerId === answer.id
                                        ? 'border-dark-blue text-white bg-light-violet'
                                        : 'border-gray-300 dark:hover:border-light-blue/90 hover:border-dark-blue'
                                    }`}
                            >
                                {answer.text}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between p-6 ">
                    <TestButton
                        variant="nav-violet"
                        onClick={goToPrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </TestButton>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <TestButton
                            variant="nav-blue"
                            onClick={handleSubmit}
                            disabled={!selectedAnswerId}
                        >
                            Finish
                        </TestButton>
                    ) : (
                        <TestButton
                            variant="nav-blue"
                            onClick={goToNext}
                            disabled={!selectedAnswerId}
                        >
                            Next
                        </TestButton>
                    )}
                </div>
            </div>
        </div>
    );
}