export interface Student {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  paymentStatus: 'Paid' | 'Pending';
  classIds: string[];
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
