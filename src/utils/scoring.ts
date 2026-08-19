// import { scoreFeedback } from "../constants/scoreFeedback";
// import { Question } from "../types";

// export const getResult = (
//   selectedAnswers: Record<string, string>,
//   questions: Question[] | undefined
// ) => {
//   if (!questions) {
//     return { score: 0, earned: 0, total: 0 };
//   }

//   let totalMarks = 0;
//   let earnedMarks = 0;

//   questions.forEach((q) => {
//     const qMarks = q.marks ?? 1;
//     totalMarks += qMarks;
//     if (selectedAnswers[q.id] === q.correctAnswerId) {
//       earnedMarks += qMarks;
//     }
//   });

//   const score =
//     totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;
//   return { score, earned: earnedMarks, total: totalMarks };
// };

// export const getFeedback = (score: number) => {
//   return (
//     scoreFeedback.find((range) => score >= range.min && score <= range.max) ||
//     scoreFeedback[0]
//   );
// };
