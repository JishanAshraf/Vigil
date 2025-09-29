import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Image Container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative w-full h-full">
            <Image
              src="/auth-background.png"
              alt="Community illustration"
              fill
              className="object-contain"
              priority
              data-ai-hint="community people"
            />
        </div>
      </div>
      
      {/* Buttons */}
      <div className="p-8 pt-0 grid gap-4">
        <Button asChild className="w-full font-bold text-base glossy-button">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline" className="w-full font-bold text-base glossy-button">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
