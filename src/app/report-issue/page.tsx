
import { ReportIssueForm } from '@/components/report-issue-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportIssuePage() {
  return (
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
  );
}
