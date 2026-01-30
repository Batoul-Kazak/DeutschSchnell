
type Lesson = {
  type: 'lesson';
  title: string;
  id: string;
  level: string;
  excerpt: string;
};

type Event = {
  type: 'event';
  title: string;
  excerpt: string;
};

type Instructor = {
  type: 'instructor';
  name: string;
  role: string;
};

type Page = {
  type: 'page';
  title: string;
  route: string;
  excerpt: string;
};

export type SearchItem = Lesson | Event | Instructor | Page;

export const searchData: SearchItem[] = [
  {
    type: 'lesson',
    title: 'Lesson 1: Greetings',
    id: 'greetings',
    level: 'A1',
    excerpt: 'Learn hello, introduce yourself',
  },
  {
    type: 'lesson',
    title: 'Lesson 2: Numbers',
    id: 'numbers',
    level: 'A1',
    excerpt: 'Count from 0 to 100',
  },
  {
    type: 'event',
    title: 'Speaking for Travelling',
    excerpt: 'Practice real travel dialogues',
  },
  {
    type: 'instructor',
    name: 'Sphina Rose',
    role: 'Academic German Expert',
  },
  {
    type: 'page',
    title: 'Take a Placement Test',
    route: '/tests',
    excerpt: 'Find your German level with our free test',
  },
];