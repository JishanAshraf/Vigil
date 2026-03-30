import { LoginForm } from '@/components/login-form';
import { EmailAuthForm } from '@/components/email-auth-form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
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
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="magiclink">Magic Link</TabsTrigger>
            </TabsList>
            <TabsContent value="password">
                <Card className="rounded-t-none">
                    <CardHeader className="text-center">
                        <CardTitle>Welcome Back</CardTitle>
                        <CardDescription>Log in to your Vigil account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="magiclink">
                <Card className="rounded-t-none">
                    <CardHeader className="text-center">
                        <CardTitle>Passwordless Log In</CardTitle>
                        <CardDescription>We'll send a magic link to your inbox.</CardDescription>
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
