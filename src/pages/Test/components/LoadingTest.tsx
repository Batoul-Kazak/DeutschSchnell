export default function LoadingTest({ level }) {
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
    )
}