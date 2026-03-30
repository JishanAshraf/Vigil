
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, UserPlus } from "lucide-react";

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
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="w-full font-bold text-base mt-2 slide-in-button flex-1">
            <Link href="/login">
              <Mail className="mr-2 h-5 w-5"/>
              <span>Log In</span>
            </Link>
          </Button>
          <Button asChild variant="secondary" className="w-full font-bold text-base mt-2 flex-1">
            <Link href="/signup">
              <UserPlus className="mr-2 h-5 w-5"/>
              <span>Sign Up</span>
            </Link>
          </Button>
        </div>
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
