
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/auth-background.png')" }}
        data-ai-hint="community people"
      >
        {/* This div contains the background image */}
      </div>
      <div className="p-8 grid gap-4 border-t bg-background">
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
