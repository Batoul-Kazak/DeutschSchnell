import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import { useTestLogic } from '../../hooks/useTestLogic';
import deutschSchnellIcon from '../../../public/icons/deutschionary_logo.svg';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';

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
        score,
        feedback,
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
            <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-dark-yellow">
                <div
                    className="absolute inset-0 -z-20"
                    style={{
                        backgroundImage: 'url(/images/C2.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                    }}
                />

                <div className="absolute inset-0 -z-10 bg-black/70"></div>

                <div className="flex flex-col items-center gap-6 px-6 text-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-transparent rounded-full border-t-light-violet animate-spin"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full opacity-50 border-b-white animate-spin"></div>
                    </div>

                    <div className="text-xl font-bold tracking-wide text-white md:text-2xl">
                        Loading {level} test...
                    </div>

                    <div className="w-32 h-1 overflow-hidden rounded-full bg-light-violet/30">
                        <div className="w-1/3 h-full bg-light-violet animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data || !data[level]) {
        return <NotFound message="Sorry the requested test in unavaliable for now, we are working on adding more tests!" link="tests" buttonText="Go Back to Tests Page" />;
    }

    if (isFinished) {
        const { score, earned, total } = getResult();
        return (
            <div className="flex items-center justify-center min-h-screen p-4" style={{
                backgroundImage: `url(/images/C2.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',

            }}>
                <div className="w-full max-w-md p-8 py-12 text-center bg-white shadow-xl rounded-2xl">
                    <h2 className="mb-4 text-4xl font-bold text-light-violet">{level} Test Completed!</h2>
                    <h3 className='py-3 text-3xl text-dark-red'>{feedback.title}</h3>
                    <div className="mb-2 text-5xl font-bold text-dark-blue">{score}%</div>
                    <p className="mb-6 ">{earned} from {total} Question</p>
                    <p className='pb-8 text-light-violet'>{feedback.message}</p>
                    <button
                        onClick={reset}
                        className="px-6 py-2 font-bold text-white transition rounded-full bg-light-violet hover:opacity-90"
                    >
                        Restart
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 ml-10 font-bold text-white transition rounded-full bg-light-violet hover:opacity-90"
                    >
                        To Home Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 overflow-y-auto text-sm bg-white sm:text-base dark:text-white text-light-violet dark:bg-gray-800 md:p-6 custom-scrollbar">
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
                <h1 className="flex items-center content-center gap-3 text-2xl font-bold text-violet-200">
                    <img src={deutschSchnellIcon} alt="logo" className="w-10 h-10" />
                    {level} German Test</h1>
                <div className="px-4 py-2 font-mono font-bold text-white rounded-lg bg-dark-red dark:bg-light-red">
                    {formatTime(timeLeft)}
                </div>
                <ThemeSwitcher />

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
                                        ? 'border-dark-blue dark:bg-light-violet bg-dark-violet/80'
                                        : 'border-gray-300 dark:hover:border-light-blue/90 hover:border-dark-blue'
                                    }`}
                            >
                                {answer.text}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between p-6 ">
                    <button
                        onClick={goToPrevious}
                        disabled={currentQuestionIndex === 0}
                        className={`sm:px-6 px-3 py-2 rounded-lg text-white font-bold ${currentQuestionIndex === 0
                            ? 'bg-dark-violet/80 dark:bg-light-violet/80 cursor-not-allowed'
                            : 'bg-dark-violet dark:bg-light-violet hover:bg-gray-200'
                            }`}
                    >
                        Previous
                    </button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedAnswerId}
                            className={`sm:px-6 px-3 py-2 rounded-lg font-bold ${!selectedAnswerId
                                ? 'bg-dark-blue/80 dark:bg-light-blue/80  text-white cursor-not-allowed'
                                : 'bg-dark-blue dark:bg-light-blue text-white hover:opacity-90'
                                }`}
                        >
                            Finish
                        </button>
                    ) : (
                        <button
                            onClick={goToNext}
                            disabled={!selectedAnswerId}
                            className={`sm:px-6 px-3 py-2 font-bold rounded-lg ${!selectedAnswerId
                                ? 'bg-dark-blue/80 dark:bg-light-blue/80  cursor-not-allowed'
                                : 'bg-dark-blue dark:bg-light-blue  hover:opacity-90'
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