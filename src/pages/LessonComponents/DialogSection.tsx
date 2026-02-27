
import React, { useState } from 'react';
import RichText from '../../components/RichText/RichText';

export default function DialogSection({ currentLesson }) {
    const [showQuestions, setShowQuestions] = useState(false);
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [checked, setChecked] = useState(false);

    // Extract all blanks (**...**) from dialogue to get correct answers
    const correctAnswers: string[] = [];
    currentLesson.forEach((item: any) => {
        const matches = item.de.match(/\*\*(.*?)\*\*/g);
        if (matches) {
            matches.forEach((match: string) => {
                correctAnswers.push(match.slice(2, -2)); // Remove **
            });
        }
    });

    const handleInputChange = (index: number, value: string) => {
        setUserAnswers(prev => ({ ...prev, [index]: value }));
    };

    const handleCheck = () => {
        setChecked(true);
    };

    return (
        <div>
            {!showQuestions && (
                <div id="dialogue" className="flex flex-col gap-5 pt-10 text-xs sm:text-sm place-content-center place-items-center">
                    <h2 className="text-3xl font-bold text-light-violet">Dialogue</h2>
                    <div className="flex flex-col gap-2 sm:w-[80%] w-full">
                        {currentLesson.map((item: any, i: number) => (
                            <div
                                key={i}
                                className={`flex  ${item.person === "A" ? "place-self-start" : "place-self-end"}`}
                            >
                                <div className="flex w-full gap-2">
                                    <div
                                        className={`w-[3rem] h-[3rem] ${item.person === "A" ? "border-l-rose-700" : "border-l-dark-blue-700"
                                            } border-[10px] hidden hover:scale-110 cursor-pointer transition duration-300 sm:flex place-content-center place-items-center font-bold bg-dark-red-500 rounded-full`}
                                    >
                                        {item.person}
                                    </div>
                                    <div
                                        className={`sm:p-4 p-2 px-3 sm:max-w-auto max-w-[170px] sm:rounded-3xl rounded-xl  hover:scale-105 transition duration-300 shadow-2xl ${item.person === 'A' ? "bg-dark-red place-self-start dark:bg-light-red text-white" : "bg-dark-yellow place-self-end dark:bg-light-yellow text-black"
                                            }`}
                                    >
                                        <div className="text-sm sm:text-base">
                                            <RichText
                                                text={item.de}
                                                replace={true}
                                                replacement={(match) => match}
                                            />
                                        </div>
                                        <div className={item.person === 'A' ? "text-gray-900" : "text-gray-800"}>{item.en}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                className="pt-5 text-sm sm:text-xl text-light-violet"
                onClick={() => {
                    setShowQuestions(prev => !prev);
                    setChecked(false);
                    setUserAnswers({});
                }}
            >
                {!showQuestions ? "Practice dialog" : "Close practice mode"}
            </button>

            {showQuestions && (
                <div id="dialog" className="flex flex-col gap-5 pt-10 place-content-center place-items-center">
                    <h2 className="text-3xl font-bold text-light-violet">Dialogue</h2>
                    <div className="flex flex-col gap-5 sm:w-[80%] ">
                        {currentLesson.map((item: any, i: number) => {
                            let blankIndexOffset = 0;
                            for (let j = 0; j < i; j++) {
                                const prevMatches = currentLesson[j].de.match(/\*\*(.*?)\*\*/g) || [];
                                blankIndexOffset += prevMatches.length;
                            }

                            return (
                                <div
                                    key={i}
                                    className={`flex ${item.person === "A" ? "place-self-start" : "place-self-end"}`}
                                >
                                    <div className="flex gap-2">
                                        <div
                                            className={`w-[3rem] h-[3rem] ${item.person === "A" ? "border-l-rose-700" : "border-l-dark-blue-700"
                                                } border-[10px] hover:scale-110 cursor-pointer transition duration-300 flex place-content-center place-items-center font-bold bg-dark-red-500 rounded-full`}
                                        >
                                            {item.person}
                                        </div>
                                        <div
                                            className={`p-4 rounded-3xl hover:scale-105 transition duration-300 shadow-2xl ${item.person === 'A' ? "bg-dark-red dark:bg-light-red text-white" : "bg-dark-yellow dark:bg-light-yellow text-black"
                                                }`}
                                        >
                                            <div className="text-base sm:text-xl ">
                                                <RichText
                                                    text={item.de}
                                                    replace={true}
                                                    replacement={(match, matchIndex) => {
                                                        const globalIndex = blankIndexOffset + matchIndex;
                                                        const userValue = userAnswers[globalIndex] || '';
                                                        const correct = correctAnswers[globalIndex];
                                                        const isCorrect = userValue.trim().toLowerCase() === correct?.trim().toLowerCase();

                                                        return (
                                                            <input
                                                                type="text"
                                                                value={userValue}
                                                                onChange={(e) => handleInputChange(globalIndex, e.target.value)}
                                                                className={`w-16 border-b-2 bg-inherit text-center focus:outline-none ${checked
                                                                    ? isCorrect
                                                                        ? 'border-green-500 text-green-600'
                                                                        : 'border-red-500 text-red-600'
                                                                    : 'border-gray-400'
                                                                    }`}
                                                                disabled={checked}
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className={item.person === 'A' ? "text-gray-900" : "text-gray-800"}>{item.en}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button
                        onClick={handleCheck}
                        className="px-4 py-2 text-white rounded-lg bg-light-violet hover:bg-dark-red"
                    >
                        Check Your Answers
                    </button>
                </div>
            )}
        </div>
    );
}