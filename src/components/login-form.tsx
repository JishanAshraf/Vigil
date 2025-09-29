
"use client";

import { useState } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail, Phone } from "lucide-react";

export function LoginForm() {
  const [loginMethod, setLoginMethod] = useState("email");

  return (
    <Card className="w-full max-w-md mx-auto rounded-t-3xl rounded-b-none border-none shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 duration-500">
      <div className="relative w-full aspect-[16/7]">
        <Image 
          src="/Vigil-login-page.png" 
          alt="Community watch app screenshot" 
          fill
          className="object-cover"
          data-ai-hint="app screenshot"
        />
      </div>
      <CardHeader className="text-center pt-6 pb-4">
        <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {loginMethod === 'email' && (
              <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                  <div className="relative">
                      <Input
                          id="email"
                          type="email"
                          placeholder="kris.adams@gamil.com"
                          required
                          className="pl-10"
                      />
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
              </div>
          )}
          {loginMethod === 'phone' && (
              <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone Number</Label>
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
            <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="**********"
                required
              />
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me" className="font-normal">Remember me</Label>
            </div>
            <Link href="#" className="underline text-primary hover:text-primary/80">
              Forgot Password?
            </Link>
          </div>
          <Button asChild type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button">
            <Link href="/"><span>Login</span></Link>
          </Button>
          
          <div className="relative text-center my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or sign in with
              </span>
            </div>
          </div>

          <div className="text-center">
              <Button 
                  variant="link" 
                  onClick={() => setLoginMethod(loginMethod === 'email' ? 'phone' : 'email')}
                  className="text-primary"
              >
                  {loginMethod === 'email' ? 'Phone Number' : 'Email'}
              </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
