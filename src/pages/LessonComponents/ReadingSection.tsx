import React, { useState } from 'react';
import TriStateCheckbox from '../../components/TriStateCheckbox';
import { useDeutschSchnell } from '../../context/DeutschSchnellProvider';
import Title from '../../components/Title';
import ReadingPracticeSection from './ReadingPracticeSection';

export default function ReadingSection({ currentLesson, lessonId }) {
    const {setAnswer, userLessons} = useDeutschSchnell();
    const [showQuestions, setShowQuestions] = useState(false);

    const lessonData = userLessons[lessonId];
    const userAnswers = lessonData?.answers || {};

    const handleAnswerChange = (questionType, questionIndex, value) => {
        const key = `${questionType}_${questionIndex}`;
        setAnswer(lessonId, key, value);
    }

    return (
        <div id='reading'>
            <div className="flex flex-col gap-10 py-20">
                <Title title="Reading" number="03" />

                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                    {currentLesson.reading.map((text, idx) => (
                        <div
                            key={idx}
                            className="overflow-hidden bg-gradient-to-t from-light-violet/40 to-white/40 rounded-3xl"
                        >
                            <div className="pb-4 bg-gradient-to-t from-light-violet/50 to-white/50 rounded-3xl">
                                <div className="pb-4 bg-gradient-to-t from-light-violet/50 to-gray-200/80 rounded-3xl">
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
            <button className='text-xl text-light-violet' onClick={() => setShowQuestions(showQuestions => !showQuestions)}>{!showQuestions ? "Practice reading skills" : "Close questions practice"}</button>
            <div className='w-full h-2 bg-light-violet'></div>

            {showQuestions && <div>
                {currentLesson?.readingQuestions && (
                    <ReadingPracticeSection
                    currentLesson={currentLesson} userAnswers={userAnswers} handleAnswerChange={handleAnswerChange}
                    />
                )}
            </div>}
        </div>
    );
}