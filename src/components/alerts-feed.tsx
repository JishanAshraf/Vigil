
'use client';

import { useEffect, useState } from 'react';
import { Alert } from '@/lib/types';
import { AlertsGrid } from './alerts-grid';
import { mockAlerts } from '@/lib/mock-data';

export function AlertsFeed() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the component only renders on the client, preventing hydration mismatch
    setIsClient(true);
    setAlerts(mockAlerts);
  }, []);

  if (!isClient) {
    // You can render a skeleton loader here if you want
    return null;
  }

  return <AlertsGrid alerts={alerts} />;
}
