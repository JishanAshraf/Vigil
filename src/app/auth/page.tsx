
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function AuthPage() {
  return (
    <>
      <div className="flex-grow" />
      <div className="p-8 grid gap-4">
          <Button asChild className="w-full font-bold text-base glossy-button bg-background/20 border-white/30 text-white hover:bg-background/30">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full font-bold text-base glossy-button bg-transparent border-white/80 text-white hover:bg-white/10 hover:text-white">
            <Link href="/signup">Sign Up</Link>
          </Button>
      </div>
    </>
  );
}
