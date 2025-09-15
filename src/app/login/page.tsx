import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-full max-w-sm gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold font-headline">Welcome</h1>
          <p className="text-balance text-muted-foreground">
            Login or create an account to join your community
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
