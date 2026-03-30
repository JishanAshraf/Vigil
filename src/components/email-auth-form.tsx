
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

export function EmailAuthForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const actionCodeSettings = {
      url: `${window.location.origin}/finish-login`,
      handleCodeInApp: true,
    };

    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        setEmailSent(true);
        toast({
            title: "Check your email",
            description: `A sign-in link has been sent to ${email}.`,
        });
    } catch (error: any) {
        if (error.code === 'auth/configuration-not-found') {
            toast({
                variant: "destructive",
                title: "Action Required: Enable Email Link Sign-In",
                description: "Email Link sign-in is not enabled in your Firebase project. Please enable it in the Firebase Console under Authentication -> Sign-in method.",
                duration: 10000,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Authentication Failed",
                description: error.message || "An unexpected error occurred. Please try again.",
            });
        }
    } finally {
        setIsSubmitting(false);
    }
  }

  if (emailSent) {
    return (
         <Card className="w-full max-w-md mx-auto rounded-t-3xl rounded-b-none border-none shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 duration-500">
            <CardHeader className="text-center pt-10 pb-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-primary">Check your inbox</CardTitle>
                <CardDescription className="pt-2 text-base">
                    A sign-in link has been sent to <span className="font-bold text-foreground">{email}</span>. Click the link to complete the sign-in process.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-12 text-center">
                 <p className="text-sm text-muted-foreground">You can close this tab.</p>
            </CardContent>
         </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto rounded-t-3xl rounded-b-none border-none shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 duration-500">
      <CardHeader className="text-center pt-10 pb-4">
        <CardTitle className="text-3xl font-bold text-primary">Continue with Email</CardTitle>
        <CardDescription className="pt-2">We'll send a magic link to your inbox.</CardDescription>
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
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
            </div>
            
            <Button type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button" disabled={isSubmitting || !email}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Sending link...</span>
              </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    <span>Send Sign-in Link</span>
                </>
            )}
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}
