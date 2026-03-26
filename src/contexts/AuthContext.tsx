'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  postalCode?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('dummy-user-profile');
      if (storedProfile) {
        setUser(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Failed to parse user profile from localStorage", error);
      localStorage.removeItem('dummy-user-profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: UserProfile) => {
    localStorage.setItem('dummy-user-profile', JSON.stringify(userData));
    setUser(userData);
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('dummy-user-profile');
    setUser(null);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
