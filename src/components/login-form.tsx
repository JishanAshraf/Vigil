
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Mail, Phone } from "lucide-react";

export function LoginForm() {
  const [loginMethod, setLoginMethod] = useState("email");

  return (
    <Card className="w-full max-w-md mx-auto rounded-t-3xl rounded-b-none border-none shadow-2xl animate-in slide-in-from-bottom-16 duration-500">
      <CardHeader className="text-center pt-8 pb-4">
        <CardTitle className="text-3xl font-bold text-primary">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="email" className="w-full" onValueChange={setLoginMethod}>
          <div className="space-y-6">
            <TabsContent value="email" className="m-0">
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
            </TabsContent>
            <TabsContent value="phone" className="m-0">
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
            </TabsContent>

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
                  Or continue with
                </span>
              </div>
            </div>

            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
