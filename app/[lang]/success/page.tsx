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
import { useRouter, useParams } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const params = useParams();
  const lang = (params.lang as string) || "sr";

  const dict = {
    title: lang === "sr" ? "Plaćanje uspešno!" : "Payment Successful!",
    description: lang === "sr" ? "Hvala! Vaš nalog je sada spreman. Možete početi da igrate sve igre." : "Thank you! Your account is now ready. You can start playing all games.",
    welcome: lang === "sr" ? "Dobrodošli u tim!" : "Welcome to the team!",
    goToDashboard: lang === "sr" ? "Idi na kontrolnu tablu" : "Go to Dashboard",
    receiptNote: lang === "sr" ? "Uskoro ćete dobiti email potvrdu sa računom." : "You will get a confirmation email with your receipt soon.",
  };

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
              {dict.title}
            </CardTitle>
            <CardDescription className="text-base">
              {dict.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>{dict.welcome}</span>
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </div>

            <Button
              onClick={() => router.push(`/${lang}/dashboard`)}
              className="w-full font-medium min-h-12 text-base"
              size="lg"
            >
              {dict.goToDashboard}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-xs text-muted-foreground">
              {dict.receiptNote}
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
