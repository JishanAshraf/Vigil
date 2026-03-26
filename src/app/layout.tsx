'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AlertsProvider } from '@/contexts/AlertsContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const headlineFont = Playfair_Display({ subsets: ['latin'], variable: '--font-headline', weight: '400' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", inter.variable, headlineFont.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <FirebaseClientProvider>
            <AuthProvider>
              <AlertsProvider>
                {children}
                <Toaster />
              </AlertsProvider>
            </AuthProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
