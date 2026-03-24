"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Phone, KeyRound, Loader2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useAuth } from '@/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

// Extend Window interface to include recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

export function SignUpForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phoneInput' | 'otpInput'>('phoneInput');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Set up reCAPTCHA verifier
  useEffect(() => {
    if (!auth) return;

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  }, [auth]);

  const handlePhoneSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !window.recaptchaVerifier) return;
    
    setError(null);
    setIsLoading(true);

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setStep('otpInput');
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send OTP. Please check the phone number and try again.");
      // Reset reCAPTCHA
       if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId) => {
            if(auth) {
                // @ts-ignore
                grecaptcha.reset(widgetId);
            }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirmationResult) {
      setError("Something went wrong. Please try signing up again.");
      return;
    };
    
    setError(null);
    setIsLoading(true);

    try {
      await window.confirmationResult.confirm(otp);
      toast({
        title: "Success!",
        description: "You have been signed up successfully.",
      });
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Card className="w-full max-w-sm">
      <div id="recaptcha-container"></div>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your phone number to sign up.</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 'phoneInput' && (
          <form onSubmit={handlePhoneSignUp} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 555 123 4567"
                  required
                  className="pl-10"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <Button type="submit" className="w-full font-bold text-base glossy-button" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Send OTP'}
            </Button>
          </form>
        )}

        {step === 'otpInput' && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">Verification Code</Label>
              <div className="relative">
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter the 6-digit code"
                  required
                  className="pl-10"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isLoading}
                  maxLength={6}
                />
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <Button type="submit" className="w-full font-bold text-base glossy-button" disabled={isLoading}>
               {isLoading ? <Loader2 className="animate-spin" /> : 'Verify & Sign Up'}
            </Button>
          </form>
        )}

        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="underline font-semibold text-primary hover:text-primary/80">Login</Link>
        </div>
      </CardContent>
    </Card>
  );
}
