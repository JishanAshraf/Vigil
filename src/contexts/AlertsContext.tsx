'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Alert, User, Comment } from '@/lib/types';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockAlerts } from '@/lib/mock-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { collection, query, orderBy, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, getDocs, writeBatch } from 'firebase/firestore';
import { firestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { formatDistanceToNow } from 'date-fns';


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
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { user: authUser } = useAuth();
  const { toast } = useToast();

  const alertsQuery = query(collection(firestore, 'alerts'), orderBy('createdAt', 'desc'));
  const { data: serverAlerts } = useCollection<Alert>(alertsQuery);

  const currentUser: User | null = authUser ? { id: authUser.uid, name: authUser.name, avatarUrl: authUser.avatarUrl } : null;

  useEffect(() => {
    const seedDatabase = async () => {
      const alertsCollectionRef = collection(firestore, 'alerts');
      const snapshot = await getDocs(alertsCollectionRef);

      if (snapshot.empty) {
        console.log('No alerts found. Seeding database with mock data...');
        const batch = writeBatch(firestore);
        
        mockAlerts.forEach((alert, index) => {
          const { id, ...alertData } = alert;
          const alertDocRef = doc(collection(firestore, 'alerts'));

          const createdAt = new Date(Date.now() - index * 3 * 24 * 60 * 60 * 1000); 

          const commentsWithDate = alertData.comments.map((comment, commentIndex) => ({
            ...comment,
            createdAt: new Date(createdAt.getTime() + commentIndex * 60000)
          }));

          batch.set(alertDocRef, { ...alertData, comments: commentsWithDate, createdAt });
        });

        await batch.commit();
        console.log('Database seeded successfully.');
      }
    };

    seedDatabase().catch(console.error);
  }, []);

  useEffect(() => {
    if (serverAlerts) {
      const processedAlerts = serverAlerts.map(alert => ({
        ...alert,
        timestamp: alert.createdAt ? formatDistanceToNow(alert.createdAt.toDate(), { addSuffix: true }) : 'some time ago',
        comments: alert.comments.map(c => ({
          ...c,
          timestamp: c.createdAt ? formatDistanceToNow(c.createdAt.toDate(), { addSuffix: true }) : 'some time ago'
        })).sort((a,b) => a.createdAt.toMillis() - b.createdAt.toMillis())
      }));
      setAlerts(processedAlerts);
    }
  }, [serverAlerts]);

  const addAlert = async (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status' | 'reporters'>) => {
    if (!currentUser) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to add an alert.",
            action: <Button asChild variant="secondary"><Link href="/login">Login</Link></Button>
        })
        return;
    }
    const newAlert = {
      ...newAlertData,
      user: currentUser,
      comments: [],
      reporters: [],
      status: 'Reported',
      createdAt: serverTimestamp(),
      timestamp: 'just now',
    };
    try {
        const alertsCollectionRef = collection(firestore, 'alerts');
        await addDoc(alertsCollectionRef, newAlert);
    } catch (e) {
        console.error("Error adding alert: ", e);
    }
  };

  const deleteAlert = async (alertId: string) => {
    const alertDocRef = doc(firestore, 'alerts', alertId);
    try {
        await deleteDoc(alertDocRef);
    } catch(e) {
        console.error("Error deleting alert: ", e);
    }
  };
  
  const toggleReport = async (alertId: string) => {
    if (!currentUser) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to report an issue.",
            action: <Button asChild variant="secondary"><Link href="/login">Login</Link></Button>
        })
        return;
    }
    
    const alertRef = doc(firestore, 'alerts', alertId);
    const alert = alerts.find(a => a.id === alertId);
    if (!alert) return;

    const isReported = alert.reporters.some(r => r.id === currentUser.id);
    
    try {
        if (isReported) {
            const reporterToRemove = alert.reporters.find(r => r.id === currentUser.id);
            if (reporterToRemove) {
              await updateDoc(alertRef, { reporters: arrayRemove(reporterToRemove) });
            }
        } else {
            const reporterData: User = { id: currentUser.id, name: currentUser.name, avatarUrl: currentUser.avatarUrl };
            await updateDoc(alertRef, { reporters: arrayUnion(reporterData) });
        }
    } catch(e) {
        console.error("Error toggling report: ", e);
    }
  };

  const addComment = async (alertId: string, text: string) => {
    if (!currentUser) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to comment.",
            action: <Button asChild variant="secondary"><Link href="/login">Login</Link></Button>
        })
        return;
    }

    const newComment = {
        id: `comment-${Date.now()}`,
        user: currentUser,
        text: text,
        timestamp: 'just now',
        createdAt: serverTimestamp(),
    };
    
    const alertRef = doc(firestore, 'alerts', alertId);
    try {
        await updateDoc(alertRef, { comments: arrayUnion(newComment) });
    } catch (e) {
        console.error("Error adding comment: ", e);
    }
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
