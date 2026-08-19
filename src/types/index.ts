export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  correctAnswerId: string;
  marks?: number;
}

export interface LevelData {
  timeLimitMinutes: number;
  questions: Question[];
}

export interface FeedbackRange {
  min: number;
  max: number;
  title: string;
  message: string;
}

export interface UseTestLogicProps {
  levelData: LevelData | undefined;
  level: string;
}
