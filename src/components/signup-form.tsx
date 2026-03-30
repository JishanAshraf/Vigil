"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, KeyRound, User, CheckCircle, XCircle, Hourglass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import { cn } from "@/lib/utils";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const PasswordStrengthIndicator = ({ criteria }: { criteria: { length: boolean; uppercase: boolean; number: boolean; special: boolean } }) => {
  const criteriaList = [
    { key: 'length', label: 'At least 8 characters' },
    { key: 'uppercase', label: 'An uppercase letter (A-Z)' },
    { key: 'number', label: 'A number (0-9)' },
    { key: 'special', label: 'A special character (!@#$...)' },
  ];

  return (
    <div className="p-4 bg-muted/50 rounded-lg space-y-2 mt-2">
      {criteriaList.map((item) => (
        <div key={item.key} className="flex items-center text-xs">
          {criteria[item.key as keyof typeof criteria] ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
          )}
          <span className={cn("text-muted-foreground", criteria[item.key as keyof typeof criteria] && "text-foreground")}>
            {item.label}
          </span>
        </div>
      ))}
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
  const [isWaitingForVerification, setIsWaitingForVerification] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    if (!isWaitingForVerification) return;

    const intervalId = setInterval(async () => {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            await auth.currentUser.reload();
        }

        if (auth.currentUser?.emailVerified) {
            clearInterval(intervalId);
            setIsWaitingForVerification(false);
            
            try {
                await signInWithEmailAndPassword(auth, email, password);
                toast({
                    title: "Account Verified & Logged In!",
                    description: "Welcome to Vigil!",
                });
                router.push('/');
            } catch (loginError) {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: "Your email has been verified, but we couldn't log you in automatically. Please go to the login page.",
                });
                router.push('/login');
            }
        }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isWaitingForVerification, email, password, router, toast]);

  const checkPasswordStrength = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    setPasswordCriteria(criteria);
    return Object.values(criteria).every(Boolean);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkPasswordStrength(password)) {
        toast({
            variant: "destructive",
            title: "Weak Password",
            description: "Please ensure your password meets all the required criteria.",
        });
        return;
    }
    setIsSubmitting(true);
    setIsWaitingForVerification(false);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await sendEmailVerification(user);
        
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
        
        setIsWaitingForVerification(true);
        toast({
            title: "Please Verify Your Email",
            description: "We've sent a verification link to your inbox. This screen will update automatically once you verify.",
            duration: 10000,
        });

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

  if (isWaitingForVerification) {
    return (
        <div className="text-center py-8 space-y-4">
            <Hourglass className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
            <h3 className="text-2xl font-bold">Complete Verification</h3>
            <p className="text-base text-muted-foreground">
                A verification link has been sent to <span className="font-bold text-foreground">{email}</span>. Click the link to finish signing up.
            </p>
            <p className="text-sm text-muted-foreground">This page will update automatically.</p>
        </div>
    )
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
            {password.length > 0 && <PasswordStrengthIndicator criteria={passwordCriteria} />}
        </div>
        
        <Button type="submit" className="w-full font-bold text-base h-12 rounded-full slide-in-button" disabled={isSubmitting || !email || !password || !name || !Object.values(passwordCriteria).every(Boolean)}>
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
