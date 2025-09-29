
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Vigil</CardTitle>
          <CardDescription>Your community watch platform. <br/> Join us to stay connected and safe.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <Button asChild className="w-full font-bold text-base glossy-button">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-full font-bold text-base glossy-button">
              <Link href="/signup">Sign Up</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
