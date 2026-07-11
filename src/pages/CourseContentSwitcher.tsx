import React from 'react';
import { useParams } from 'react-router-dom';
import Quiz from './LessonComponents/Quiz';
import LessonView from './LessonView';


const CourseContentSwitcher: React.FC = () => {
  const { courseId, type, itemId } = useParams<{ courseId: string; type: string; itemId: string }>();

  if (!courseId || !itemId || !type) return <div>Loading...</div>;

  const itemNumber = parseInt(itemId, 10);

  if (type === 'quiz') {
    return <Quiz course={courseId} quizId={itemId} />;
  } else {

    return <LessonView courseId={courseId} lessonId={itemId} />;
  }
};

export default CourseContentSwitcher;