import { AlertsFeed } from '@/components/alerts-feed';
import { CreateAlertFab } from '@/components/create-alert-fab';

export default function Home() {
  return (
    <div className="relative h-full">
      <AlertsFeed />
      <CreateAlertFab />
    </div>
  );
}
