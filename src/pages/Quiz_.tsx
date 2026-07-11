import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

const Quiz_: React.FC<{ course: string; quizId: string }> = ({ course, quizId }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Mock data
  const questions: Question[] = [
    {
      id: 1,
      text: "How do you say 'Good morning' in German?",
      options: ["Guten Abend", "Guten Morgen", "Gute Nacht", "Hallo"],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which word means 'Thank you'?",
      options: ["Bitte", "Danke", "Entschuldigung", "Ja"],
      correctAnswer: 1
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white min-h-screen flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
        <div className="text-6xl font-bold mb-6 text-gray-900">
          {score} / {questions.length}
        </div>
        <p className="text-xl text-gray-600 mb-8">
          {score === questions.length ? "Excellent work!" : "Keep practicing!"}
        </p>
        <button 
          onClick={() => navigate(`/courses/${course}`)}
          className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          Back to Course
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col">
      {/* Quiz Header */}
      <div className="mb-8 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <div className="w-32 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">{currentQuestion.text}</h3>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
            
            if (isAnswered) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedOption) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 text-gray-400";
              }
            } else {
              buttonClass += selectedOption === index 
                ? "border-blue-500 bg-blue-50 text-blue-800" 
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <span className="font-medium">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-8 flex justify-end">
        {!isAnswered ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              selectedOption === null 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz_;