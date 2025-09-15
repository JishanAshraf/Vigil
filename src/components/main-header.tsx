
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Stethoscope, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: 'Watch', icon: ShieldCheck },
  { href: '/health', label: 'Health', icon: Stethoscope },
];

export function MainHeader() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Logo className="h-8 w-auto" />
      </Link>
      
      {isMounted && (
        <>
          <nav className="hidden flex-1 md:flex md:items-center md:justify-center">
            <div className="flex flex-row items-center gap-5 text-sm lg:gap-6">
              <Link
                  href="/"
                  className={cn(
                    'transition-colors hover:text-foreground',
                    pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  Neighbourhood Watch
                </Link>
                <Link
                  href="/health"
                  className={cn(
                    'transition-colors hover:text-foreground',
                    pathname.startsWith('/health') ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  Health Assistant
                </Link>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="/profile">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">Toggle user menu</span>
              </Link>
            </Button>
          </div>
        </>
      )}
      
      {/* Mobile Nav */}
      {isMounted && (
        <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-background/95 backdrop-blur-sm border-t p-2 z-50">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-colors',
                    pathname === item.href ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              ))}
            </div>
        </nav>
      )}
    </header>
  );
}
