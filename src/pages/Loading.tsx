export default function Loading() {
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

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md gap-6 p-10 text-center border shadow-2xl bg-white/10 dark:bg-gray-900/40 border-white/20 rounded-3xl backdrop-blur-md">

                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 rounded-full border-white/20"></div>
                    <div className="absolute inset-0 border-4 rounded-full border-t-light-violet border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-wide text-white">
                        Loading
                    </h2>
                    <p className="text-sm text-gray-300">
                        Preparing your lesson...
                    </p>
                </div>

                <div className="w-full h-1 mt-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full bg-light-violet animate-[shimmer_1.5s_infinite_linear] w-1/2 rounded-full"></div>
                </div>
            </div>

            <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
        </div>
    );
}