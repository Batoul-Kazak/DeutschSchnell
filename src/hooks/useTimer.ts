// import { useState, useEffect } from "react";

// export const useTimer = (initialMinutes: number, onFinish: () => void) => {
//   const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           onFinish();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, onFinish]);

//   return timeLeft;
// };
