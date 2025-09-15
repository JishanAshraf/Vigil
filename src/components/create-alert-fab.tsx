import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CreateAlertFab() {
  return (
    <Button
      asChild
      className="fixed bottom-24 right-4 z-40 h-16 w-16 rounded-full shadow-lg md:bottom-8 md:right-8"
    >
      <Link href="/report-issue">
        <Plus className="h-8 w-8" />
        <span className="sr-only">Report New Issue</span>
      </Link>
    </Button>
  );
}
