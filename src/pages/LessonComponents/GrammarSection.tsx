import { useState } from "react";
import RichText from "../../components/RichText/RichText";
import { useDeutschSchnell } from "../../context/DeutschSchnellProvider";
import Title from "../../components/Title";
import Button from "../../components/Button/Button";

export default function GrammarSection({ currentLesson, lessonId }) {
    const { setAnswer, userLessons } = useDeutschSchnell();
    const [showQuestions, setShowQuestions] = useState(false);

    const lessonData = userLessons[lessonId];
    const userAnswers = lessonData?.answers || {};

    const handleGrammarChange = (groupIdx, qIdx, value) => {
        const key = `grammar_${groupIdx}_${qIdx}`;
        setAnswer(lessonId, key, value);
    };

    return (
        <div id="grammar">
            {currentLesson?.grammar && (
                <div className="flex flex-col gap-10 pt-10">
                    <Title title="Grammar" number="04" />

                    <div className="space-y-6">
                        {currentLesson.grammar.sections.map((section, idx) => (
                            <div
                                key={idx}
                                className="p-6 border-l-4 shadow-sm bg-gradient-to-r dark:from-light-violet/20 dark:to-black/5 from-light-violet/10 to-white rounded-2xl border-light-violet"
                            >
                                <h3 className="flex items-center gap-2 text-xl font-bold text-light-violet">
                                    <span className="flex items-center justify-center w-8 h-8 text-sm text-white rounded-full bg-light-violet">
                                        {idx + 1}
                                    </span>
                                    {section.heading}
                                </h3>
                                <p className="mt-3 leading-relaxed text-gray-800 dark:text-white whitespace-pre-line">
                                    <RichText text={section.content} className="text-dark-red" />
                                </p>
                            </div>
                        ))}
                    </div>

                    <button
                        className="text-xl text-light-violet"
                        onClick={() => setShowQuestions(prev => !prev)}
                    >
                        {!showQuestions ? "Practice grammars" : "Close questions practice"}
                    </button>
                    <div className="w-full h-2 bg-light-violet"></div>

                    {showQuestions && (
                        <div>
                            <div className="mt-12">
                                <h2 className="mb-6 text-3xl font-bold text-light-violet">Practice: Fill in the Blanks</h2>
                                {currentLesson.grammarQuiz.map((group, groupIdx) => (
                                    <div key={groupIdx} className="mb-10">
                                        <h3 className="mb-4 text-xl font-bold text-dark-red">{group.section}</h3>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            {group.questions.map((q, qIdx) => {

                                                const asnwerKey = `grammar_${groupIdx}_${qIdx}`;
                                                const currentValue = userAnswers[asnwerKey] || "";
                                                const blankedText = q.text.replace("______", "__________");
                                                return (
                                                    <div
                                                        key={qIdx}
                                                        className="p-5 transition border bg-white/10  rounded-xl border-light-violet/30 hover:shadow-md"
                                                    >
                                                        <p className="mb-3 text-gray-800 dark:text-white">{blankedText}</p>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={currentValue}
                                                                onChange={(e) => handleGrammarChange(groupIdx, qIdx, e.target.value)}
                                                                placeholder="Your answer..."
                                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-red"
                                                            />
                                                            <button
                                                                onChange={() => handleGrammarChange(groupIdx, qIdx, q.answer)}
                                                                className="px-3 py-2 text-sm text-white transition rounded-lg bg-light-violet hover:bg-dark-red"
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
                                    <Button className="px-8 py-3 font-bold text-white transition transform rounded-full shadow-lg bg-light-violet hover:bg-dark-violet hover:scale-105">
                                        Check All Answers
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}