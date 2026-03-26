"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Phone, KeyRound, Loader2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useAuth, useFirestore } from '@/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Extend the Window interface for the reCAPTCHA verifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export function SignUpForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phoneInput' | 'otpInput'>('phoneInput');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    if (!auth) return;

    // To prevent re-rendering issues, we only initialize reCAPTCHA once.
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  }, [auth]);

  const handlePhoneSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!window.recaptchaVerifier) {
      setError("reCAPTCHA verifier not initialized. Please try refreshing.");
      setIsLoading(false);
      return;
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setStep('otpInput');
      toast({
        title: "Verification code sent!",
        description: `A code has been sent to ${phoneNumber}.`,
      });
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/configuration-not-found') {
          setError('Configuration Error: Phone sign-in must be enabled in your Firebase project. Please go to the Firebase Console -> Authentication -> Sign-in method and enable the \'Phone\' provider.');
      } else {
        setError(err.message || "Failed to send verification code. Please check the phone number and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) {
      setError("Could not verify OTP. Please try sending the code again.");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await confirmationResult.confirm(otp);
      const user = userCredential.user;

      // Create a user profile document in Firestore
      if (user && firestore) {
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, {
            phone: user.phoneNumber,
            name: `User-${user.uid.substring(0, 5)}` // A default name for new users
        }, { merge: true });
      }

      toast({
        title: "Success!",
        description: "You have been signed up and logged in.",
      });
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your phone number to sign up with Firebase.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* This div is used by Firebase for the invisible reCAPTCHA */}
        <div id="recaptcha-container"></div>

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
               <p className="text-xs text-muted-foreground">Include country code (e.g., +1 for USA).</p>
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
                  inputMode="numeric"
                  autoComplete="one-time-code"
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
      <CardFooter className="px-6 pb-6">
        <p className="text-xs text-muted-foreground text-center w-full">
            Phone authentication is provided via Firebase. Standard message rates may apply.
        </p>
      </CardFooter>
    </Card>
  );
}
