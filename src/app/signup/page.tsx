
import { SignUpForm } from '@/components/signup-form';
import { Logo } from '@/components/logo';

export default function SignUpPage() {
  return (
    <>
        <div className="flex-1 flex items-center justify-center">
             <div className="text-center">
                <Logo className="w-auto h-24 text-primary mx-auto" />
                <p className="mt-4 text-muted-foreground">Create your account to get started.</p>
            </div>
        </div>
        <SignUpForm />
        <div className="flex-1" />
    </>
  );
}
