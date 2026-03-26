'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Alert, User } from '@/lib/types';
import { mockAlerts } from '@/lib/mock-data';
import { useAuth } from './AuthContext';

interface AlertsContextType {
  alerts: Alert[];
  addAlert: (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status' | 'reporters'>) => void;
  getUserAlerts: (userId: string) => Alert[];
  deleteAlert: (alertId: string) => void;
  toggleReport: (alertId: string) => void;
  currentUser: User | null;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const { user: authUser } = useAuth();

  const currentUser: User | null = authUser ? { id: authUser.email, name: authUser.name, avatarUrl: authUser.avatarUrl } : null;

  const addAlert = (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status' | 'reporters'>) => {
    if (!currentUser) {
        console.error("User must be logged in to add an alert.");
        return;
    }
    const newAlert: Alert = {
      ...newAlertData,
      id: `alert-${Date.now()}`,
      user: currentUser,
      timestamp: 'Just now',
      comments: [],
      status: 'Reported',
      reporters: [],
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };
  
  const toggleReport = (alertId: string) => {
    if (!currentUser) return;
    setAlerts(prevAlerts =>
      prevAlerts.map(alert => {
        if (alert.id === alertId) {
          const isReported = alert.reporters.some(reporter => reporter.id === currentUser.id);
          if (isReported) {
            return { ...alert, reporters: alert.reporters.filter(reporter => reporter.id !== currentUser.id) };
          } else {
            return { ...alert, reporters: [...alert.reporters, currentUser] };
          }
        }
        return alert;
      })
    );
  };


  const getUserAlerts = (userId: string) => {
    return alerts.filter(alert => alert.user.id === userId && !alert.isAnonymous);
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, getUserAlerts, deleteAlert, toggleReport, currentUser }}>
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
