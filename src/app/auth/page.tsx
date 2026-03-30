
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { Mail } from "lucide-react";

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
          <Link href="/login">
            <Mail className="mr-2 h-5 w-5"/>
            <span>Login or Sign Up with Email</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
