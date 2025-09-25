
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Mail, Lock } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
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
          <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me">Remember me</Label>
              </div>
              <Link href="#" className="underline text-muted-foreground hover:text-primary">
                  Forgot Password?
              </Link>
          </div>
          <Button asChild type="submit" className="w-full font-bold text-base glossy-button">
            <Link href="/">Login</Link>
          </Button>
          <div className="text-center text-sm text-muted-foreground">
              Don't have an account? <Link href="#" className="underline font-semibold text-primary hover:text-primary/80">Register</Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
