import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingTest from '../Test/components/LoadingTest';
import NotFound from '../NotFound';
import { useParams } from 'react-router-dom';

interface ReadingQuestion {
  id: number;
  type: 'reading';
  question: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface FlashcardQuestion {
  id: number;
  type: 'flashcard';
  front: string;
  back: string;
  example: string;
}

interface MatchingPair {
  left: string;
  right: string;
}

interface MatchingQuestion {
  id: number;
  type: 'matching';
  instruction: string;
  pairs: MatchingPair[];
}

interface FillBlankQuestion {
  id: number;
  type: 'fillBlank';
  sentence: string;
  answer: string;
  hint: string;
}

interface WritingQuestion {
  id: number;
  type: 'writing';
  prompt: string;
  expectedLength: { min: number; max: number };
  rubric: string[];
}

type Question = ReadingQuestion | FlashcardQuestion | MatchingQuestion | FillBlankQuestion | WritingQuestion;

interface QuizData {
  quizTitle: string;
  course: string;
  questions: Question[];
}



export default function Quiz({ course = 'A1', quizId : propQuizId }: { course?: string; quizId?: string }) {
  const params = useParams<{courseId: string, itemId: string}>();
  const quizId = propQuizId || params.itemId || 'q1';
  const fileNum = quizId?.replace('q', '');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFlashcardBack, setShowFlashcardBack] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<{ [key: number]: number }>({});
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [fillBlankAnswer, setFillBlankAnswer] = useState('');
  const [writingAnswer, setWritingAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

async function fetchQuiz(course: string, itemId: string): Promise<QuizData> {
  const num = itemId.replace('q', '');
  const response = await fetch(`/data/lessons/${course}/quiz${num}.json`);
  if (!response.ok) throw new Error('Failed to fetch quiz');
  return response.json();
};

  const { data, isLoading, error } = useQuery({
    queryKey: ['quiz', course, quizId],
    queryFn: () => fetchQuiz(course, quizId),
  });

  if (isLoading) return <LoadingTest level={course} />;
  if (error) return <NotFound message={`Error Loading ${course} Quiz, Page Not Found`} />;
  if (!data) return null;

  const currentQuestion = data.questions[currentQuestionIndex];
  const totalQuestions = data.questions.length;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetState();
    } else {
      setSubmitted(true);
      calculateScore();
    }
  };

  const resetState = () => {
    setSelectedAnswer(null);
    setShowFlashcardBack(false);
    setMatchedPairs({});
    setSelectedLeft(null);
    setFillBlankAnswer('');
    setWritingAnswer('');
  };

  const calculateScore = () => {
    let points = 0;
    data.questions.forEach((q, idx) => {
      if (q.type === 'reading' && selectedAnswer === q.correctAnswer) points++;
      if (q.type === 'fillBlank' && fillBlankAnswer.toLowerCase() === q.answer.toLowerCase()) points++;
    });
    setScore(points);
  };

  const renderReading = (q: ReadingQuestion) => (
    <div className="space-y-4">
      <p className="text-dark-violet font-semibold">{q.question}</p>
      <div className="bg-light-yellow p-4 rounded-lg text-dark-violet">{q.text}</div>
      <div className="space-y-2">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedAnswer(idx)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
              selectedAnswer === idx
                ? 'border-light-violet bg-light-violet text-white'
                : 'border-dark-blue hover:bg-light-blue'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const renderFlashcard = (q: FlashcardQuestion) => (
    <div className="space-y-4">
      <div
        onClick={() => setShowFlashcardBack(!showFlashcardBack)}
        className="cursor-pointer bg-dark-violet text-white p-8 rounded-lg text-center min-h-[200px] flex items-center justify-center"
      >
        {showFlashcardBack ? (
          <div>
            <p className="text-2xl mb-2">{q.back}</p>
            <p className="text-light-yellow">{q.example}</p>
          </div>
        ) : (
          <p className="text-2xl">{q.front}</p>
        )}
      </div>
      <p className="text-center text-dark-blue">Click to flip</p>
    </div>
  );

  const renderMatching = (q: MatchingQuestion) => {
    const handleLeftClick = (idx: number) => {
      if (matchedPairs[idx] !== undefined) return;
      setSelectedLeft(selectedLeft === idx ? null : idx);
    };

    const handleRightClick = (idx: number) => {
      if (selectedLeft === null) return;
      const isCorrect = q.pairs[selectedLeft].right === q.pairs[idx].right;
      if (isCorrect) {
        setMatchedPairs({ ...matchedPairs, [selectedLeft]: idx });
        setSelectedLeft(null);
      }
    };

    return (
      <div className="space-y-4">
        <p className="text-dark-violet font-semibold">{q.instruction}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {q.pairs.map((pair, idx) => (
              <button
                key={`left-${idx}`}
                onClick={() => handleLeftClick(idx)}
                disabled={matchedPairs[idx] !== undefined}
                className={`w-full p-3 rounded-lg border-2 ${
                  matchedPairs[idx] !== undefined
                    ? 'bg-light-green border-dark-green'
                    : selectedLeft === idx
                    ? 'bg-light-violet border-dark-violet text-white'
                    : 'bg-white border-dark-blue'
                }`}
              >
                {pair.left}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {q.pairs.map((pair, idx) => (
              <button
                key={`right-${idx}`}
                onClick={() => handleRightClick(idx)}
                disabled={Object.values(matchedPairs).includes(idx)}
                className={`w-full p-3 rounded-lg border-2 ${
                  Object.values(matchedPairs).includes(idx)
                    ? 'bg-light-green border-dark-green'
                    : 'bg-white border-dark-blue hover:bg-light-blue'
                }`}
              >
                {pair.right}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFillBlank = (q: FillBlankQuestion) => (
    <div className="space-y-4">
      <p className="text-dark-violet text-lg">
        {q.sentence.split('___').map((part, idx, arr) => (
          <React.Fragment key={idx}>
            {part}
            {idx < arr.length - 1 && (
              <input
                type="text"
                value={fillBlankAnswer}
                onChange={(e) => setFillBlankAnswer(e.target.value)}
                className="mx-2 px-3 py-1 border-2 border-dark-blue rounded-lg w-32 text-center"
                placeholder="..."
              />
            )}
          </React.Fragment>
        ))}
      </p>
      <p className="text-dark-blue text-sm">Hint: {q.hint}</p>
    </div>
  );

  const renderWriting = (q: WritingQuestion) => (
    <div className="space-y-4">
      <p className="text-dark-violet font-semibold">{q.prompt}</p>
      <textarea
        value={writingAnswer}
        onChange={(e) => setWritingAnswer(e.target.value)}
        className="w-full p-4 border-2 border-dark-blue rounded-lg min-h-[150px]"
        placeholder="Write your answer here..."
      />
      <div className="text-sm text-dark-blue">
        <p>Expected length: {q.expectedLength.min}-{q.expectedLength.max} characters</p>
        <p>Current length: {writingAnswer.length}</p>
      </div>
      <div className="bg-light-yellow p-3 rounded-lg">
        <p className="font-semibold text-dark-violet">Checklist:</p>
        <ul className="list-disc list-inside text-dark-violet">
          {q.rubric.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-dark-violet mb-4">Quiz Complete!</h2>
        <p className="text-lg text-dark-blue">Your score: {score}/{totalQuestions}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-light-violet text-white rounded-lg hover:bg-dark-violet"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-dark-violet mb-2">{data.quizTitle}</h2>
      <p className="text-dark-blue mb-6">Question {currentQuestionIndex + 1} of {totalQuestions}</p>

      <div className="mb-6">
        {currentQuestion.type === 'reading' && renderReading(currentQuestion as ReadingQuestion)}
        {currentQuestion.type === 'flashcard' && renderFlashcard(currentQuestion as FlashcardQuestion)}
        {currentQuestion.type === 'matching' && renderMatching(currentQuestion as MatchingQuestion)}
        {currentQuestion.type === 'fillBlank' && renderFillBlank(currentQuestion as FillBlankQuestion)}
        {currentQuestion.type === 'writing' && renderWriting(currentQuestion as WritingQuestion)}
      </div>

      <button
        onClick={handleNext}
        className="w-full px-6 py-3 bg-light-violet text-white rounded-lg hover:bg-dark-violet transition-colors"
      >
        {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
}