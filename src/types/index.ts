export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'medical_student' | 'admin';
  profileImage?: string;
}

export interface MedicalStudent extends User {
  specialization: string;
  experience: number;
  bio: string;
  availability: {
    [key: string]: TimeSlot[];
  };
  rating: number;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Consultation {
  id: string;
  userId: string;
  studentId: string;
  date: string;
  timeSlot: TimeSlot;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  topic: string;
  messages: Message[];
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface Review {
  id: string;
  consultationId: string;
  userId: string;
  studentId: string;
  rating: number;
  comment: string;
  createdAt: string;
}