
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Mail, Lock, X } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

export function LoginForm() {
  return (
    <div className="relative w-full max-w-sm p-8 space-y-6 bg-white/20 backdrop-blur-md rounded-2xl text-white border border-white/30">
        <Link href="/">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/10 hover:bg-black/20 text-white">
                <X className="h-4 w-4" />
            </Button>
        </Link>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Login</h1>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  required 
                  className="pr-10 bg-white/30 border-white/40 placeholder:text-white/70"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
            </div>
        </div>
        <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="pr-10 bg-white/30 border-white/40 placeholder:text-white/70"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
            </div>
        </div>
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
                <Checkbox id="remember-me" className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-primary data-[state=checked]:border-white" />
                <Label htmlFor="remember-me">Remember me</Label>
            </div>
            <Link href="#" className="underline hover:text-gray-200">
                Forgot Password?
            </Link>
        </div>
        <Button asChild type="submit" className="w-full font-bold text-base bg-white text-primary hover:bg-gray-200">
          <Link href="/">Login</Link>
        </Button>
        <div className="text-center text-sm">
            Don't have an account? <Link href="#" className="underline font-semibold hover:text-gray-200">Register</Link>
        </div>
      </div>
    </div>
  );
}
