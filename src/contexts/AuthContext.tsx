'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
    let docUnsubscribe: () => void = () => {};
    
    const authUnsubscribe = onAuthStateChanged(auth, (fbUser) => {
      // Clean up previous snapshot listener if it exists
      docUnsubscribe();

      setFirebaseUser(fbUser);
      if (fbUser) {
        setIsLoading(true);
        const userDocRef = doc(firestore, "users", fbUser.uid);
        
        docUnsubscribe = onSnapshot(userDocRef, 
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUser({
                uid: fbUser.uid,
                email: userData.email || fbUser.email || '',
                name: userData.name || fbUser.displayName || 'New User',
                phone: userData.phone || fbUser.phoneNumber || '',
                postalCode: userData.postalCode,
                avatarUrl: userData.avatarUrl,
              });
            } else {
              setUser({
                uid: fbUser.uid,
                name: fbUser.displayName || 'New User',
                email: fbUser.email || '',
                phone: fbUser.phoneNumber || '',
                postalCode: '',
                avatarUrl: fbUser.photoURL || `https://i.pravatar.cc/150?u=${fbUser.uid}`,
              });
            }
            setIsLoading(false);
          }, 
          (error) => {
            if (error.code === 'permission-denied') {
              const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'get',
              });
              errorEmitter.emit('permission-error', permissionError);
            } else if (
              error.code === 'failed-precondition' ||
              (error.message && error.message.includes('firestore service is not available')) ||
              (error.message && error.message.includes('client is offline'))
            ) {
              toast({
                variant: 'destructive',
                title: 'Action Required: Enable Firestore Database',
                description: "Go to your Firebase project -> Build -> Firestore Database and click 'Create database'. This is a required step for new projects.",
                duration: 15000,
              });
            } else {
              toast({
                variant: 'destructive',
                title: 'Database Error',
                description: `Could not retrieve your profile: ${error.message}`,
              });
            }
            // Fallback to a default user object to avoid breaking the UI
            setUser({
              uid: fbUser.uid,
              name: fbUser.displayName || 'New User',
              email: fbUser.email || '',
              phone: fbUser.phoneNumber || '',
              postalCode: '',
              avatarUrl: fbUser.photoURL || `https://i.pravatar.cc/150?u=${fbUser.uid}`,
            });
            setIsLoading(false);
          }
        );
      } else {
        setUser(null);
        setFirebaseUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnsubscribe();
      docUnsubscribe();
    };
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
