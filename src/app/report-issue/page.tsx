
'use client';

import { ReportIssueForm } from '@/components/report-issue-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MainHeader } from '@/components/main-header';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function ReportIssuePage() {
  const { firebaseUser, isLoading } = useAuth();

  if(isLoading) {
    return (
       <>
        <MainHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8">
            <div className="mx-auto w-full max-w-2xl">
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
        </main>
    </>
    )
  }

  if(!firebaseUser) {
     return (
       <>
        <MainHeader />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center pb-28 md:pb-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Please Log In</CardTitle>
                    <CardDescription>
                        You need to be logged in to report an issue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button asChild>
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/login">Sign Up</Link>
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
            <div className="mx-auto w-full max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Report a New Issue</CardTitle>
                  <CardDescription>
                    Help improve your community by reporting local issues. Please provide as much detail as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportIssueForm />
                </CardContent>
              </Card>
            </div>
        </main>
    </>
  );
}
