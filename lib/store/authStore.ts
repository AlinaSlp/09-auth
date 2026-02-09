import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setAuthenticated: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>()(set => ({
  user: null,
  isAuthenticated: false,

  setUser: user => set({ user, isAuthenticated: true }),

  setAuthenticated: user =>
    set({
      user,
      isAuthenticated: Boolean(user),
    }),

  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
