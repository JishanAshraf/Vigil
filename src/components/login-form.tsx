
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent } from "./ui/card";
import { Switch } from "@/components/ui/switch";

export function LoginForm() {
  const [loginWithEmail, setLoginWithEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Label htmlFor="login-toggle" className={!loginWithEmail ? "text-muted-foreground" : ""}>Email</Label>
            <Switch
              id="login-toggle"
              checked={!loginWithEmail}
              onCheckedChange={() => setLoginWithEmail(!loginWithEmail)}
            />
            <Label htmlFor="login-toggle" className={loginWithEmail ? "text-muted-foreground" : ""}>Phone</Label>
          </div>

          {loginWithEmail ? (
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
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  required
                  className="pl-10"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="pl-10 pr-10"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </button>
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
            Don't have an account?{' '}
            <Link href="/signup" className="underline font-semibold text-primary hover:text-primary/80">
              Register
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
