
import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <div className="mx-auto grid w-full max-w-sm gap-6">
        <Card>
          <CardHeader>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold font-headline">Welcome</h1>
              <p className="text-balance text-muted-foreground">
                Login or create an account to join your community
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
