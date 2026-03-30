
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Mail, Loader2, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";

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
            description: "Welcome back to Vigil!",
        });
        router.push('/');
    } catch (error: any) {
        let description = "An unexpected error occurred. Please try again.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            description = "Invalid email or password. Please check your credentials and try again.";
        }
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: description,
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto rounded-t-3xl rounded-b-none border-none shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 duration-500">
      <CardHeader className="text-center pt-10 pb-4">
        <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
        <CardDescription className="pt-2">Log in to your Vigil account.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-12">
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
                        disabled={isSubmitting}
                        autoComplete="email"
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
                        placeholder="••••••••"
                        required
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                        autoComplete="current-password"
                    />
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
            </div>
            
            <Button type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button" disabled={isSubmitting || !email || !password}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Logging In...</span>
              </>
            ) : (
                <span>Continue</span>
            )}
            </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign Up
            </Link>
        </p>
      </CardContent>
    </Card>
  );
}
