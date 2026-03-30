"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, KeyRound, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const PasswordStrengthIndicator = ({ strength }: { strength: number }) => {
  const strengthLevels = [
    { label: "Weak", color: "bg-red-500" },
    { label: "Fair", color: "bg-yellow-500" },
    { label: "Good", color: "bg-blue-500" },
    { label: "Strong", color: "bg-green-500" },
  ];

  const currentLevel = strengthLevels[strength];

  return (
    <div className="space-y-2">
      <Progress value={(strength + 1) * 25} className={cn("h-2", currentLevel.color)} />
      <p className="text-xs text-right text-muted-foreground">{currentLevel.label}</p>
    </div>
  );
};

export function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    // Simple score to index mapping: length < 8 is weak, then fair, good, strong
    if (password.length < 8) {
      setPasswordStrength(0);
    } else {
      setPasswordStrength(score -1);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(passwordStrength < 1 && password.length > 0) {
        toast({
            variant: "destructive",
            title: "Weak Password",
            description: "Please choose a stronger password.",
        });
        return;
    }
    setIsSubmitting(true);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create user profile in Firestore
        const userDocRef = doc(firestore, "users", user.uid);
        const userData = {
            uid: user.uid,
            name: name,
            email: user.email,
            phone: '',
            postalCode: '',
            avatarUrl: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
        };
        
        setDoc(userDocRef, userData).catch(async (serverError) => {
             const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'create',
                requestResourceData: userData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
        
        toast({
            title: "Account Created!",
            description: "Welcome to Vigil! You are now logged in.",
        });
        router.push('/');
    } catch (error: any) {
        let description = "An unexpected error occurred. Please try again.";
        if (error.code === 'auth/email-already-in-use') {
            description = "This email is already associated with an account. Please log in instead.";
        } else if (error.code === 'auth/weak-password') {
            description = "The password is too weak. Please choose a stronger password.";
        }
        toast({
            variant: "destructive",
            title: "Sign-up Failed",
            description: description,
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSignup}>
        <div className="grid gap-2">
            <Label htmlFor="name" className="text-xs text-muted-foreground">Full Name</Label>
            <div className="relative">
                <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="name"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
        </div>

        <div className="grid gap-2">
            <Label htmlFor="email-signup" className="text-xs text-muted-foreground">Email</Label>
            <div className="relative">
                <Input
                    id="email-signup"
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
            <Label htmlFor="password-signup" className="text-xs text-muted-foreground">Password</Label>
            <div className="relative">
                <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="pl-10"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={isSubmitting}
                    autoComplete="new-password"
                />
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            {password.length > 0 && <PasswordStrengthIndicator strength={passwordStrength} />}
        </div>
        
        <Button type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button" disabled={isSubmitting || !email || !password || !name}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Creating Account...</span>
          </>
        ) : (
            <span>Sign Up</span>
        )}
        </Button>
    </form>
  );
}
