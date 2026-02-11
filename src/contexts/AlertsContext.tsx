'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Alert, User } from '@/lib/types';
import { mockAlerts } from '@/lib/mock-data';

// A mock logged-in user. In a real app, this would come from an auth context.
export const mockLoggedInUser: User = {
  id: 'user-4',
  name: 'Diana Prince',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
};

interface AlertsContextType {
  alerts: Alert[];
  addAlert: (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status'>) => void;
  getUserAlerts: (userId: string) => Alert[];
  deleteAlert: (alertId: string) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const addAlert = (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status'>) => {
    const newAlert: Alert = {
      ...newAlertData,
      id: `alert-${Date.now()}`,
      user: mockLoggedInUser,
      timestamp: 'Just now',
      comments: [],
      status: 'Reported',
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };

  const getUserAlerts = (userId: string) => {
    // Only return non-anonymous posts for the user's profile
    return alerts.filter(alert => alert.user.id === userId && !alert.isAnonymous);
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, getUserAlerts, deleteAlert }}>
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
