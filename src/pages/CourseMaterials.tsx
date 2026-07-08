import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- Types ---
interface Lesson {
  id: number;
  title: string;
  type: 'lesson';
}

interface PracticeTest {
  id: number;
  title: string;
  type: 'test';
}

type Material = Lesson | PracticeTest;

interface PositionedItem extends Material {
  x: number;
  y: number;
}

const CourseMaterials: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  // Sample data - replace with actual API call
  const materials: Material[] = useMemo(() => [
    { id: 1, title: 'Introduction', type: 'lesson' },
    { id: 2, title: 'Basics Quiz', type: 'test' },
    { id: 3, title: 'Core Concepts', type: 'lesson' },
    { id: 4, title: 'Practice Test 1', type: 'test' },
    { id: 5, title: 'Advanced Topics', type: 'lesson' },
    { id: 6, title: 'Mid-term Test', type: 'test' },
    { id: 7, title: 'Case Studies', type: 'lesson' },
    { id: 8, title: 'Final Review', type: 'lesson' },
    { id: 9, title: 'Practice Test 2', type: 'test' },
    { id: 10, title: 'Project Work', type: 'lesson' },
  ], []);

  // --- Random Walk Algorithm with Collision Detection ---
  const positionedItems = useMemo(() => {
    const items: PositionedItem[] = [];
    
    // Configuration
    const startX = 150;
    const startY = 150;
    const minDistance = 100; // Minimum distance between nodes
    const maxDistance = 180; // Maximum distance between nodes
    const minGap = 90;      // Minimum gap to prevent overlap/crowding
    const maxAttempts = 100; // Max tries to find a valid spot before giving up
    
    let currentX = startX;
    let currentY = startY;

    materials.forEach((item, index) => {
      if (index === 0) {
        // Place first item at start
        items.push({ ...item, x: currentX, y: currentY });
      } else {
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < maxAttempts) {
          attempts++;
          
          // 1. Generate random angle and distance
          const angle = Math.random() * Math.PI * 2; // Full 360 degrees
          const distance = minDistance + Math.random() * (maxDistance - minDistance);
          
          // 2. Calculate candidate position
          const candidateX = currentX + Math.cos(angle) * distance;
          const candidateY = currentY + Math.sin(angle) * distance;
          
          // 3. Check collision with ALL previously placed items
          let hasCollision = false;
          for (const existing of items) {
            const dx = candidateX - existing.x;
            const dy = candidateY - existing.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < minGap) {
              hasCollision = true;
              break;
            }
          }
          
          // 4. Optional: Keep within bounds (prevent going off-screen)
          const inBounds = candidateX > 50 && candidateX < 750 && 
                          candidateY > 50 && candidateY < 550;
          
          if (!hasCollision && inBounds) {
            // Valid position found!
            currentX = candidateX;
            currentY = candidateY;
            items.push({ ...item, x: currentX, y: currentY });
            placed = true;
          }
        }
        
        // Fallback: If we couldn't find a spot after max attempts,
        // just place it nearby the last one (might overlap slightly)
        if (!placed) {
          const fallbackAngle = Math.random() * Math.PI * 2;
          currentX += Math.cos(fallbackAngle) * minDistance;
          currentY += Math.sin(fallbackAngle) * minDistance;
          items.push({ ...item, x: currentX, y: currentY });
        }
      }
    });

    return items;
  }, [materials]);

  const handleFinalClick = () => {
    if (courseId) {
      navigate(`/tests/${encodeURIComponent(courseId)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {courseId ? decodeURIComponent(courseId) : 'Course'} Map
        </h1>
        <p className="text-gray-600 mb-8">
          Explore the course path randomly
        </p>

        {/* Map Container */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 h-[600px] w-full overflow-hidden">
          
          {/* SVG Layer for Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <path 
              d={positionedItems.map((item, i) => 
                `${i === 0 ? 'M' : 'L'} ${item.x} ${item.y}`
              ).join(' ')}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 6"
            />
          </svg>

          {/* Nodes Layer */}
          {positionedItems.map((item) => (
            <div
              key={item.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10 group"
              style={{ left: `${item.x}px`, top: `${item.y}px` }}
            >
              <div className={`
                flex items-center justify-center text-white font-bold text-lg shadow-md
                ${item.type === 'lesson' 
                  ? 'w-14 h-14 bg-blue-500 rounded-lg hover:bg-blue-600' 
                  : 'w-14 h-14 bg-orange-500 rounded-full hover:bg-orange-600'
                }
              `}>
                {item.id}
              </div>
              
              {/* Hover Label */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                  {item.title}
                </div>
              </div>
            </div>
          ))}

          {/* Final Triangle */}
          {positionedItems.length > 0 && (
            <div
              className="absolute z-20 cursor-pointer transition-all duration-300 hover:scale-110 group"
              style={{
                left: `${positionedItems[positionedItems.length - 1].x}px`,
                top: `${positionedItems[positionedItems.length - 1].y + 50}px`,
                transform: 'translateX(-50%)'
              }}
              onClick={handleFinalClick}
            >
               <div className="flex flex-col items-center">
                  <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[30px] border-b-red-500 drop-shadow-md group-hover:border-b-red-600" />
                  <span className="mt-2 text-xs font-bold text-red-600 bg-white px-2 py-1 rounded shadow-sm border border-red-100">
                    Final Exam
                  </span>
               </div>
            </div>
          )}

        </div>

        {/* Legend */}
        <div className="mt-6 flex gap-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded shadow-sm" />
            <span className="text-sm text-gray-700">Lesson</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-orange-500 rounded-full shadow-sm" />
            <span className="text-sm text-gray-700">Practice Test</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-red-500" />
            <span className="text-sm text-gray-700">Final Exam</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMaterials;


// import React, { useMemo, useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// // --- Types ---
// interface Lesson { id: number; title: string; type: 'lesson'; }
// interface PracticeTest { id: number; title: string; type: 'test'; }
// type Material = Lesson | PracticeTest;

// interface PositionedItem extends Material {
//   xPct: number; // Percentage 0-100
//   yPct: number; // Percentage 0-100
// }

// const CourseMaterials: React.FC = () => {
//   const navigate = useNavigate();
//   const { courseId } = useParams<{ courseId: string }>();
  
//   // Track viewport aspect ratio for dynamic bounds
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkSize = () => setIsMobile(window.innerWidth < 768);
//     checkSize();
//     window.addEventListener('resize', checkSize);
//     return () => window.removeEventListener('resize', checkSize);
//   }, []);

//   const materials: Material[] = useMemo(() => [
//     { id: 1, title: 'Introduction', type: 'lesson' },
//     { id: 2, title: 'Basics Quiz', type: 'test' },
//     { id: 3, title: 'Core Concepts', type: 'lesson' },
//     { id: 4, title: 'Practice Test 1', type: 'test' },
//     { id: 5, title: 'Advanced Topics', type: 'lesson' },
//     { id: 6, title: 'Mid-term Test', type: 'test' },
//     { id: 7, title: 'Case Studies', type: 'lesson' },
//     { id: 8, title: 'Final Review', type: 'lesson' },
//     { id: 9, title: 'Practice Test 2', type: 'test' },
//     { id: 10, title: 'Project Work', type: 'lesson' },
//   ], []);

//   // --- Responsive Random Walk Algorithm ---
//   const positionedItems = useMemo(() => {
//     const items: PositionedItem[] = [];
    
//     // DYNAMIC BOUNDS BASED ON SCREEN SIZE
//     // Mobile: Narrow width (15-85%), Tall height (10-90%)
//     // Desktop: Wide width (10-90%), Shorter height (15-85%)
//     const minX = isMobile ? 15 : 10;
//     const maxX = isMobile ? 85 : 90;
//     const minY = isMobile ? 10 : 15;
//     const maxY = isMobile ? 90 : 85;
    
//     // Convert percentage bounds to pixel-like units for calculation
//     // We use a virtual 1000x1000 coordinate space, then convert to % at the end
//     const VIRTUAL_SIZE = 1000;
//     const vMinX = minX * 10;
//     const vMaxX = maxX * 10;
//     const vMinY = minY * 10;
//     const vMaxY = maxY * 10;

//     // ADAPTIVE SPACING
//     // Mobile needs tighter spacing due to limited screen real estate
//     const minDist = isMobile ? 80 : 120;
//     const maxDist = isMobile ? 140 : 200;
//     const minGap = isMobile ? 70 : 90;
    
//     let curX = (minX + maxX) / 2 * 10; // Start in center
//     let curY = minY * 10 + 50;          // Start near top

//     materials.forEach((item, index) => {
//       if (index === 0) {
//         items.push({ 
//           ...item, 
//           xPct: curX / 10, 
//           yPct: curY / 10 
//         });
//       } else {
//         let placed = false;
//         let attempts = 0;
        
//         while (!placed && attempts < 150) {
//           attempts++;
//           const angle = Math.random() * Math.PI * 2;
//           const dist = minDist + Math.random() * (maxDist - minDist);
          
//           const candX = curX + Math.cos(angle) * dist;
//           const candY = curY + Math.sin(angle) * dist;
          
//           // Collision check in virtual space
//           let collision = false;
//           for (const existing of items) {
//             const ex = existing.xPct * 10;
//             const ey = existing.yPct * 10;
//             const dx = candX - ex;
//             const dy = candY - ey;
//             if (Math.sqrt(dx*dx + dy*dy) < minGap) {
//               collision = true;
//               break;
//             }
//           }
          
//           const inBounds = candX > vMinX && candX < vMaxX && 
//                           candY > vMinY && candY < vMaxY;
          
//           if (!collision && inBounds) {
//             curX = candX;
//             curY = candY;
//             items.push({ 
//               ...item, 
//               xPct: curX / 10, 
//               yPct: curY / 10 
//             });
//             placed = true;
//           }
//         }
        
//         // Fallback: place relative to last item but clamped to bounds
//         if (!placed) {
//           const fallbackAngle = Math.random() * Math.PI * 2;
//           curX += Math.cos(fallbackAngle) * (minDist * 0.7);
//           curY += Math.sin(fallbackAngle) * (minDist * 0.7);
//           // Clamp to bounds
//           curX = Math.max(vMinX, Math.min(vMaxX, curX));
//           curY = Math.max(vMinY, Math.min(vMaxY, curY));
//           items.push({ 
//             ...item, 
//             xPct: curX / 10, 
//             yPct: curY / 10 
//           });
//         }
//       }
//     });

//     return items;
//   }, [materials, isMobile]);

//   const handleFinalClick = () => {
//     if (courseId) navigate(`/tests/${encodeURIComponent(courseId)}`);
//   };

//   // RESPONSIVE SIZING CLASSES
//   const nodeSize = isMobile ? 'w-12 h-12 text-base' : 'w-14 h-14 text-lg';
//   const triangleSize = isMobile 
//     ? 'border-l-[14px] border-r-[14px] border-b-[24px]' 
//     : 'border-l-[18px] border-r-[18px] border-b-[30px]';
//   const strokeWidth = isMobile ? 2 : 3;
//   const dashArray = isMobile ? '5 4' : '8 6';

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8 overflow-hidden">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//           {courseId ? decodeURIComponent(courseId) : 'Course'} Map
//         </h1>
//         <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-8">
//           Explore the course path
//         </p>

//         {/* Map Container - Fixed aspect ratio handling */}
//         <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 
//                         w-full overflow-hidden"
//              style={{ aspectRatio: isMobile ? '3/4' : '4/3', minHeight: isMobile ? '500px' : '600px' }}>
          
//           {/* SVG Layer */}
//           <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
//             <path 
//               d={positionedItems.map((item, i) => 
//                 `${i === 0 ? 'M' : 'L'} ${item.xPct}% ${item.yPct}%`
//               ).join(' ')}
//               fill="none"
//               stroke="#cbd5e1" 
//               strokeWidth={strokeWidth}
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeDasharray={dashArray}
//             />
//           </svg>

//           {/* Nodes - Using percentages for position */}
//           {positionedItems.map((item) => (
//             <div
//               key={item.id}
//               className="absolute transform -translate-x-1/2 -translate-y-1/2 
//                          cursor-pointer transition-all duration-300 hover:scale-110 z-10 group"
//               style={{ left: `${item.xPct}%`, top: `${item.yPct}%` }}
//             >
//               {/* Touch-friendly wrapper for mobile */}
//               <div className={`flex items-center justify-center text-white font-bold 
//                                shadow-md ${nodeSize}
//                 ${item.type === 'lesson' 
//                   ? 'bg-blue-500 rounded-lg hover:bg-blue-600' 
//                   : 'bg-orange-500 rounded-full hover:bg-orange-600'}
//               `}>
//                 {item.id}
//               </div>
              
//               {/* Larger touch target overlay on mobile */}
//               {isMobile && (
//                 <div className="absolute inset-[-12px] z-[-1]" />
//               )}
              
//               {/* Hover Label - Always visible on mobile tap */}
//               <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
//                                whitespace-nowrap z-20
//                                ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
//                                transition-opacity duration-200 pointer-events-none`}>
//                 <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
//                   {item.title}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Final Triangle */}
//           {positionedItems.length > 0 && (
//             <div
//               className="absolute z-20 cursor-pointer transition-all duration-300 hover:scale-110 group"
//               style={{
//                 left: `${positionedItems[positionedItems.length - 1].xPct}%`,
//                 top: `${positionedItems[positionedItems.length - 1].yPct + (isMobile ? 8 : 6)}%`,
//                 transform: 'translateX(-50%)'
//               }}
//               onClick={handleFinalClick}
//             >
//                <div className="flex flex-col items-center">
//                   <div className={`w-0 h-0 border-l-transparent border-r-transparent 
//                                    border-b-red-500 drop-shadow-md 
//                                    group-hover:border-b-red-600 ${triangleSize}`} />
//                   <span className={`mt-2 font-bold text-red-600 bg-white px-2 py-1 
//                                     rounded shadow-sm border border-red-100
//                                     ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
//                     Final Exam
//                   </span>
//                </div>
//             </div>
//           )}
//         </div>

//         {/* Responsive Legend */}
//         <div className="mt-4 md:mt-6 flex flex-wrap gap-4 md:gap-6 justify-center">
//           <div className="flex items-center gap-2">
//             <div className={`bg-blue-500 rounded shadow-sm ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
//             <span className="text-xs md:text-sm text-gray-700">Lesson</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className={`bg-orange-500 rounded-full shadow-sm ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
//             <span className="text-xs md:text-sm text-gray-700">Practice Test</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className={`w-0 h-0 border-l-transparent border-r-transparent border-b-red-500
//                              ${isMobile ? 'border-l-[5px] border-r-[5px] border-b-[9px]' 
//                                         : 'border-l-[7px] border-r-[7px] border-b-[12px]'}`} />
//             <span className="text-xs md:text-sm text-gray-700">Final Exam</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseMaterials;