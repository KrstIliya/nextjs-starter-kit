"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageContainer from "@/components/space/page-container";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { Rocket } from "lucide-react";

function SignUpContent() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  return (
    <PageContainer>
      <div className="flex flex-col justify-center items-center w-full min-h-screen px-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground mb-8">
          <Rocket className="h-7 w-7 text-primary" />
          <span>Ablio</span>
        </Link>

        <Card className="max-w-md w-full bg-card border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl md:text-2xl">
              Join Ablio
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Create your free account and start playing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div
                className={cn(
                  "w-full gap-2 flex items-center",
                  "justify-between flex-col",
                )}
              >
                <Button
                  variant="outline"
                  className={cn("w-full gap-2 min-h-12 text-base")}
                  disabled={loading}
                  onClick={async () => {
                    try {
                      await authClient.signIn.social(
                        {
                          provider: "google",
                          callbackURL: returnTo || "/pricing",
                        },
                        {
                          onRequest: () => {
                            setLoading(true);
                          },
                          onResponse: () => {
                            setLoading(false);
                          },
                          onError: (error) => {
                            setLoading(false);
                            console.error("Sign-up error:", error);
                          },
                        },
                      );
                    } catch (error) {
                      setLoading(false);
                      console.error("Sign-up failed:", error);
                      toast.error("Oops, something went wrong", {
                        duration: 5000,
                      });
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.98em"
                    height="1em"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    ></path>
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                  </svg>
                  Sign up with Google
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </PageContainer>
  );
}

export default function SignUp() {
  return (
    <Suspense
      fallback={
        <PageContainer>
          <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <div className="max-w-md w-full bg-card animate-pulse rounded-lg h-64"></div>
          </div>
        </PageContainer>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
