
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

export function LoginForm() {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="emailOrPhone">Email or Phone Number</Label>
        <Input 
          id="emailOrPhone" 
          type="text" 
          placeholder="m@example.com or +1 234..." 
          required 
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <Button asChild type="submit" className="w-full glossy-button">
        <Link href="/">Login / Sign Up</Link>
      </Button>
    </div>
  );
}
