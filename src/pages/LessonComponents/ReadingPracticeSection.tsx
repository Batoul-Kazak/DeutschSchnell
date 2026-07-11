import React from 'react'
import TriStateCheckbox from '../../components/TriStateCheckbox';
import Button from '../../components/Button/Button';

export default function ReadingPracticeSection({ currentLesson, userAnswers, handleAnswerChange }) {
    return (
        <div className="flex flex-col gap-10 pt-10">
            <h2 className="text-3xl font-bold text-light-violet">Reading Comprehension</h2>

            {currentLesson.readingQuestions.trueFalse.length > 0 && (
                <TrueFalseSection
                    currentLesson={currentLesson} userAnswers={userAnswers} handleAnswerChange={handleAnswerChange}

                />
            )}

            {currentLesson.readingQuestions.multipleChoice.length > 0 && (
                <ChooseCorrectAnswerSection
                    currentLesson={currentLesson} userAnswers={userAnswers} handleAnswerChange={handleAnswerChange}

                />
            )}

            {currentLesson.readingQuestions.shortAnswer.length > 0 && (
                <WritingSection
                    currentLesson={currentLesson} userAnswers={userAnswers} handleAnswerChange={handleAnswerChange}

                />
            )}

            <div className="flex justify-center">
                <Button className="px-6 py-3 font-bold text-white transition rounded-full bg-light-violet hover:bg-dark-violet">
                    Check My Answers
                </Button>
            </div>
        </div>
    )
}


function TrueFalseSection({ currentLesson, handleAnswerChange, userAnswers }) {
    return (
        <div className="p-6 bg-light-violet/20 rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-light-violet">True or False</h3>
            <div className="space-y-4">
                {currentLesson.readingQuestions.trueFalse.map((q, i) => (
                    <div key={i} className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-6 h-6 mt-1 border-2 rounded-full border-dark-red">
                            <span className="text-xs font-bold text-dark-red">{i + 1}</span>
                        </div>
                        <TriStateCheckbox value={userAnswers[`tf_${i}`] || "unanswered"}
                            onChange={(value) => handleAnswerChange('tf', i, value)} label={q.question} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ChooseCorrectAnswerSection({ currentLesson, handleAnswerChange, userAnswers }) {
    return (
        <div className="p-6 bg-light-violet/20 rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-light-violet">Choose the Correct Answer</h3>
            <div className="space-y-6">
                {currentLesson.readingQuestions.multipleChoice.map((q, i) => {
                    const currentAnswer = userAnswers[`mc_${i}`];
                    
                    return (
                        <div key={i}>
                            <p className="mb-3">
                                <span className="mr-2 font-bold text-light-violet">{i + 1}.</span> {q.question}
                            </p>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {q.options.map((option, idx) => {
                                    const isSelected = currentAnswer === option;
                                    
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswerChange('mc', i, option)}
                                            className={`p-3 text-left transition rounded-lg border-2 
                                                ${isSelected 
                                                    ? 'bg-dark-yellow border-dark-violet font-bold' 
                                                    : 'bg-white/80 border-transparent hover:bg-gray-100'}`}
                                        >
                                            {option}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function WritingSection({ currentLesson, handleAnswerChange, userAnswers }) {
    return (
        <div className="p-6 bg-light-violet/20 rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-light-violet">Answer in Complete Sentences</h3>
            <div className="space-y-5">
                {currentLesson.readingQuestions.shortAnswer.map((q, i) => (
                    <div key={i}>
                        <p className="mb-2">
                            <span className="mr-2 font-bold text-dark-green">{i + 1}.</span> {q.question}
                        </p>
                        <textarea
                            value={userAnswers[`sa_${i}`] || ""}
                            onChange={(e) => handleAnswerChange('sa', i, e.target.value)}
                            placeholder="Write your answer here..."
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-dark-red"
                            rows={2}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}