'use client';

import { ProfileForm } from '@/components/profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MainHeader } from '@/components/main-header';
import { useAlerts, mockLoggedInUser } from '@/contexts/AlertsContext';
import { AlertsGrid } from '@/components/alerts-grid';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { getUserAlerts } = useAlerts();
  const userAlerts = getUserAlerts(mockLoggedInUser.id);

  return (
    <>
        <MainHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8">
            <div className="mx-auto w-full max-w-4xl space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>
                    Manage your account details and community settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>

              <Separator />

              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">My Reported Issues</h2>
                {userAlerts.length > 0 ? (
                  <AlertsGrid alerts={userAlerts} />
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      You haven't reported any issues yet.
                    </CardContent>
                  </Card>
                )}
              </div>

            </div>
        </main>
    </>
  );
}
