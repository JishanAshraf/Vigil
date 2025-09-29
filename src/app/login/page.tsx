
import { LoginForm } from '@/components/login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <>
        <div className="flex-1 flex items-center justify-center">
             <div className="text-center">
                <Logo className="w-auto h-24 text-primary mx-auto" />
                <p className="mt-4 text-muted-foreground">See it, post it, resolve it. Together.</p>
            </div>
        </div>
        <LoginForm />
        <div className="flex-1" />
    </>
  );
}
