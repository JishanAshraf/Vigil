"use client";

import { useState } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail, KeyRound, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
            title: "Logged In!",
            description: `Welcome back!`,
        });
        router.push('/');
    } catch (error: any) {
        if (error.code === 'auth/configuration-not-found') {
             toast({
                variant: "destructive",
                title: "Action Required: Enable Email Sign-In",
                description: "Email/Password sign-in is not enabled in your Firebase project. Please enable it in the Firebase Console.",
                duration: 10000,
            });
        } else if (error.code === 'auth/invalid-credential') {
             toast({
                variant: "destructive",
                title: "Login Failed",
                description: "The email or password you entered is incorrect. Please try again.",
            });
        }
        else {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: error.message || "An unexpected error occurred.",
            });
        }
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto rounded-t-3xl rounded-b-none border-none shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 duration-500">
      <div className="relative w-full aspect-[16/7]">
        <Image 
          src="/vigil-welcome-border.png" 
          alt="Vigil app welcome border" 
          fill
          className="object-cover"
          data-ai-hint="abstract pattern"
        />
      </div>
      <CardHeader className="text-center pt-6 pb-4">
        <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form className="space-y-6" onSubmit={handleLogin}>
            <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                <div className="relative">
                    <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
            </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="**********"
                  required
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
              </div>
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
          <Button type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </Button>
          
           <div className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account? <Link href="/signup" className="underline font-semibold text-primary hover:text-primary/80">Sign Up</Link>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
