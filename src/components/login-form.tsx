"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, KeyRound, Hourglass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase";

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWaitingForVerification, setIsWaitingForVerification] = useState(false);

  useEffect(() => {
    if (!isWaitingForVerification) return;

    const intervalId = setInterval(async () => {
        // The user object might have been updated in the background
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            await auth.currentUser.reload();
        }

        if (auth.currentUser?.emailVerified) {
            clearInterval(intervalId);
            setIsWaitingForVerification(false);
            toast({
                title: "Email Verified!",
                description: "You have been successfully logged in.",
            });
            router.push('/');
        }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(intervalId);
  }, [isWaitingForVerification, router, toast]);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsWaitingForVerification(false);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        if (!userCredential.user.emailVerified) {
          await sendEmailVerification(userCredential.user);
          setIsWaitingForVerification(true);
          toast({
            title: "Please Verify Your Email",
            description: "We've sent a new verification link to your inbox. This screen will update automatically once you verify.",
            duration: 9000,
          });
          // Don't sign out, keep the user session to poll for verification
        } else {
            toast({
                title: "Logged In!",
                description: "Welcome back to Vigil!",
            });
            router.push('/');
        }
    } catch (error: any) {
        let description = "An unexpected error occurred. Please try again.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            description = "Invalid email or password. Please check your credentials and try again.";
        }
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: description,
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  if (isWaitingForVerification) {
    return (
        <div className="text-center py-8 space-y-4">
            <Hourglass className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
            <h3 className="text-2xl font-bold">Waiting for Verification</h3>
            <p className="text-base text-muted-foreground">
                A verification link has been sent to <span className="font-bold text-foreground">{email}</span>.
            </p>
            <p className="text-sm text-muted-foreground">Please click the link in your email to continue. This page will update automatically.</p>
        </div>
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
        <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
            <div className="relative">
                <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="email"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
        </div>

         <div className="grid gap-2">
            <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
            <div className="relative">
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="current-password"
                />
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
        </div>
        
        <Button type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button" disabled={isSubmitting || !email || !password}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Logging In...</span>
          </>
        ) : (
            <span>Continue</span>
        )}
        </Button>
    </form>
  );
}
