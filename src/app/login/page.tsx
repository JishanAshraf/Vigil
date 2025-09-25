
import { LoginForm } from '@/components/login-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="https://picsum.photos/seed/town/1920/1080"
        alt="Background"
        fill
        className="object-cover"
        data-ai-hint="modern community"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex min-h-screen items-center justify-center">
          <LoginForm />
      </div>
    </div>
  );
}
