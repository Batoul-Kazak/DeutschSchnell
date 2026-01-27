import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
            <div className="max-w-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-white bg-red-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-gray-800">Test Not Found</h1>
                <p className="mb-6 text-gray-600">
                    The requested German test does not exist or is unavailable.
                </p>
                <Link
                    to="/tests"
                    className="px-5 py-2.5 text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                >
                    ← Back to Tests
                </Link>
            </div>
        </div>
    );
}