'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Alert, User, Comment } from '@/lib/types';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockAlerts } from '@/lib/mock-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
const ALERTS_STORAGE_KEY = 'vigil-alerts';

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { user: authUser } = useAuth();
  const { toast } = useToast();

  // Load alerts from localStorage on initial client-side render to avoid hydration errors.
  useEffect(() => {
    try {
      const savedAlerts = localStorage.getItem(ALERTS_STORAGE_KEY);
      // If we have saved alerts, use them. Otherwise, initialize with mock data.
      if (savedAlerts) {
        setAlerts(JSON.parse(savedAlerts));
      } else {
        setAlerts(mockAlerts);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      setAlerts(mockAlerts); // Fallback to mock data on error
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Save alerts to localStorage whenever they change.
  useEffect(() => {
    // Only save if alerts is not the initial empty array to avoid overwriting on first render.
    if (alerts.length > 0) {
      try {
        localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, [alerts]);


  const currentUser: User | null = authUser ? { id: authUser.uid, name: authUser.name, avatarUrl: authUser.avatarUrl } : null;

  const addAlert = (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status' | 'reporters'>) => {
    if (!currentUser) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to add an alert.",
            action: <Button asChild variant="secondary"><Link href="/login">Login</Link></Button>
        })
        return;
    }
    const newAlert: Alert = {
      id: `alert-${Date.now()}`,
      ...newAlertData,
      user: currentUser,
      timestamp: 'just now',
      comments: [],
      reporters: [],
      status: 'Reported',
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };
  
  const toggleReport = (alertId: string) => {
    if (!currentUser) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to report an issue.",
            action: <Button asChild variant="secondary"><Link href="/login">Login</Link></Button>
        })
        return;
    }
    
    setAlerts(prevAlerts => 
        prevAlerts.map(alert => {
            if (alert.id === alertId) {
                const isReported = alert.reporters.some(r => r.id === currentUser.id);
                if (isReported) {
                    return { ...alert, reporters: alert.reporters.filter(r => r.id !== currentUser.id) };
                } else {
                    const reporterData: User = { id: currentUser.id, name: currentUser.name, avatarUrl: currentUser.avatarUrl };
                    return { ...alert, reporters: [...alert.reporters, reporterData] };
                }
            }
            return alert;
        })
    );
  };

  const addComment = (alertId: string, text: string) => {
    if (!currentUser) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to comment.",
            action: <Button asChild variant="secondary"><Link href="/login">Login</Link></Button>
        })
        return;
    }

    const newComment: Comment = {
        id: `comment-${Date.now()}`,
        user: currentUser,
        text: text,
        timestamp: 'just now',
    };
    
    setAlerts(prevAlerts => 
        prevAlerts.map(alert => {
            if (alert.id === alertId) {
                return { ...alert, comments: [...alert.comments, newComment] };
            }
            return alert;
        })
    );
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
