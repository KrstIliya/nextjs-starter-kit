"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SubscriptionDetails = {
  id: string;
  productId: string;
  status: string;
  amount: number;
  currency: string;
  recurringInterval: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  organizationId: string | null;
};

type SubscriptionDetailsResult = {
  hasSubscription: boolean;
  subscription?: SubscriptionDetails;
  error?: string;
  errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
};

interface PricingDict {
  title: string;
  description: string;
  currentPlan: string;
  planName: string;
  planDescription: string;
  perMonth: string;
  features: string[];
  manageSubscription: string;
  expires: string;
  renews: string;
  signInToGetStarted: string;
  getStarted: string;
  customPlan: string;
  contactUs: string;
  checkoutFailed: string;
  portalFailed: string;
}

interface PricingTableProps {
  subscriptionDetails: SubscriptionDetailsResult;
  dict: PricingDict;
  lang: string;
}

export default function PricingTable({
  subscriptionDetails,
  dict,
  lang,
}: PricingTableProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session.data?.user);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleCheckout = async (productId: string, slug: string) => {
    if (isAuthenticated === false) {
      router.push(`/${lang}/sign-in`);
      return;
    }

    try {
      await authClient.checkout({
        products: [productId],
        slug: slug,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error(dict.checkoutFailed);
    }
  };

  const handleManageSubscription = async () => {
    try {
      await authClient.customer.portal();
    } catch (error) {
      console.error("Failed to open customer portal:", error);
      toast.error(dict.portalFailed);
    }
  };

  const STARTER_TIER = process.env.NEXT_PUBLIC_STARTER_TIER;
  const STARTER_SLUG = process.env.NEXT_PUBLIC_STARTER_SLUG;

  if (!STARTER_TIER || !STARTER_SLUG) {
    throw new Error("Missing required environment variables for Starter tier");
  }

  const isCurrentPlan = (tierProductId: string) => {
    return (
      subscriptionDetails.hasSubscription &&
      subscriptionDetails.subscription?.productId === tierProductId &&
      subscriptionDetails.subscription?.status === "active"
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(lang === "sr" ? "sr-RS" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 mb-24 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-medium tracking-tight mb-4">
          {dict.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {dict.description}
        </p>
      </div>

      <div className="flex justify-center max-w-4xl w-full">
        {/* Starter Tier */}
        <Card className="relative h-fit w-1/2">
          {isCurrentPlan(STARTER_TIER) && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge
                variant="secondary"
                className="bg-secondary-container text-secondary-foreground hover:bg-secondary-container/80"
              >
                {dict.currentPlan}
              </Badge>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">{dict.planName}</CardTitle>
            <CardDescription>{dict.planDescription}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$4.99</span>
              <span className="text-muted-foreground">{dict.perMonth}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {dict.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            {isCurrentPlan(STARTER_TIER) ? (
              <div className="w-full space-y-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleManageSubscription}
                >
                  {dict.manageSubscription}
                </Button>
                {subscriptionDetails.subscription && (
                  <p className="text-sm text-muted-foreground text-center">
                    {subscriptionDetails.subscription.cancelAtPeriodEnd
                      ? dict.expires.replace("{date}", formatDate(subscriptionDetails.subscription.currentPeriodEnd))
                      : dict.renews.replace("{date}", formatDate(subscriptionDetails.subscription.currentPeriodEnd))}
                  </p>
                )}
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => handleCheckout(STARTER_TIER, STARTER_SLUG)}
              >
                {isAuthenticated === false
                  ? dict.signInToGetStarted
                  : dict.getStarted}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          {dict.customPlan}{" "}
          <span className="text-primary cursor-pointer hover:underline">
            {dict.contactUs}
          </span>
        </p>
      </div>
    </section>
  );
}
