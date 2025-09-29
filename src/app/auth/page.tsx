
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="relative flex items-center justify-center h-full">
      <Image
        src="/auth-background.png" 
        alt="Community background"
        fill
        className="object-cover -z-10"
        data-ai-hint="community people"
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm -z-10" />
      <Card className="w-full max-w-sm bg-card/80">
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
