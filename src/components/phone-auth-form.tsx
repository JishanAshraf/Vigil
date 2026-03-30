
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, KeyRound, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth";
import { auth } from "@/firebase";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
        confirmationResult?: ConfirmationResult;
    }
}

export function PhoneAuthForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': () => {
            // reCAPTCHA solved
          }
        });
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        const verifier = window.recaptchaVerifier;
        const formattedPhoneNumber = `+91${phoneNumber.replace(/\D/g, '')}`;
        if (formattedPhoneNumber.length !== 13) {
             toast({ variant: "destructive", title: "Invalid Phone Number", description: "Please enter a valid 10-digit phone number." });
             setIsSubmitting(false);
             return;
        }
        const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, verifier);
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
        toast({ title: "OTP Sent!", description: "Please enter the OTP you received." });
    } catch (error: any) {
        console.error(error);
        if (error.code === 'auth/operation-not-allowed') {
            toast({
                variant: "destructive",
                title: "Action Required: Enable Phone Sign-In",
                description: "Phone number sign-in is not enabled in your Firebase project. Please enable it in the Firebase Console.",
                duration: 10000,
            });
        } else {
            toast({ variant: "destructive", title: "Failed to send OTP", description: "Could not send verification code. Please check your phone number and try again." });
        }
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        if (window.confirmationResult) {
            await window.confirmationResult.confirm(otp);
            toast({ title: "Logged In!", description: "You are now successfully logged in." });
            router.push('/');
        } else {
             toast({ variant: "destructive", title: "Verification Failed", description: "Could not verify OTP. Please try sending it again." });
        }
    } catch (error: any) {
        console.error(error);
        if (error.code === 'auth/invalid-verification-code') {
          toast({ variant: "destructive", title: "Invalid OTP", description: "The OTP you entered is incorrect. Please try again." });
        } else {
          toast({ variant: "destructive", title: "Verification Failed", description: "An unexpected error occurred. Please try again." });
        }
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto rounded-t-3xl rounded-b-none border-none shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 duration-500">
      <CardHeader className="text-center pt-6 pb-4">
        <CardTitle className="text-3xl font-bold text-primary">Enter Your Phone Number</CardTitle>
        <CardDescription>{otpSent ? "Enter the OTP sent to your phone." : "We'll send you an OTP to verify your number."}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-12">
        {!otpSent ? (
          <form className="space-y-6" onSubmit={handleSendOtp}>
              <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone Number</Label>
                  <div className="relative flex items-center">
                      <span className="absolute left-3 text-sm text-muted-foreground">+91</span>
                      <Input
                          id="phone"
                          type="tel"
                          placeholder="98765 43210"
                          required
                          className="pl-12"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          autoComplete="tel"
                      />
                  </div>
              </div>
            <Button type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4"/>}
              <span>Send OTP</span>
            </Button>
          </form>
        ) : (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
                <div className="grid gap-2">
                  <Label htmlFor="otp" className="text-xs text-muted-foreground">Verification Code</Label>
                  <div className="relative">
                      <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          required
                          className="pl-10"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          autoComplete="one-time-code"
                      />
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                  </div>
                </div>
                <Button type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    <span>Verify & Continue</span>
                </Button>
                 <Button variant="link" onClick={() => setOtpSent(false)} className="w-full text-primary">
                    Use a different phone number
                </Button>
            </form>
        )}
        <div id="recaptcha-container"></div>
      </CardContent>
    </Card>
  );
}
