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
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  initAuth: () => void;
}

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('auth-user');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse stored user:', e);
  }
  return null;
};

const storedUser = getStoredUser();

export const useAuth = create<AuthStore>((set) => ({
  user: storedUser,
  isAuthenticated: !!storedUser,
  isLoading: false,
  login: (user) => {
    localStorage.setItem('auth-user', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('auth-user');
    set({ user: null, isAuthenticated: false });
  },
  initAuth: () => {
    const user = getStoredUser();
    set({ user, isAuthenticated: !!user, isLoading: false });
  },
}));