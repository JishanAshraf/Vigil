
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { LogIn, User, Phone } from "lucide-react";

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
      <div className="flex-1 p-8 flex flex-col max-w-md mx-auto w-full justify-center gap-4">
        <Button asChild className="w-full font-bold text-base slide-in-button">
          <Link href="/login">
            <LogIn className="mr-2 h-5 w-5"/>
            <span>Login with Email</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full font-bold text-base glossy-button">
          <Link href="/signup">
            <User className="mr-2 h-5 w-5"/>
            <span>Sign Up with Email</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full font-bold text-base glossy-button">
            <Link href="/phone-login">
                <Phone className="mr-2 h-5 w-5"/>
                <span>Sign In with Phone</span>
            </Link>
        </Button>
      </div>
    </div>
  );
}
