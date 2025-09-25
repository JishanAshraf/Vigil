
'use client';

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="flex-1 flex items-center justify-center">
        <Logo className="w-auto h-24 text-primary" />
      </div>

      <div className="p-8 space-y-4">
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
        <div className="text-center">
          <Button asChild variant="link" className="text-primary/80">
            <Link href="/">Continue as a guest</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
