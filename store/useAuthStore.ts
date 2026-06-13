import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  session: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User, session: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  login: (user, session) =>
    set({
      user,
      session,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    }),

  logout: () =>
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    }),
}));
