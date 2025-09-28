
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Stethoscope, UserCircle, Menu, Flag, LifeBuoy, LogOut, Bell, Search, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { ThemeToggle } from './theme-toggle';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet';

const navItems = [
  { href: '/', label: 'Watch', icon: Newspaper },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

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
          <SheetContent side="left" className="flex flex-col">
            <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
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
            <div className="mt-auto">
                <Button variant="destructive" className="w-full glossy-button" onClick={() => setIsSheetOpen(false)}>
                    <LogOut className="mr-2 h-5 w-5" />
                    Log out
                </Button>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                <Logo className="h-8 w-auto" />
            </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {isClient ? <ThemeToggle /> : <div className="h-10 w-10" />}
        </div>
      </header>

      {/* Bottom Nav for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-2 z-50 md:hidden h-[84px] flex items-center">
          <div className="grid grid-cols-5 gap-1 max-w-md mx-auto w-full items-center">
            {isClient ? (
              <>
                <Link
                  href={navItems[0].href}
                  className={cn(
                    'group glossy-button flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-all duration-300 h-[70px]',
                    pathname === navItems[0].href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  <navItems[0].icon className="h-6 w-6" />
                  <span className="text-xs">{navItems[0].label}</span>
                </Link>
                <Link
                  href={navItems[1].href}
                  className={cn(
                    'group glossy-button flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-all duration-300 h-[70px]',
                    pathname === navItems[1].href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  <navItems[1].icon className="h-6 w-6" />
                  <span className="text-xs">{navItems[1].label}</span>
                </Link>
                
                <div className="flex justify-center">
                  <Button asChild size="lg" className="h-16 w-16 rounded-full glossy-button bg-primary text-primary-foreground shadow-lg -translate-y-4">
                    <Link href="/report-issue">
                      <Flag className="h-7 w-7" />
                      <span className="sr-only">Report Issue</span>
                    </Link>
                  </Button>
                </div>

                <Link
                  href={navItems[2].href}
                  className={cn(
                    'group glossy-button flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-all duration-300 h-[70px]',
                    pathname === navItems[2].href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  <navItems[2].icon className="h-6 w-6" />
                  <span className="text-xs">{navItems[2].label}</span>
                </Link>
                <Link
                  href={navItems[3].href}
                  className={cn(
                    'group glossy-button flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-all duration-300 h-[70px]',
                    pathname === navItems[3].href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  <navItems[3].icon className="h-6 w-6" />
                  <span className="text-xs">{navItems[3].label}</span>
                </Link>
              </>
            ) : (
              // Placeholder to prevent layout shift
              <>
                <div className="h-[70px] rounded-lg bg-muted/20"></div>
                <div className="h-[70px] rounded-lg bg-muted/20"></div>
                <div className="h-[70px] rounded-lg bg-muted/20"></div>
                <div className="h-[70px] rounded-lg bg-muted/20"></div>
                <div className="h-[70px] rounded-lg bg-muted/20"></div>
              </>
            )}
          </div>
      </nav>

      {/* Sidebar Nav for larger screens */}
      <aside className="hidden md:flex fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-60 flex-col border-r bg-background/95 p-4 backdrop-blur-sm">
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
