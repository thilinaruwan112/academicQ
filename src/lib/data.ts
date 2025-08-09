import type { Student, Class, Lesson } from './types';

export const students: Student[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatarUrl: 'https://placehold.co/100x100.png', paymentStatus: 'Paid', classIds: ['c1', 'c3'] },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', avatarUrl: 'https://placehold.co/100x100.png', paymentStatus: 'Pending', classIds: ['c1', 'c2'] },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://placehold.co/100x100.png', paymentStatus: 'Paid', classIds: ['c2'] },
  { id: '4', name: 'Diana Miller', email: 'diana@example.com', avatarUrl: 'https://placehold.co/100x100.png', paymentStatus: 'Paid', classIds: ['c3'] },
  { id: '5', name: 'Ethan Davis', email: 'ethan@example.com', avatarUrl: 'https://placehold.co/100x100.png', paymentStatus: 'Pending', classIds: ['c1'] },
  { id: '6', name: 'Fiona Garcia', email: 'fiona@example.com', avatarUrl: 'https://placehold.co/100x100.png', paymentStatus: 'Paid', classIds: ['c2', 'c3'] },
];

export const classes: Class[] = [
  { id: 'c1', name: 'Introduction to Web Development', description: 'Learn the fundamentals of HTML, CSS, and JavaScript.', teacher: 'Dr. Smith', schedule: 'Mon, Wed, Fri 10:00 AM', studentIds: ['1', '2', '5'], imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'c2', name: 'Advanced React Patterns', description: 'Deep dive into React hooks, state management, and performance.', teacher: 'Prof. Jones', schedule: 'Tue, Thu 2:00 PM', studentIds: ['2', '3', '6'], imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'c3', name: 'UI/UX Design Principles', description: 'Explore the principles of user-centric design and create beautiful interfaces.', teacher: 'Ms. Taylor', schedule: 'Mon, Wed 1:00 PM', studentIds: ['1', '4', '6'], imageUrl: 'https://placehold.co/600x400.png' },
];

export const lessons: Lesson[] = [
  { id: 'l1', classId: 'c1', title: 'Lesson 1: The Basics of HTML', description: 'An introduction to HTML tags and document structure.', videoUrl: 'placeholder', youtubeUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg' },
  { id: 'l2', classId: 'c1', title: 'Lesson 2: Styling with CSS', description: 'Learn how to use CSS to style your web pages.', videoUrl: 'placeholder', youtubeUrl: 'https://www.youtube.com/embed/OEV8gMkCHXQ' },
  { id: 'l3', classId: 'c2', title: 'Lesson 1: Understanding Hooks', description: 'A deep dive into useState and useEffect.', videoUrl: 'placeholder', youtubeUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q' },
  { id: 'l4', classId: 'c2', title: 'Lesson 2: State Management with Context', description: 'How to manage global state with the Context API.', videoUrl: 'placeholder', youtubeUrl: 'https://www.youtube.com/embed/5LrDIWkK_Bc' },
  { id: 'l5', classId: 'c3', title: 'Lesson 1: The Principles of Design', description: 'Learn about color theory, typography, and layout.', videoUrl: 'placeholder', youtubeUrl: 'https://www.youtube.com/embed/s_i_FPx9k-Q' },
  { id: 'l6', classId: 'c3', title: 'Lesson 2: Prototyping in Figma', description: 'A hands-on guide to creating interactive prototypes.', videoUrl: 'placeholder', youtubeUrl: 'https://www.youtube.com/embed/5i_h5gS7M4I' },
];
