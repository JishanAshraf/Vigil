
import { ReportIssueForm } from '@/components/report-issue-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MainHeader } from '@/components/main-header';

export default function ReportIssuePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
        <MainHeader />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8">
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
    </div>
  );
}
