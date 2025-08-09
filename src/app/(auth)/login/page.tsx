"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you'd have authentication logic here that
    // verifies the user's credentials and their institute affiliation.
    // For this demo, we'll simulate a successful login for the default institute.
    
    // 1. Authenticate user credentials (e.g., call Firebase Auth)
    // 2. Look up the user's institute ID from your database.
    // 3. Securely load data ONLY for that institute.
    
    toast({
      title: "Login Successful",
      description: "Loading your institute's dashboard.",
    });

    router.push("/dashboard");
  };

  return (
    <Card>
      <form onSubmit={handleLogin}>
        <CardHeader className="text-center">
          <CardTitle>Institute Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your institute's account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@institute.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            Log in
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an institute account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Register
            </Link>
          </div>
           <div className="text-center text-sm text-muted-foreground mt-2">
            Are you a student?{" "}
            <Link href="#" className="font-semibold text-primary hover:underline">
              Login here
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
