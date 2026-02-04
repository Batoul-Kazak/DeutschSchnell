import { useState } from "react";
import RichText from "../../components/RichText/RichText";

export default function GrammarSection({ currentLesson }) {
    const [showQuestions, setShowQuestions] = useState(false);

    return (
        <div id="grammar">
            {currentLesson?.grammar && (
                <div className="flex flex-col gap-10 pt-10">
                    <h2 className="text-3xl font-bold text-my-violet">Grammar Lesson</h2>

                    <div className="space-y-6">
                        {currentLesson.grammar.sections.map((section, idx) => (
                            <div
                                key={idx}
                                className="p-6 border-l-4 shadow-sm bg-gradient-to-r from-my-violet/10 to-white rounded-2xl border-my-violet"
                            >
                                <h3 className="flex items-center gap-2 text-xl font-bold text-my-violet">
                                    <span className="flex items-center justify-center w-8 h-8 text-sm text-white rounded-full bg-my-violet">
                                        {idx + 1}
                                    </span>
                                    {section.heading}
                                </h3>
                                <p className="mt-3 leading-relaxed text-gray-800 whitespace-pre-line">
                                    <RichText text={section.content} className="text-my-red" />
                                </p>
                            </div>
                        ))}
                    </div>

                    <button
                        className="text-xl text-my-violet"
                        onClick={() => setShowQuestions(prev => !prev)}
                    >
                        {!showQuestions ? "Practice grammars" : "Close questions practice"}
                    </button>
                    <div className="w-full h-2 bg-my-violet"></div>

                    {showQuestions && (
                        <div>
                            <div className="mt-12">
                                <h2 className="mb-6 text-3xl font-bold text-my-violet">Practice: Fill in the Blanks</h2>
                                {currentLesson.grammarQuiz.map((group, groupIdx) => (
                                    <div key={groupIdx} className="mb-10">
                                        <h3 className="mb-4 text-xl font-bold text-my-red">{group.section}</h3>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {group.questions.map((q, qIdx) => {
                                                const blankedText = q.text.replace("______", "__________");
                                                return (
                                                    <div
                                                        key={qIdx}
                                                        className="p-5 transition border bg-white/90 rounded-xl border-my-violet/30 hover:shadow-md"
                                                    >
                                                        <p className="mb-3 text-gray-800">{blankedText}</p>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Your answer..."
                                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-my-red"
                                                            />
                                                            <button
                                                                className="px-3 py-2 text-sm text-white transition rounded-lg bg-my-violet hover:bg-my-red"
                                                            >
                                                                Show Answer
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-center">
                                    <button className="px-8 py-3 font-bold text-white transition transform rounded-full shadow-lg bg-my-red hover:bg-my-orange hover:scale-105">
                                        Check All Answers
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}