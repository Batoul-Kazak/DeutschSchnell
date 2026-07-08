import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Quiz({quizId: propQuizId, courseId: propCourseId}) {
  const navigate = useNavigate();
  const params = useParams<{ courseId: string, quizId: string }>();

  const quizId = propQuizId || params.quizId;
  const courseId = propCourseId || params.courseId;

  return (
    <div>
        Test {quizId} for Course {courseId}
        <button onClick={() => navigate("/")}>Go to home</button>
    </div>
  )
}
