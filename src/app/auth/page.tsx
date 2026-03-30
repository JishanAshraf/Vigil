
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail } from "lucide-react";

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
            <span>Continue with Email</span>
          </Link>
        </Button>

         <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-muted-foreground/50"></div>
            <span className="flex-shrink mx-4 text-muted-foreground text-xs">OR</span>
            <div className="flex-grow border-t border-muted-foreground/50"></div>
        </div>

        <Button asChild variant="outline" className="w-full font-bold text-base glossy-button">
            <Link href="/phone-login">
                <Phone className="mr-2 h-5 w-5"/>
                Continue with Phone
            </Link>
        </Button>
      </div>
    </div>
  );
}
