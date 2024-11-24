import axios from 'axios';
import { User, MedicalStudent, Consultation, Review } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  register: async (userData: Partial<User>) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};

export const students = {
  getAll: async () => {
    const { data } = await api.get<MedicalStudent[]>('/students');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get<MedicalStudent>(`/students/${id}`);
    return data;
  },
  updateProfile: async (id: string, profile: Partial<MedicalStudent>) => {
    const { data } = await api.put(`/students/${id}`, profile);
    return data;
  },
};

export const consultations = {
  create: async (consultation: Partial<Consultation>) => {
    const { data } = await api.post('/consultations', consultation);
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get<Consultation>(`/consultations/${id}`);
    return data;
  },
  getByUserId: async (userId: string) => {
    const { data } = await api.get<Consultation[]>(`/consultations/user/${userId}`);
    return data;
  },
  getByStudentId: async (studentId: string) => {
    const { data } = await api.get<Consultation[]>(`/consultations/student/${studentId}`);
    return data;
  },
  updateStatus: async (id: string, status: Consultation['status']) => {
    const { data } = await api.put(`/consultations/${id}/status`, { status });
    return data;
  },
  sendMessage: async (id: string, content: string) => {
    const { data } = await api.post(`/consultations/${id}/messages`, { content });
    return data;
  },
};

export const reviews = {
  create: async (review: Partial<Review>) => {
    const { data } = await api.post('/reviews', review);
    return data;
  },
  getByStudentId: async (studentId: string) => {
    const { data } = await api.get<Review[]>(`/reviews/student/${studentId}`);
    return data;
  },
};