"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Mail, KeyRound, User, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase";


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

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
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Create a user profile document in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        name: values.name,
        email: values.email,
        phone: "",
        postalCode: "",
        avatarUrl: "",
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
        <CardDescription>Enter your details to sign up.</CardDescription>
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
      </CardContent>
    </Card>
  );
}
