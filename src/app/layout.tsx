
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MainHeader } from '@/components/main-header';
import { ThemeProvider } from '@/components/theme-provider';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const headlineFont = Playfair_Display({ subsets: ['latin'], variable: '--font-headline', weight: '400' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showHeader = isClient && !pathname.startsWith('/login');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Vigil</title>
        <meta name="description" content="Your community safety and health assistant." />
      </head>
      <body className={cn("font-sans antialiased", inter.variable, headlineFont.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="flex min-h-screen w-full flex-col">
            {showHeader && <MainHeader />}
            <main className={`flex flex-1 flex-col ${!showHeader ? '' : 'gap-4 p-4 md:gap-8 md:p-8 md:pl-64 pb-28 md:pb-8'}`}>
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
