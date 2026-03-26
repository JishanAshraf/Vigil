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
  addAlert: (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status' | 'reporters'>) => void;
  getUserAlerts: (userId: string) => Alert[];
  deleteAlert: (alertId: string) => void;
  toggleReport: (alertId: string) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const addAlert = (newAlertData: Omit<Alert, 'id' | 'user' | 'timestamp' | 'comments' | 'status' | 'reporters'>) => {
    const newAlert: Alert = {
      ...newAlertData,
      id: `alert-${Date.now()}`,
      user: mockLoggedInUser,
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
    setAlerts(prevAlerts =>
      prevAlerts.map(alert => {
        if (alert.id === alertId) {
          const isReported = alert.reporters.some(reporter => reporter.id === mockLoggedInUser.id);
          if (isReported) {
            // remove user from reporters
            return { ...alert, reporters: alert.reporters.filter(reporter => reporter.id !== mockLoggedInUser.id) };
          } else {
            // add user to reporters
            return { ...alert, reporters: [...alert.reporters, mockLoggedInUser] };
          }
        }
        return alert;
      })
    );
  };


  const getUserAlerts = (userId: string) => {
    // Only return non-anonymous posts for the user's profile
    return alerts.filter(alert => alert.user.id === userId && !alert.isAnonymous);
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, getUserAlerts, deleteAlert, toggleReport }}>
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
