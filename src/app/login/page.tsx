
import { LoginForm } from '@/components/login-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <>
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-4">
            <Button asChild variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground">
                <Link href="/auth">
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Back
                </Link>
            </Button>
        </div>
        
        <div className="flex-1 flex flex-col justify-end">
            <LoginForm />
        </div>
      </div>
    </>
  );
}
