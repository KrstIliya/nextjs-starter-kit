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
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

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

            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full font-medium min-h-12 text-base"
              size="lg"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
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
