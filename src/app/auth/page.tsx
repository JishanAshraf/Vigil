
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Image container */}
      <div className="flex-grow-[3] flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src="/Vigil-login-page.png"
            alt="Vigil app screenshot"
            fill
            className="object-cover"
            priority
            data-ai-hint="app screenshot"
          />
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex-1 p-8 flex flex-col max-w-md mx-auto w-full justify-center">
        <Button asChild className="w-full font-bold text-base mt-2 slide-in-button">
          <Link href="/login"><span>Login</span></Link>
        </Button>
        <Button asChild variant="outline" className="w-full font-bold text-base mt-2">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
