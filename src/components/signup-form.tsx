"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Phone, KeyRound, Loader2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const DUMMY_OTP = "123456";

export function SignUpForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phoneInput' | 'otpInput'>('phoneInput');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const handlePhoneSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otpInput');
      toast({
        title: "Dummy OTP Sent",
        description: `For this demo, your OTP is: ${DUMMY_OTP}`,
        duration: 9000,
      });
    }, 1000);
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      if (otp === DUMMY_OTP) {
        toast({
          title: "Success!",
          description: "You have been signed up successfully.",
        });
        router.push('/');
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }, 1000);
  };
  

  return (
    <Card className="w-full max-w-sm">
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
            This is a demo. No real SMS will be sent.
        </p>
      </CardFooter>
    </Card>
  );
}
