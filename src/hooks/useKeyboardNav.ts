// import { useEffect } from "react";

// interface NavProps {
//   totalAnswers: number;
//   onNext: () => void;
//   onPrev: () => void;
//   onSelect: (id: string) => void;
//   onSubmit: () => void;
//   canSubmit: boolean;
//   answerRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
// }

// export const useKeyboardNav = ({
//   totalAnswers,
//   onNext,
//   onPrev,
//   onSelect,
//   onSubmit,
//   canSubmit,
//   answerRefs,
// }: NavProps) => {
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       const activeEl = document.activeElement;
//       const isAnswerButton = answerRefs.current.includes(
//         activeEl as HTMLButtonElement
//       );

//       if (e.key === "ArrowUp" || e.key === "ArrowDown") {
//         e.preventDefault();
//         const currentIndex = answerRefs.current.findIndex(
//           (ref) => ref === activeEl
//         );
//         let nextIndex =
//           e.key === "ArrowDown"
//             ? (currentIndex + 1) % totalAnswers
//             : (currentIndex - 1 + totalAnswers) % totalAnswers;

//         if (currentIndex === -1)
//           nextIndex = e.key === "ArrowDown" ? 0 : totalAnswers - 1;

//         answerRefs.current[nextIndex]?.focus();
//       }

//       if ((e.key === "Enter" || e.key === " ") && isAnswerButton) {
//         e.preventDefault();
//         const answerId = (activeEl as HTMLElement).getAttribute(
//           "data-answer-id"
//         );
//         if (answerId) onSelect(answerId);
//       }

//       if (e.key === "ArrowLeft") {
//         e.preventDefault();
//         onPrev();
//       } else if (e.key === "ArrowRight" && canSubmit) {
//         e.preventDefault();
//         onNext();
//       }

//       if (e.key === "Enter" && canSubmit) {
//         e.preventDefault();
//         onSubmit();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [totalAnswers, onNext, onPrev, onSelect, onSubmit, canSubmit, answerRefs]);
// };
