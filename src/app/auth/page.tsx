import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="relative h-2/3">
        <Image
          src="/auth-background.png" 
          alt="Community people keeping watch in the neighborhood"
          className="object-cover" 
          fill
          data-ai-hint="community people"
        />
      </div>
      <div className="p-8 grid gap-4">
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
