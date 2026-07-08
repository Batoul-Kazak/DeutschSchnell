import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
import LessonView from "../LessonView";

const CourseContent = () => {
  const { courseId, contentId } = useParams<{ 
    courseId: string; 
    contentId: string 
  }>();

  // Prefix-based dispatch - works for BOTH map clicks and direct URLs
  if (contentId.startsWith('Q')) 
    return <Quiz quizId={contentId} courseId={courseId} />;
  
  if (contentId.startsWith('T')) 
    return <LessonView lessonId={contentId} courseId={courseId} />;
  
  // Default: treat as lesson (L-prefixed or bare IDs)
  return <LessonView lessonId={contentId} courseId={courseId} />;
};

export default CourseContent;