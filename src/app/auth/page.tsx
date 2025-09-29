
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  return (
    <div className="flex flex-col h-full items-center justify-between text-center p-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <Image 
            src="https://picsum.photos/seed/authhero/400/400"
            alt="Vigil App Illustration"
            width={400}
            height={400}
            className="max-w-[300px] w-full h-auto"
            priority
            data-ai-hint="community watch illustration"
        />
        <p className="text-lg text-muted-foreground -mt-8 font-headline">See it, post it, resolve it. Together.</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Button asChild className="w-full glossy-button" size="lg">
          <Link href="/login">
            Login
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full glossy-button" size="lg">
          <Link href="/login">
            Register
          </Link>
        </Button>
        <div className="text-center pt-4">
          <Button asChild variant="link" className="text-primary/80">
            <Link href="/">Continue as a guest</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
