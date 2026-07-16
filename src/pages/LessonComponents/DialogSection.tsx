import { useMemo, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useDeutschSchnell } from "../../context/DeutschSchnellProvider";
import Title from "../../components/Title";
import Button from "../../components/Button/Button";

export default function DialogSection({ currentLesson, lessonId }) {
    const {setAnswer, userLessons} = useDeutschSchnell();

    const [showQuestions, setShowQuestions] = useState(false);
    // const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [checked, setChecked] = useState(false);

    const lessonData = userLessons[lessonId];
    const userAnswers = lessonData?.answers || {};

    const correctAnswers = useMemo(() => {
        const answers: string[] = [];
        currentLesson.forEach((item: any) => {
            const matches = item.de.match(/\*\*(.*?)\*\*/g);
            if (matches) {
                matches.forEach((match: string) => {
                    answers.push(match.slice(2, -2));
                });
            }
        });
        return answers;
    }, [currentLesson]);

    const blankCounts = useMemo(() => {
        return currentLesson.map((item: any) =>
            (item.de.match(/\*\*(.*?)\*\*/g) || []).length
        );
    }, [currentLesson]);

    const handleInputChange = (index: number, value: string) => {
        // setUserAnswers(prev => ({ ...prev, [index]: value }));
        setAnswer(lessonId, `dialogue_${index}`, value);
    };

    const togglePractice = () => {
        setShowQuestions(prev => !prev);
        setChecked(false);
        // setUserAnswers({});
    };

    return (
        <div id="dialogue">
            <div className="flex flex-col gap-5 pt-10 text-xs sm:text-sm md:text-base place-content-center place-items-center">
               <Title title="Dialog" number="02" />
                <div className="flex flex-col w-full gap-2 md:px-[80px]">
                    {currentLesson.map((item: any, i: number) => {
                        const globalIndex = blankCounts.slice(0, i).reduce((a, b) => a + b, 0);
                        return (
                            <MessageBubble
                                key={i}
                                item={item}
                                isPractice={showQuestions}
                                globalIndex={showQuestions ? globalIndex : undefined}
                                userAnswers={userAnswers}
                                onInputChange={handleInputChange}
                                checked={checked}
                                correctAnswers={correctAnswers}
                            />
                        );
                    })}
                </div>
            </div>

           <div className="flex gap-10 pt-10">
             <button className="pt-5 text-sm sm:text-xl text-light-violet" onClick={togglePractice}>
                {!showQuestions ? "Practice dialog" : "Close practice mode"}
            </button>

            {showQuestions && (
                <Button onClick={() => setChecked(true)} className="px-4 py-2 text-white  bg-light-violet hover:bg-dark-violet">
                    Check Your Answers
                </Button>
            )}
           </div>
        </div>
    );
}