"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Mail, KeyRound, User, Loader2, Phone, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { cn } from "@/lib/utils";

const checkPasswordStrength = (password: string) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[\W_]/.test(password),
});

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().refine(
    (password) => {
      const strength = checkPasswordStrength(password);
      return Object.values(strength).every(Boolean);
    },
    {
      message: "Password does not meet all the strength requirements.",
    }
  ),
});

const PasswordRequirement = ({ label, met }: { label: string, met: boolean }) => (
    <div className={cn("flex items-center gap-2", met ? "text-green-600" : "text-muted-foreground/80")}>
        {met ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
        <span>{label}</span>
    </div>
);


export function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
     mode: 'onTouched'
  });

  const password = form.watch("password");
  const passwordStrength = checkPasswordStrength(password || "");
  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      const profileData = {
        name: values.name,
        email: values.email,
        phone: "",
        postalCode: "",
        avatarUrl: "",
      };
      const userDocRef = doc(firestore, "users", user.uid);

      // Create a user profile document in Firestore
      setDoc(userDocRef, profileData)
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
              path: userDocRef.path,
              operation: 'create',
              requestResourceData: profileData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
      
      toast({
        title: "Account Created!",
        description: "You have been successfully signed up.",
      });

      router.push('/');

    } catch (error: any) {
       if (error.code === 'auth/configuration-not-found') {
         toast({
            variant: "destructive",
            title: "Action Required: Enable Email Sign-In",
            description: "Email/Password sign-in must be enabled in your Firebase project. Please go to the Firebase Console -> Authentication -> Sign-in method and enable the 'Email/Password' provider.",
            duration: 10000,
        });
       } else if (error.code === 'auth/email-already-in-use') {
         toast({
            variant: "destructive",
            title: "Sign Up Failed",
            description: "An account with this email address already exists.",
            action: <Button asChild variant="secondary"><Link href="/login">Login</Link></Button>
         });
       }
       else {
         toast({
            variant: "destructive",
            title: "Sign Up Failed",
            description: error.message || "An unexpected error occurred.",
          });
       }
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your details to sign up with email.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <FormControl>
                      <Input id="name" placeholder="Your Name" {...field} className="pl-10"/>
                    </FormControl>
                     <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <FormControl>
                      <Input id="email" type="email" placeholder="your.email@example.com" {...field} className="pl-10"/>
                    </FormControl>
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <FormControl>
                      <Input id="password" type="password" placeholder="********" {...field} className="pl-10"/>
                    </FormControl>
                     <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                  {(form.formState.isDirty || form.formState.isTouched) && password && (
                    <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-muted">
                                <div 
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300",
                                        strengthScore < 3 && "bg-destructive w-[20%]",
                                        strengthScore === 3 && "bg-yellow-500 w-[50%]",
                                        strengthScore === 4 && "bg-yellow-500 w-[75%]",
                                        strengthScore === 5 && "bg-green-500 w-[100%]"
                                    )}
                                />
                            </div>
                            <span className={cn(
                                "text-xs font-medium w-14 text-right",
                                strengthScore < 3 && "text-destructive",
                                strengthScore >= 3 && strengthScore < 5 && "text-yellow-500",
                                strengthScore === 5 && "text-green-500"
                            )}>
                                {
                                    strengthScore < 3 ? 'Weak' :
                                    strengthScore < 5 ? 'Medium' :
                                    'Strong'
                                }
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
                            <PasswordRequirement label="At least 8 characters" met={passwordStrength.length} />
                            <PasswordRequirement label="One uppercase letter" met={passwordStrength.uppercase} />
                            <PasswordRequirement label="One lowercase letter" met={passwordStrength.lowercase} />
                            <PasswordRequirement label="One number" met={passwordStrength.number} />
                            <PasswordRequirement label="One special character" met={passwordStrength.special} />
                        </div>
                    </div>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-bold text-base glossy-button" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : 'Sign Up'}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="underline font-semibold text-primary hover:text-primary/80">Login</Link>
        </div>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-muted-foreground/50"></div>
            <span className="flex-shrink mx-4 text-muted-foreground text-xs">OR</span>
            <div className="flex-grow border-t border-muted-foreground/50"></div>
        </div>

        <Button asChild variant="outline" className="w-full">
            <Link href="/phone-login">
                <Phone className="mr-2 h-4 w-4" />
                Continue with Phone
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
