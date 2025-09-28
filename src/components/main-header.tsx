
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Stethoscope, UserCircle, Menu, Flag, LifeBuoy, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { ThemeToggle } from './theme-toggle';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet';

const desktopNavItems = [
  { href: '/', label: 'Watch', icon: ShieldCheck },
  { href: '/health', label: 'Health', icon: Stethoscope },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export function MainHeader() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
            <div className="p-6">
              <nav className="mt-8 flex flex-col gap-2">
                <Link
                  href="/report-issue"
                  onClick={() => setIsSheetOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Flag className="h-5 w-5" />
                  Report an Issue
                </Link>
                <Link
                  href="/help"
                  onClick={() => setIsSheetOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LifeBuoy className="h-5 w-5" />
                  Help & Support
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-6">
                <Button variant="destructive" className="w-full glossy-button" onClick={() => setIsSheetOpen(false)}>
                    <LogOut className="mr-2 h-5 w-5" />
                    Log out
                </Button>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex-1 flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                <Logo className="h-8 w-auto" />
            </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {isClient ? <ThemeToggle /> : <div className="h-10 w-10" />}
        </div>
      </header>

      {/* Sidebar Nav for larger screens */}
      <aside className="hidden md:flex fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-60 flex-col border-r bg-background/95 p-4 backdrop-blur-sm">
        <nav className="flex flex-col gap-2">
            {desktopNavItems.map((item) => (
                <Link
                    key={`desktop-${item.href}`}
                    href={item.href}
                    className={cn(
                        'group glossy-button flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300',
                        pathname === item.href ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    )}
                >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
            <Link
                href="/report-issue"
                className="group glossy-button flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                <Flag className="h-5 w-5" />
                Report an Issue
            </Link>
             <Link
                href="/help"
                className="group glossy-button flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              >
                <LifeBuoy className="h-5 w-5" />
                Help & Support
            </Link>
            <Button variant="destructive" className="glossy-button justify-start mt-4">
                <LogOut className="mr-2 h-5 w-5" />
                Log out
            </Button>
        </div>
      </aside>
    </>
  );
}
