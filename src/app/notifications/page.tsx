
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { MainHeader } from '@/components/main-header';

export default function NotificationsPage() {
  return (
    <>
        <MainHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8">
            <div className="mx-auto w-full max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Updates on alerts you've commented on or followed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center text-center py-16">
                    <Bell className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-semibold">No new notifications</h3>
                    <p className="text-muted-foreground mt-2">
                      Check back here for updates on community alerts.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
        </main>
    </>
  );
}
