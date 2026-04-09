// export default function FinishedTest({ getResult }) {
//     const { score, earned, total } = getResult();
//     return (
//         <div className="flex items-center justify-center min-h-screen p-4" style={{
//             backgroundImage: `url(/images/C2.jpg)`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             backgroundAttachment: 'fixed',

//         }}>
//             <div className="w-full max-w-md p-8 py-12 text-center bg-white shadow-xl rounded-2xl">
//                 <h2 className="mb-4 text-4xl font-bold text-light-violet">{level} Test Completed!</h2>
//                 <h3 className='py-3 text-3xl text-dark-red'>{feedback.title}</h3>
//                 <div className="mb-2 text-5xl font-bold text-dark-blue">{score}%</div>
//                 <p className="mb-6 ">{earned} from {total} Question</p>
//                 <p className='pb-8 text-light-violet'>{feedback.message}</p>
//                 <TestButton
//                     variant="result"
//                     onClick={reset}
//                     className="mr-4"
//                 >
//                     Restart
//                 </TestButton>
//                 <TestButton
//                     variant="result"
//                     onClick={() => navigate('/')}
//                     className="ml-10"
//                 >
//                     To Home Page
//                 </TestButton>
//             </div>
//         </div>
//     );
// }


import TestButton from './TestButton';


interface FinishedTestProps {
    getResult: () => { score: number; earned: number; total: number };
    feedback: { title: string; message: string };
    reset: () => void;
    navigate: (path: string) => void;
    level: string;
}

export default function FinishedTest({ getResult, feedback, reset, navigate, level }: FinishedTestProps) {
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
                <p className="mb-6">{earned} from {total} Points</p>
                <p className='pb-8 text-light-violet'>{feedback.message}</p>
                <div className="flex justify-center gap-4">
                    <TestButton variant="result" onClick={reset}>
                        Restart
                    </TestButton>
                    <TestButton variant="result" onClick={() => navigate('/')}>
                        To Home Page
                    </TestButton>
                </div>
            </div>
        </div>
    );
}