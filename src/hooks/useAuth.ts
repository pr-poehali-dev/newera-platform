import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => {
    localStorage.setItem('auth-user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('auth-user');
    set({ user: null, isAuthenticated: false });
  },
}));