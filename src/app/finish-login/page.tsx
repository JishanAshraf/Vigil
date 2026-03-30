
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FinishLoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const completeSignIn = async () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    // User opened the link on a different device. To prevent session fixation
                    // attacks, ask the user to provide the email again. For simplicity,
                    // we'll just show an error here. A real app would have a form.
                    setError("Your sign-in link is invalid or has expired. Please try signing in again.");
                    setStatus('error');
                    return;
                }
                
                try {
                    await signInWithEmailLink(auth, email, window.location.href);
                    window.localStorage.removeItem('emailForSignIn');
                    setStatus('success');
                    toast({
                        title: 'Successfully Signed In',
                        description: 'Welcome to Vigil!',
                    });
                    router.push('/');
                } catch (err: any) {
                    setError(err.message || "Failed to sign in. The link may be expired.");
                    setStatus('error');
                    toast({
                        variant: 'destructive',
                        title: 'Sign-in Failed',
                        description: err.message || 'An unknown error occurred.',
                    });
                }
            } else {
                 setError("This is not a valid sign-in link.");
                 setStatus('error');
            }
        };
        
        completeSignIn();
    }, [router, toast]);

    const renderContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Verifying your link and signing you in...</p>
                    </div>
                );
            case 'error':
                 return (
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <CardTitle className="text-2xl text-destructive">Sign-in Failed</CardTitle>
                        <CardDescription>{error}</CardDescription>
                        <Button asChild>
                            <Link href="/login">Try Again</Link>
                        </Button>
                    </div>
                );
            case 'success':
                 return (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <CardTitle className="text-2xl">Success!</CardTitle>
                        <CardDescription>Redirecting you to the app...</CardDescription>
                    </div>
                );
        }
    }
    
    return (
        <div className="flex h-screen items-center justify-center p-8 bg-background">
            <Card className="w-full max-w-md">
                <CardHeader />
                <CardContent>
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
}
