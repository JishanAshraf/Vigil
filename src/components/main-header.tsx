
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Stethoscope, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { ThemeToggle } from './theme-toggle';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Watch', icon: ShieldCheck },
  { href: '/health', label: 'Health', icon: Stethoscope },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export function MainHeader() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-12 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold mr-auto text-primary">
          <Logo className="h-8 w-auto" />
        </Link>
        
        <div className="flex items-center gap-2">
          {isClient ? <ThemeToggle /> : <div className="h-10 w-10" />}
        </div>
      </header>

      {/* Footer Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-1 z-50">
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {isClient ? navItems.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                className={cn(
                  'group glossy-button flex flex-col items-center justify-center gap-1 rounded-lg p-1.5 transition-all duration-300',
                  pathname === item.href ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )) : (
              // Placeholder to prevent layout shift
              <>
                <div className="h-[46px]"></div>
                <div className="h-[46px]"></div>
                <div className="h-[46px]"></div>
              </>
            )}
          </div>
      </nav>
    </>
  );
}
