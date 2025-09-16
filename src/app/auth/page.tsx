
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Logo className="w-auto h-12 mx-auto mb-4 text-primary" />
          <CardTitle className="text-2xl font-bold">
            Welcome to Townish
          </CardTitle>
          <CardDescription>
            Your community safety and health assistant.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild className="w-full glossy-button" size="lg">
            <Link href="/login">
              Sign In <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full glossy-button" size="lg">
            <Link href="/login">
                Sign Up
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
