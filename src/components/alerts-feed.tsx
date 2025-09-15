import { mockAlerts } from '@/lib/mock-data';
import { AlertCard } from './alert-card';

export function AlertsFeed() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-24 md:pb-8">
      {mockAlerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}
