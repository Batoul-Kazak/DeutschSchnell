import { useEffect, useState } from 'react'

export default function Timer() {
    const [seconds, setSeconds] = useState(0);

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <div className="sm:flex hidden top-2 border-2 left-10 z-[1000] flex-col items-start w-full gap-2 p-3 bg-black/20 text-white  rounded-lg  backdrop-blur-sm">
                <div className="font-mono ">
                    ⏱ {formatTime(seconds)}
                </div>
            </div>
            <div className='fixed left-0 flex w-full p-2 text-sm bottom-2 sm:hidden bg-dark-violet'>
                ⏱ {formatTime(seconds)}
            </div>
        </div>
    )
}
