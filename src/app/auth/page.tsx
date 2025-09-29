import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Simple image container */}
      <div className="flex-1 bg-gray-100 relative">
        <Image
          src="/Vigil-login-page.png"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Buttons */}
      <div className="p-8 grid gap-4">
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