
import { Alert } from '@/lib/types';
import { AlertsGrid } from './alerts-grid';
import { mockAlerts } from '@/lib/mock-data';

export function AlertsFeed() {
  const alerts: Alert[] = mockAlerts;
  return <AlertsGrid alerts={alerts} />;
}
