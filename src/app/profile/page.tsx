'use client';

import { useState } from 'react';
import { ProfileForm } from '@/components/profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MainHeader } from '@/components/main-header';
import { useAlerts } from '@/contexts/AlertsContext';
import { AlertsGrid } from '@/components/alerts-grid';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { sendEmailVerification } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { MailCheck } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading, firebaseUser } = useAuth();
  const { getUserAlerts, currentUser } = useAlerts();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  
  const userAlerts = currentUser ? getUserAlerts(currentUser.id) : [];

  const handleResendVerification = async () => {
    if (firebaseUser) {
      setIsSending(true);
      try {
        await sendEmailVerification(firebaseUser);
        toast({
          title: "Verification Email Sent",
          description: "A new verification link has been sent to your inbox. Please check your email.",
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Failed to Send Email",
          description: error.message || "An unexpected error occurred.",
        });
      } finally {
        setIsSending(false);
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <MainHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8">
          <div className="mx-auto w-full max-w-4xl space-y-8">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-72" />
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="flex-1 space-y-2">
                       <Skeleton className="h-6 w-1/4" />
                       <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  if (!firebaseUser || !user) {
    return (
       <>
        <MainHeader />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center pb-28 md:pb-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Please Log In</CardTitle>
                    <CardDescription>
                        You need to be logged in to view your profile and interact with the app.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button asChild>
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
      </>
    )
  }

  return (
    <>
        <MainHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8">
            <div className="mx-auto w-full max-w-4xl space-y-8">
              {firebaseUser && !firebaseUser.emailVerified && (
                  <Alert variant="destructive">
                    <AlertTitle>Email Not Verified</AlertTitle>
                    <AlertDescription className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <span>Your email address has not been verified. Please check your inbox.</span>
                      <Button onClick={handleResendVerification} variant="secondary" size="sm" disabled={isSending}>
                        <MailCheck className="mr-2 h-4 w-4" />
                        {isSending ? "Sending..." : "Re-send Email"}
                      </Button>
                    </AlertDescription>
                  </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>
                    Manage your account details and community settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm profileData={user} />
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
