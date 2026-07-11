
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Lesson {
  id: number;
  title: string;
  type: 'lesson';
}

interface PracticeTest {
  id: number;
  title: string;
  type: 'quiz';
}

interface PositionedItem extends Material {
  x: number;
  y: number;
}

interface Material {
  id: string; 
  title: string;
  type: 'lesson' | 'quiz';
}

interface PositionedItem extends Material {
  x: number;
  y: number;
}

const CourseMaterials: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch manifest on mount or when courseId changes
  useEffect(() => {
    if (!courseId) return;

    const fetchMaterials = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/data/lessons/${courseId}/manifest.json`);
        if (!response.ok) throw new Error('Failed to load course data');
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error('Error loading course materials:', error);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [courseId]);

  // Random Walk Algorithm 
  const positionedItems = useMemo(() => {
    if (materials.length === 0) return [];

    const items: PositionedItem[] = [];
    const startX = 150;
    const startY = 150;
    const minDistance = 100;
    const maxDistance = 180;
    const minGap = 90;
    const maxAttempts = 100;
    
    let currentX = startX;
    let currentY = startY;

    materials.forEach((item, index) => {
      if (index === 0) {
        items.push({ ...item, x: currentX, y: currentY });
      } else {
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < maxAttempts) {
          attempts++;
          const angle = Math.random() * Math.PI * 2;
          const distance = minDistance + Math.random() * (maxDistance - minDistance);
          const candidateX = currentX + Math.cos(angle) * distance;
          const candidateY = currentY + Math.sin(angle) * distance;
          
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
          
          const inBounds = candidateX > 50 && candidateX < 750 && 
                          candidateY > 50 && candidateY < 550;
          
          if (!hasCollision && inBounds) {
            currentX = candidateX;
            currentY = candidateY;
            items.push({ ...item, x: currentX, y: currentY });
            placed = true;
          }
        }
        
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

  const handleItemClick = (item: Material) => {
    if (courseId) {
      navigate(`/courses/${encodeURIComponent(courseId)}/${item.type}/${item.id}`);
    }
  };

  function getMaterialName(id: string)
  {
    if(id.startsWith('l')) return `Lesson ${id.replace('l', '')}`;
    if(id.startsWith('q')) return `Practice Quiz ${id.replace('q', '')}`;
    return id;
  }

  const handleFinalClick = () => {
    if (courseId) {
      navigate(`/tests/${encodeURIComponent(courseId)}`);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading course map...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {courseId ? decodeURIComponent(courseId) : 'Course'} Map
        </h1>
        <p className="text-gray-600 mb-8">
          Explore the course path randomly
        </p>

        <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 h-[600px] w-full overflow-hidden">
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

          {positionedItems.map((item: PositionedItem) => (
            <div
              key={item.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10 group"
              style={{ left: `${item.x}px`, top: `${item.y}px` }}
              onClick={() => handleItemClick(item)}
            >
              <div className={`
                flex items-center justify-center text-white font-bold text-lg shadow-md
                ${item.type === 'lesson' 
                  ? 'px-4 py-3 text-[16px] bg-blue-500 rounded-lg hover:bg-blue-600' 
                  : 'px-4 py-2 text-[12px] bg-orange-500 rounded-full hover:bg-orange-600'
                }
              `}>
                {getMaterialName(item.id)}
              </div>
              
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                  {item.title}
                </div>
              </div>
            </div>
          ))}

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