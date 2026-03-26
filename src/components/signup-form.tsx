
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Phone, KeyRound, Loader2, AlertTriangle, ChevronsRight, ExternalLink } from "lucide-react";
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
  const [isConfigError, setIsConfigError] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    if (!auth || isConfigError) return;

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {},
      });
    }
    
    return () => {
        window.recaptchaVerifier?.clear();
    }
  }, [auth, isConfigError]);

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
        setIsConfigError(true);
      } else if (err.code === 'auth/invalid-phone-number') {
        setError("Invalid phone number. Please make sure to include the country code (e.g., +1 for USA).");
      } else {
        setError(err.message || "Failed to send verification code. Please try again.");
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

      if (user && firestore) {
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, {
            phone: user.phoneNumber,
            name: `User-${user.uid.substring(0, 5)}`
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

  const renderConfigError = () => (
    <div className="space-y-4 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h3 className="text-lg font-semibold">Action Required</h3>
        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md text-left space-y-3">
           <p className="font-bold">To fix this, you must enable Phone Sign-In in your Firebase Project:</p>
           <ol className="list-decimal list-inside space-y-2">
               <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Firebase Console <ExternalLink className="inline-block h-3 w-3"/></a>.</li>
               <li>Select your project.</li>
               <li>Navigate to <span className="font-semibold">Build &gt; Authentication</span>.</li>
               <li>Click the <span className="font-semibold">Sign-in method</span> tab.</li>
               <li>Click on <span className="font-semibold">Phone</span> in the list and enable it.</li>
           </ol>
        </div>
        <Button onClick={() => setIsConfigError(false)} className="w-full">
            I have enabled it, try again
        </Button>
    </div>
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your phone number to sign up with Firebase.</CardDescription>
      </CardHeader>
      <CardContent>
        <div id="recaptcha-container"></div>
        
        {isConfigError ? renderConfigError() : (
          <>
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
                      className="pl-10 tracking-widest text-center"
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
                 <Button variant="link" size="sm" onClick={() => setStep('phoneInput')} className="w-full text-muted-foreground">
                    Use a different number
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
          </>
        )}
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <p className="text-xs text-muted-foreground text-center w-full">
            Phone authentication is provided via Firebase's free tier. Standard rates may apply.
        </p>
      </CardFooter>
    </Card>
  );
}

