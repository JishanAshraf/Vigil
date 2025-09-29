
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Mail, Lock, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

export function SignUpForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your details below to sign up.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
          </div>
          <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <div className="relative">
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    className="pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
          </div>
          <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    className="pl-10"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
          </div>
          <Button asChild type="submit" className="w-full font-bold text-base glossy-button">
            <Link href="/">Sign Up</Link>
          </Button>
          <div className="text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="underline font-semibold text-primary hover:text-primary/80">Login</Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
