import { SignupForm } from '@/components/signup-form';
import { EmailAuthForm } from '@/components/email-auth-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SignupPage() {
  return (
    <div className="relative z-10 flex flex-col h-full">
      <div className="p-4">
          <Button asChild variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground">
              <Link href="/auth">
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Back
              </Link>
          </Button>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center p-4 -mt-16">
        <Tabs defaultValue="password" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password">Sign Up</TabsTrigger>
                <TabsTrigger value="magiclink">Magic Link</TabsTrigger>
            </TabsList>
            <TabsContent value="password">
                <Card className="rounded-t-none">
                    <CardHeader className="text-center">
                        <CardTitle>Create an Account</CardTitle>
                        <CardDescription>Join the Vigil community.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignupForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="magiclink">
                <Card className="rounded-t-none">
                     <CardHeader className="text-center">
                        <CardTitle>Passwordless Sign In/Up</CardTitle>
                        <CardDescription>Enter your email to log in or create an account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EmailAuthForm />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
