
import { Link } from 'react-router-dom';
// import deutschSchnellIcon from '../assets/images/background1.jpg';

interface NotFoundProps {
    message?: string;
    buttonText?: string;
    link?: string;
}

export default function NotFound({
    message = "The page you are looking for doesn't exist or have been moved.",
    buttonText = "Back to Home",
    link = "/"
}: NotFoundProps) {
    return (
        <div className="relative flex items-center justify-center min-h-screen p-6 overflow-hidden">
            <div
                className="absolute inset-0 -z-20"
                style={{
                    backgroundImage: 'url(/images/background5.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            />

            <div className="absolute inset-0 -z-10 bg-black/70 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-lg p-8 text-center border shadow-2xl bg-white/10 dark:bg-gray-900/40 border-white/20 rounded-3xl backdrop-blur-md">

                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-red-500/20 ring-2 ring-red-500/50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white">
                    404
                </h1>
                <h2 className="mb-4 text-xl font-semibold text-light-violet dark:text-light-blue">
                    Lesson Not Found
                </h2>

                <p className="mb-8 text-lg leading-relaxed text-gray-200">
                    {message}
                </p>

                <Link
                    to={link}
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-300 rounded-full shadow-lg bg-light-violet hover:bg-dark-violet hover:scale-105 focus:outline-none focus:ring-2 focus:ring-light-violet focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {buttonText}
                </Link>
            </div>
        </div>
    );
}