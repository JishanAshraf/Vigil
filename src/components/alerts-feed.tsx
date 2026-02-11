'use client';

import { AlertsGrid } from './alerts-grid';
import { useAlerts } from '@/contexts/AlertsContext';

export function AlertsFeed() {
  const { alerts } = useAlerts();
  return <AlertsGrid alerts={alerts} />;
}
