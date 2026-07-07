import { useEffect } from "react";
import RichText from "../../components/RichText/RichText";

export default function MessageBubble({
    item,
    isPractice = false,
    globalIndex,
    userAnswers,
    onInputChange,
    checked,
    correctAnswers
}: {
    item: any;
    isPractice?: boolean;
    globalIndex?: number;
    userAnswers?: Record<string, string>;
    onInputChange?: (index: number, value: string) => void;
    checked?: boolean;
    correctAnswers?: string[];
}) {
    const isPersonA = item.personID === "A";

    useEffect(() => {
        console.log(item);
    }, []);

    return (
        <div className={`flex  min-w-[40%] ${isPersonA ? "place-self-start" : "place-self-end"}`}>
            <div className="flex gap-2 min-w-[100%]">
                <div className={`w-[3rem] h-[3rem] border-[10px] 
                    ${isPersonA ? "border-l-rose-700" : "border-l-dark-blue-700"} 
                    ${!isPractice ? "hidden sm:flex" : "flex"} 
                    place-content-center place-items-center font-bold 
                    bg-dark-red-500 rounded-full hover:scale-110 transition duration-300 cursor-pointer`}>
                    {item.personName}
                </div>

                <div className={`p-2 px-3 min-w-[100%] sm:p-4 rounded-xl sm:rounded-2xl md:rounded-3xl hover:scale-105 
                    transition duration-300 shadow-2xl max-w-[170px] sm:max-w-[200px]
                    ${isPersonA
                        ? "bg-dark-red dark:bg-light-red  text-white place-self-start"
                        : "bg-dark-yellow dark:bg-light-yellow text-black place-self-end"}`}>

                    <div className="text-sm sm:text-base md:text-xl">
                        {isPractice && globalIndex !== undefined ? (
                            <RichText
                                text={item.de}
                                replace={true}
                                replacement={(match, matchIndex) => {
                                    const idx = globalIndex + matchIndex;
                                    const userValue = userAnswers?.[idx] || '';
                                    const correct = correctAnswers?.[idx];
                                    const isCorrect = userValue.trim().toLowerCase() === correct?.trim().toLowerCase();

                                    return (
                                        <input
                                            type="text"
                                            value={userValue}
                                            onChange={(e) => onInputChange?.(idx, e.target.value)}
                                            className={`w-16 border-b-2 bg-inherit text-center focus:outline-none 
                                                ${checked
                                                    ? isCorrect ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'
                                                    : 'border-gray-400'}`}
                                            disabled={checked}
                                        />
                                    );
                                }}
                            />
                        ) : (
                            <RichText text={item.de} replace={true} replacement={(match) => match} />
                        )}
                    </div>
                    <div className={isPersonA ? "text-gray-900" : "text-gray-800"}>{item.en}</div>
                </div>
            </div>
        </div>
    );
}