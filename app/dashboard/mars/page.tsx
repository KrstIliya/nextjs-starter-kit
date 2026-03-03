import { auth } from "@/lib/auth";
import { getSubscriptionDetails } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MarsPage() {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result?.session?.userId) {
        redirect("/sign-in");
    }

    const subscriptionDetails = await getSubscriptionDetails();
    const hasSubscription =
        subscriptionDetails.subscription?.status === "active" && subscriptionDetails.subscription?.productId === process.env.NEXT_PUBLIC_STARTER_TIER;;

    if (!hasSubscription) {
        return (
            <section className="flex flex-col items-center justify-center flex-1 p-6 w-full">
                <Card className="max-w-md w-full bg-card border-border/50 text-center">
                    <CardContent className="p-8 space-y-6">
                        <div className="mx-auto rounded-full bg-primary/10 p-4 w-fit">
                            <Lock className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Mars is Locked
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            You need to upgrade your ships engines to reach Mars and its games.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Button asChild size="lg" className="min-h-12 text-base w-full">
                                <Link href="/pricing">Upgrade Ship Engines!</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="min-h-12 text-base w-full">
                                <Link href="/dashboard">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Earth
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center flex-1 p-6 w-full">
            {/* Mars content goes here */}
        </section>
    );
}
