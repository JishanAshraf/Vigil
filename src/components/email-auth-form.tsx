
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Mail, Loader2, KeyRound, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword, sendSignInLinkToEmail, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";

export function EmailAuthForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1: Check if email and password are correct by signing in.
      await signInWithEmailAndPassword(auth, email, password);

      // If sign-in is successful, credentials are valid.
      // Immediately sign the user out to enforce the magic link step.
      await signOut(auth);

      // Step 2: Send the magic link for the verified email.
      const actionCodeSettings = {
        url: `${window.location.origin}/finish-login`,
        handleCodeInApp: true,
      };
      
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      
      // Update UI to inform the user to check their email.
      setLinkSent(true);

    } catch (error: any) {
      let description = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          description = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.code === 'auth/configuration-not-found') {
          description = "Email Link sign-in is not enabled in your Firebase project. Please enable it in the Firebase Console.";
      }
      
      toast({
          variant: "destructive",
          title: "Verification Failed",
          description: description,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (linkSent) {
    return (
         <Card className="w-full max-w-md mx-auto rounded-t-3xl rounded-b-none border-none shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 duration-500">
            <CardHeader className="text-center pt-10 pb-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-primary">Check your inbox</CardTitle>
                <CardDescription className="pt-2 text-base">
                    Your password was correct. A secure sign-in link has been sent to <span className="font-bold text-foreground">{email}</span> to complete the login.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-12 text-center">
                 <p className="text-sm text-muted-foreground">You can close this tab now.</p>
            </CardContent>
         </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto rounded-t-3xl rounded-b-none border-none shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 duration-500">
      <CardHeader className="text-center pt-10 pb-4">
        <CardTitle className="text-3xl font-bold text-primary">Secure Log In</CardTitle>
        <CardDescription className="pt-2">First, enter your password. If it's correct, we'll send a sign-in link to your email.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-12">
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
                <span>Verifying...</span>
              </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    <span>Verify & Send Link</span>
                </>
            )}
            </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign Up
            </Link>
        </p>
      </CardContent>
    </Card>
  );
}
