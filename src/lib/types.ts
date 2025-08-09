export type UserRole = 'Student' | 'Staff' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  paymentStatus: 'Paid' | 'Pending';
  classIds: string[];
  role: UserRole;
}

export interface Class {
  id:string;
  name: string;
  description: string;
  teacher: string;
  schedule: string;
  studentIds: string[];
  imageUrl: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  youtubeUrl: string;
  classId: string;
}

export interface Institute {
  id: string;
  name: string;
  adminEmail: string;
}
