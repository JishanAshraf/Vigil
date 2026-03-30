
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Mail, Loader2, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";

export function EmailAuthForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleSendLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/finish-login`,
        handleCodeInApp: true,
      };
      
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      
      setLinkSent(true);

    } catch (error: any) {
        let description = "An unexpected error occurred. Please try again.";
        if (error.code === 'auth/operation-not-allowed') {
            description = "This sign-in method is not enabled. Please enable the 'Email link' provider in the Firebase Console.";
        }
      
      toast({
          variant: "destructive",
          title: "Failed to Send Link",
          description: description,
          duration: 9000,
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
                    A secure sign-in link has been sent to <span className="font-bold text-foreground">{email}</span>.
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
        <CardTitle className="text-3xl font-bold text-primary">Secure, Passwordless Log In</CardTitle>
        <CardDescription className="pt-2">Enter your email and we'll send a magic link to your inbox.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-12">
        <form className="space-y-6" onSubmit={handleSendLink}>
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

            <Button type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button" disabled={isSubmitting || !email}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Sending Link...</span>
              </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    <span>Send Sign-In Link</span>
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
