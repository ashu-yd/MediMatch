import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { auth } from '../lib/api';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email, password) => {
        const { user, token } = await auth.login(email, password);
        localStorage.setItem('token', token);
        set({ isAuthenticated: true, user, token });
      },
      register: async (userData) => {
        const { user, token } = await auth.register(userData);
        localStorage.setItem('token', token);
        set({ isAuthenticated: true, user, token });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false, user: null, token: null });
      },
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
);