
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function AuthPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center p-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <Logo className="w-auto h-24 text-primary" />
        <p className="text-lg text-muted-foreground font-headline">See it, post it, resolve it. Together.</p>
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
