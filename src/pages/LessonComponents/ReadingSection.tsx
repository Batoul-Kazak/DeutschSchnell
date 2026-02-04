import React, { useState } from 'react';

export default function ReadingSection({ currentLesson }) {
    const [showQuestions, setShowQuestions] = useState(false);

    return (
        <div id='reading'>
            <div className="flex flex-col gap-10 py-20">
                <h2 className="text-4xl font-bold text-my-violet">Reading</h2>

                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    {currentLesson.reading.map((text, idx) => (
                        <div
                            key={idx}
                            className="overflow-hidden bg-gradient-to-t from-my-violet/40 to-white/40 rounded-3xl"
                        >
                            <div className="pb-4 bg-gradient-to-t from-my-violet/50 to-white/50 rounded-3xl">
                                <div className="pb-4 bg-gradient-to-t from-my-violet/50 to-gray-200/80 rounded-3xl">
                                    <div className="px-3 py-10 sm:px-10">
                                        <h3 className="pb-2 mb-3 text-xl font-bold text-indigo-800 border-b-2 border-gray-400 sm:text-2xl">{text.address}</h3>
                                        <p className="text-base leading-relaxed text-gray-800 sm:text-xl">{text.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className='text-xl text-my-violet' onClick={() => setShowQuestions(showQuestions => !showQuestions)}>{!showQuestions ? "Practice reading skills" : "Close questions practice"}</button>
            <div className='w-full h-2 bg-my-violet'></div>

            {showQuestions && <div className={``}>
                {currentLesson?.readingQuestions && (
                    <div className="flex flex-col gap-10 pt-10">
                        <h2 className="text-3xl font-bold text-my-violet">Reading Comprehension</h2>

                        {currentLesson.readingQuestions.trueFalse.length > 0 && (
                            <div className="p-6 bg-my-violet/20 rounded-xl">
                                <h3 className="mb-4 text-xl font-bold text-my-violet">True or False</h3>
                                <div className="space-y-4">
                                    {currentLesson.readingQuestions.trueFalse.map((q, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="flex items-center justify-center w-6 h-6 mt-1 border-2 rounded-full border-my-red">
                                                <span className="text-xs font-bold text-my-red">{i + 1}</span>
                                            </div>
                                            <p>{q.question}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentLesson.readingQuestions.multipleChoice.length > 0 && (
                            <div className="p-6 bg-my-violet/20 rounded-xl">
                                <h3 className="mb-4 text-xl font-bold text-my-violet">Choose the Correct Answer</h3>
                                <div className="space-y-6">
                                    {currentLesson.readingQuestions.multipleChoice.map((q, i) => (
                                        <div key={i}>
                                            <p className="mb-3">
                                                <span className="mr-2 font-bold text-my-violet">{i + 1}.</span> {q.question}
                                            </p>
                                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                {q.options.map((option, idx) => (
                                                    <button
                                                        key={idx}
                                                        className="p-3 text-left transition rounded-lg bg-white/80 hover:bg-my-yellow"
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                        {currentLesson.readingQuestions.shortAnswer.length > 0 && (
                            <div className="p-6 bg-my-violet/20 rounded-xl">
                                <h3 className="mb-4 text-xl font-bold text-my-violet">Answer in Complete Sentences</h3>
                                <div className="space-y-5">
                                    {currentLesson.readingQuestions.shortAnswer.map((q, i) => (
                                        <div key={i}>
                                            <p className="mb-2">
                                                <span className="mr-2 font-bold text-my-orange">{i + 1}.</span> {q.question}
                                            </p>
                                            <textarea
                                                placeholder="Write your answer here..."
                                                className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-my-red"
                                                rows={2}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center">
                            <button className="px-6 py-3 font-bold text-white transition rounded-full bg-my-red hover:bg-my-orange">
                                Check Answers
                            </button>
                        </div>
                    </div>
                )}
            </div>}
        </div>
    );
}