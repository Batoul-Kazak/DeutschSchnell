import RichText from "../../components/RichText/RichText";

interface LessonItem {
    personID: string;
    personName: string;
    de: string;
    en: string;
}

export default function MessageBubble({
    item,
    isPractice = false,
    globalIndex,
    userAnswers,
    onInputChange,
    checked,
    correctAnswers
}: {
    item: LessonItem;
    isPractice?: boolean;
    globalIndex?: number;
    userAnswers?: Record<string, string>;
    onInputChange?: (index: number, value: string) => void;
    checked?: boolean;
    correctAnswers?: string[];
}) {
    const isPersonA = item.personID === "A";
    const cleanText = item.de.replace(/\*/g, '');

    return (
        <div className={`flex min-w-[40%] ${isPersonA ? "place-self-start" : "place-self-end"}`}>
            <div className="flex gap-2 min-w-[100%] flex-col">

                <div className={` 
                    ${isPersonA ? "place-self-start" : "place-self-end"} 
                    ${!isPractice ? "hidden sm:flex" : "flex"} 
                    place-content-center place-items-center font-bold
                     rounded-full hover:scale-110 transition duration-300 cursor-pointer
                    text-gray-500 dark:text-white`}>
                    {item.personName}
                </div>

                <div className={`p-2 px-3 min-w-[100%] sm:p-4 rounded-xl sm:rounded-2xl md:rounded-3xl hover:scale-105 
                    transition duration-300 shadow-2xl max-w-[170px] sm:max-w-[200px] 
                    ${isPersonA
                        ? "bg-dark-red sm:rounded-tl-none md:rounded-tl-none rounded-tl-none dark:bg-light-red text-white place-self-start"
                        : "bg-gray-300 sm:rounded-tr-none md:rounded-tr-none rounded-tr-none dark:bg-gray-400 text-black place-self-end"}`}>

                    <div className="text-sm sm:text-base md:text-xl">
                        
                        {!isPractice && (
                            <RichText 
                                text={cleanText} 
                                translation={item.en} 
                                replace={false} 
                                className="text-inherit" 
                            />
                        )}

                        {isPractice && globalIndex !== undefined && (
                            <>
                            <RichText
                                text={item.de}
                                replace={true}
    
                                replacement={(match, matchIndex) => {
                                    const idx = globalIndex + matchIndex;
                                    const answerKey = `dialogue_${idx}`;
                                    const userValue = userAnswers?.[answerKey] || '';
                                    const correct = correctAnswers?.[idx];
                                    const isCorrect = userValue.trim().toLowerCase() === correct?.trim().toLowerCase();

                                    return (
                                        <input
                                            type="text"
                                            value={userValue}
                                            onChange={(e) => onInputChange?.(idx, e.target.value)}
                                            className={`w-16 border-b-2 bg-inherit text-center focus:outline-none 
                                                ${checked
                                                    ? isCorrect 
                                                        ? 'border-green-500 text-green-600' 
                                                        : 'border-red-500 text-red-600'
                                                    : 'border-gray-400'}`}
                                            disabled={checked}
                                        />
                                        
                                    );
                                }}
                            />
                              <RichText 
                                text=""
                                translation={item.en} 
                                replace={false} 
                                className="text-white " 
                            />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}