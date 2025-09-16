
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

export function LoginForm() {
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOtpSent(true);
  }

  const LoginFormContent = ({ isEmail = false }: { isEmail?: boolean }) => (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor={isEmail ? 'email' : 'phone'}>{isEmail ? 'Email' : 'Phone Number'}</Label>
        <Input 
          id={isEmail ? 'email' : 'phone'} 
          type={isEmail ? 'email' : 'tel'} 
          placeholder={isEmail ? 'm@example.com' : '+1 234 567 8900'} 
          required 
        />
      </div>
      {isOtpSent && (
        <div className="grid gap-2 animate-in fade-in-50 duration-500">
          <Label htmlFor={`otp-${isEmail ? 'email' : 'phone'}`}>One-Time Password</Label>
          <Input id={`otp-${isEmail ? 'email' : 'phone'}`} required placeholder="Enter your code" />
        </div>
      )}
      {!isOtpSent ? (
        <Button type="submit" className="w-full glossy-button" onClick={handleSendOtp}>
          Send OTP
        </Button>
      ) : (
         <Button asChild type="submit" className="w-full glossy-button">
          <Link href="/">Login / Sign Up</Link>
        </Button>
      )}
    </div>
  );

  return (
      <Tabs defaultValue="email" onValueChange={() => setIsOtpSent(false)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        <div className="pt-4">
          <TabsContent value="email">
            <LoginFormContent isEmail />
          </TabsContent>
          <TabsContent value="phone">
            <LoginFormContent />
          </TabsContent>
        </div>
      </Tabs>
  );
}
