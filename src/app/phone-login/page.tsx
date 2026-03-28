
import { PhoneAuthForm } from '@/components/phone-auth-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PhoneLoginPage() {
  return (
    <>
        <div className="p-4">
            <Button asChild variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground">
                <Link href="/auth">
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Back
                </Link>
            </Button>
        </div>
        
        <div className="flex-1 flex flex-col justify-end">
            <PhoneAuthForm />
        </div>
    </>
  );
}
