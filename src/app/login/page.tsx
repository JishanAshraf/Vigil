
import { LoginForm } from '@/components/login-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-2/5 bg-primary overflow-hidden">
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-primary-foreground/10"></div>
        <div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-primary-foreground/5"></div>
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-4">
            <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
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
