"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/firebase";

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
        <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary">Check your inbox</h3>
            <p className="pt-2 text-base text-muted-foreground">
                A secure sign-in link has been sent to <span className="font-bold text-foreground">{email}</span>.
            </p>
            <p className="text-sm text-muted-foreground mt-4">You can close this tab now.</p>
        </div>
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleSendLink}>
        <div className="grid gap-2">
            <Label htmlFor="email-magiclink" className="text-xs text-muted-foreground">Email</Label>
            <div className="relative">
                <Input
                    id="email-magiclink"
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
  );
}
