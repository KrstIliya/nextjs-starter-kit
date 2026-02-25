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
import { CheckCircle, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Activating your subscription…");
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 15; // 15 × 2s = 30-second window
    let timer: ReturnType<typeof setTimeout>;

    const pollSubscription = async () => {
      try {
        const res = await fetch("/api/subscription");
        if (res.ok) {
          const data = await res.json();
          if (data.hasSubscription) {
            setIsReady(true);
            setStatusMessage("Your account is ready!");
            // Auto-navigate after a brief celebration moment
            timer = setTimeout(() => router.push("/dashboard"), 1500);
            return;
          }
        }
      } catch {
        // network error — keep polling
      }

      attempts++;
      if (attempts >= maxAttempts) {
        setTimedOut(true);
        setStatusMessage("Taking longer than expected…");
        return;
      }

      timer = setTimeout(pollSubscription, 2000);
    };

    timer = setTimeout(pollSubscription, 1500); // initial delay
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <PageContainer>
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center bg-card border-border/50">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 relative">
              <div className="absolute inset-0 animate-ping">
                <CheckCircle className="h-16 w-16 text-primary mx-auto opacity-75" />
              </div>
              <CheckCircle className="h-16 w-16 text-primary mx-auto relative" />
            </div>
            <CardTitle className="text-2xl font-bold mb-2">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-base">
              Thank you! Your account is now ready. You can start playing all games.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Welcome to the team!</span>
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </div>

            {/* Status indicator */}
            {!isReady && !timedOut && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{statusMessage}</span>
              </div>
            )}

            {isReady && (
              <div className="flex items-center justify-center gap-2 text-sm text-green-500">
                <CheckCircle className="h-4 w-4" />
                <span>{statusMessage}</span>
              </div>
            )}

            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full font-medium min-h-12 text-base"
              size="lg"
              disabled={!isReady && !timedOut}
            >
              {isReady ? (
                <>
                  Going to Dashboard…
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : timedOut ? (
                <>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up your account…
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground">
              You will get a confirmation email with your receipt soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
