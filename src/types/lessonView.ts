
export type Word = { de: string; en: string; category: string };
export type DialogueLine = { person: string; de: string; en: string };

export type LessonData = {
  id: string;
  course: string;
  lessonNumber: number;
  title: string;
  description: string;
  time: string;
  tags: string[];
  completed: boolean;
  prevLessonId: string | null;
  nextLessonId: string | null;
  vocabulary: Word[];
  dialogue: Array<{ person: string; phrases: Array<{ de: string; en: string }> }>;
  grammar: string;
  reading: string;
};