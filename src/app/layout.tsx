
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MainHeader } from '@/components/main-header';
import { ThemeProvider } from '@/components/theme-provider';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  const showHeader = isClient && !['/login', '/auth'].includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Townish</title>
        <meta name="description" content="Your community safety and health assistant." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col">
            {showHeader && <MainHeader />}
            <main className={`flex flex-1 flex-col ${showHeader ? 'gap-4 p-4 md:gap-8 md:p-8 pb-24' : ''}`}>
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
