'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { PasswordStrengthIndicator } from '@/components/password-strength-indicator';
import type { PasswordCriteria } from '@/components/password-strength-indicator';

function ResetPasswordComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    
    const [oobCode, setOobCode] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [isVerifying, setIsVerifying] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
        length: false,
        uppercase: false,
        number: false,
        special: false,
    });

    useEffect(() => {
        const code = searchParams.get('oobCode');
        if (!code) {
            setError("Invalid or missing password reset link. Please request a new one.");
            setIsVerifying(false);
            return;
        }
        
        setOobCode(code);

        verifyPasswordResetCode(auth, code)
            .then(() => {
                setIsVerifying(false);
            })
            .catch(() => {
                setError("This password reset link is invalid or has expired. Please request a new one.");
                setIsVerifying(false);
            });
    }, [searchParams]);

    const checkPasswordStrength = (password: string) => {
        const criteria = {
          length: password.length >= 8,
          uppercase: /[A-Z]/.test(password),
          number: /[0-9]/.test(password),
          special: /[^A-Za-z0-9]/.test(password),
        };
        setPasswordCriteria(criteria);
        return Object.values(criteria).every(Boolean);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!oobCode || !checkPasswordStrength(newPassword)) {
            toast({
                variant: 'destructive',
                title: 'Weak Password',
                description: 'Please ensure your new password meets all the criteria.',
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setSuccess(true);
            toast({
                title: 'Password Reset Successfully',
                description: 'You can now log in with your new password.',
            });
            setTimeout(() => router.push('/login'), 3000);
        } catch (err: any) {
            let errorMessage = 'An unexpected error occurred. Please try again.';
            if (err.code === 'auth/expired-action-code' || err.code === 'auth/invalid-action-code') {
                errorMessage = "This password reset link is invalid or has expired. Please request a new one.";
            } else if (err.code === 'auth/weak-password') {
                errorMessage = "The password provided is too weak. Please choose a stronger password that meets all the criteria.";
            }
            
            setError(errorMessage);
            toast({
                variant: 'destructive',
                title: 'Reset Failed',
                description: errorMessage,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isVerifying) {
        return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Verifying Link</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center gap-4 p-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="text-muted-foreground">Please wait...</p>
                </CardContent>
            </Card>
        );
    }
    
    if (error) {
        return (
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-destructive">Link Invalid</CardTitle>
                    <CardDescription>{error}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild><Link href="/login">Back to Login</Link></Button>
                </CardContent>
            </Card>
        );
    }

    if (success) {
        return (
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-primary">Password Changed!</CardTitle>
                    <CardDescription>Redirecting you to the login page...</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center gap-4 p-8">
                     <Loader2 className="h-8 w-8 animate-spin" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Reset Your Password</CardTitle>
                <CardDescription>Choose a new, strong password for your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="pl-10"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                disabled={isSubmitting}
                            />
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                        {newPassword.length > 0 && <PasswordStrengthIndicator criteria={passwordCriteria} />}
                    </div>
                    <Button type="submit" className="w-full glossy-button" disabled={isSubmitting || !Object.values(passwordCriteria).every(Boolean)}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Resetting...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}


export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <ResetPasswordComponent />
        </Suspense>
    );
}
