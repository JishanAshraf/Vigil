'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  postalCode?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const userDocRef = doc(firestore, "users", fbUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ 
              uid: fbUser.uid, 
              email: fbUser.email!, 
              name: userData.name || fbUser.displayName || 'New User',
              phone: userData.phone,
              postalCode: userData.postalCode,
              avatarUrl: userData.avatarUrl
            });
          } else {
            // If firestore doc doesn't exist, create a default profile object.
            // The profile page will allow the user to fill in the details.
            setUser({
              uid: fbUser.uid,
              name: fbUser.displayName || 'New User',
              email: fbUser.email!,
              phone: fbUser.phoneNumber || '',
              postalCode: '',
              avatarUrl: fbUser.photoURL || '',
            });
          }
        } catch (error: any) {
            console.error("Firestore Error:", error);
            // This error often means Firestore has not been enabled in the Firebase Console.
            if (error.code === 'failed-precondition' || 
                (error.message && error.message.includes('firestore service is not available')) ||
                (error.message && error.message.includes('client is offline'))) {
                 toast({
                    variant: "destructive",
                    title: "Action Required: Enable Firestore Database",
                    description: "Go to your Firebase project -> Build -> Firestore Database and click 'Create database'. This is a required step for new projects.",
                    duration: 15000,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Database Error",
                    description: `Could not retrieve your profile: ${error.message}`,
                });
            }
            // Fallback to a default user object to avoid breaking the UI
            setUser({
              uid: fbUser.uid,
              name: fbUser.displayName || 'New User',
              email: fbUser.email!,
              phone: fbUser.phoneNumber || '',
              postalCode: '',
              avatarUrl: fbUser.photoURL || '',
            });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const logout = async () => {
    await signOut(auth);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, isLoading, logout }}>
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
