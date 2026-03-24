'use client';
import { type ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { firebaseApp, auth, firestore } from '.';

export interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  return (
    <FirebaseProvider value={{ firebaseApp, auth, firestore }}>
      {children}
    </FirebaseProvider>
  );
}
