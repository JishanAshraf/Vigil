
import { LoginForm } from '@/components/login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
        <div className="flex-1 flex items-center justify-center">
            <Logo className="w-auto h-24 text-primary" />
        </div>
        <LoginForm />
        <div className="flex-1" />
    </div>
  );
}
