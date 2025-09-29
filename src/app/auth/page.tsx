
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Image container */}
      <div className="flex-grow-[3] flex items-center justify-center p-4">
        <div className="relative w-full h-full">
          <Image
            src="/Vigil-login-page.png"
            alt="Vigil app screenshot"
            fill
            className="object-contain"
            priority
            data-ai-hint="app screenshot"
          />
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex-grow-[1] p-8 grid gap-4 place-content-center max-w-md mx-auto w-full">
        <Button asChild className="w-full font-bold text-base">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline" className="w-full font-bold text-base">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
