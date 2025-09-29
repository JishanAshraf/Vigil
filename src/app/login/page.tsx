
import { LoginForm } from '@/components/login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <>
      <div className="absolute top-8">
        <Logo className="w-auto h-16 text-primary mx-auto" />
      </div>
      <LoginForm />
    </>
  );
}
