
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div
        className="flex-grow bg-auth-background bg-cover bg-center"
        data-ai-hint="community people"
      >
        {/* This div will contain the background image */}
      </div>
      <div className="p-8 grid gap-4 border-t">
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
