
'use client';

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { addDoc, collection, serverTimestamp, query, orderBy, doc, deleteDoc as fbDeleteDoc, runTransaction, updateDoc, arrayUnion } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

import type { Alert, User, Comment } from '@/lib/types';
import { useAuth } from './AuthContext';
import { firestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface AlertsContextType {
  alerts: Alert[];
  addAlert: (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status' | 'reporters'>) => void;
  getUserAlerts: (userId: string) => Alert[];
  deleteAlert: (alertId: string) => void;
  toggleReport: (alertId: string) => void;
  currentUser: User | null;
  addComment: (alertId: string, text: string) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const { user: authUser } = useAuth();
  
  const alertsQuery = useMemo(() => {
    return query(collection(firestore, 'alerts'), orderBy('timestamp', 'desc'));
  }, []);

  const { data: rawAlerts } = useCollection<Omit<Alert, 'timestamp'> & { timestamp: any }>(alertsQuery);

  const alerts = useMemo(() => {
    if (!rawAlerts) return [];
    return rawAlerts.map(alert => ({
        ...alert,
        timestamp: alert.timestamp ? formatDistanceToNow(alert.timestamp.toDate(), { addSuffix: true }) : 'just now',
        comments: alert.comments.map(comment => ({
            ...comment,
            timestamp: comment.timestamp ? formatDistanceToNow(new Date(comment.timestamp), {addSuffix: true}) : 'just now'
        }))
    }));
  }, [rawAlerts]);

  const currentUser: User | null = authUser ? { id: authUser.uid, name: authUser.name, avatarUrl: authUser.avatarUrl } : null;

  const addAlert = (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status' | 'reporters'>) => {
    if (!currentUser) {
        console.error("User must be logged in to add an alert.");
        return;
    }

    const alertData = {
      ...newAlertData,
      user: currentUser,
      timestamp: serverTimestamp(),
      comments: [],
      status: 'Reported',
      reporters: [],
    };
    
    addDoc(collection(firestore, 'alerts'), alertData).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: 'alerts',
        operation: 'create',
        requestResourceData: alertData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const deleteAlert = (alertId: string) => {
    const alertDocRef = doc(firestore, "alerts", alertId);
    fbDeleteDoc(alertDocRef).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: alertDocRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  };
  
  const toggleReport = (alertId: string) => {
    if (!currentUser) return;
    const alertDocRef = doc(firestore, 'alerts', alertId);

    runTransaction(firestore, async (transaction) => {
      const alertDoc = await transaction.get(alertDocRef);
      if (!alertDoc.exists()) {
        throw "Document does not exist!";
      }

      const currentReporters = alertDoc.data().reporters as User[];
      const isReported = currentReporters.some(reporter => reporter.id === currentUser.id);

      let newReporters: User[];
      if (isReported) {
        newReporters = currentReporters.filter(reporter => reporter.id !== currentUser.id);
      } else {
        const reporterData: User = { id: currentUser.id, name: currentUser.name, avatarUrl: currentUser.avatarUrl };
        newReporters = [...currentReporters, reporterData];
      }
      transaction.update(alertDocRef, { reporters: newReporters });
    }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: alertDocRef.path,
          operation: 'update',
          requestResourceData: { reporters: '...' }
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  };

  const addComment = (alertId: string, text: string) => {
    if (!currentUser) return;

    const newComment: Omit<Comment, 'timestamp'> & { timestamp: string } = {
        id: `comment-${Date.now()}`,
        user: currentUser,
        timestamp: new Date().toISOString(),
        text: text,
    };
    
    const alertDocRef = doc(firestore, 'alerts', alertId);
    
    updateDoc(alertDocRef, { comments: arrayUnion(newComment) }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: alertDocRef.path,
          operation: 'update',
          requestResourceData: { comments: '...' },
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  }


  const getUserAlerts = (userId: string) => {
    return alerts.filter(alert => alert.user.id === userId && !alert.isAnonymous);
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, getUserAlerts, deleteAlert, toggleReport, currentUser, addComment }}>
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};
