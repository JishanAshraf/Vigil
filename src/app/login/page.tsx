
import { LoginForm } from '@/components/login-form';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <div className="mx-auto grid w-full max-w-sm gap-6">
        <Image
          src="https://picsum.photos/seed/loginpage/600/400"
          alt="Community photo"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
          data-ai-hint="community city"
        />

        <Card>
          <CardHeader>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold font-headline">Welcome</h1>
              <p className="text-balance text-muted-foreground">
                Login or create an account to join your community
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
