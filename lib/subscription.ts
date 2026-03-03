import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { subscription } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { polarClient } from "@/lib/polar";

export type SubscriptionDetails = {
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

export type SubscriptionDetailsResult = {
  hasSubscription: boolean;
  subscription?: SubscriptionDetails;
  error?: string;
  errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
};

export async function getSubscriptionDetails(): Promise<SubscriptionDetailsResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { hasSubscription: false };
    }

    const userSubscriptions = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, session.user.id));

    if (!userSubscriptions.length) {
      // ── Polar API fallback ──────────────────────────────────────────────────
      // The webhook `onPayload` is called without `await` inside
      // @polar-sh/better-auth, so the DB write can lag behind the user hitting
      // the dashboard. Check Polar directly as the authoritative source.
      try {
        const customerState = await polarClient.customers.getStateExternal({
          externalId: session.user.id,
        });

        console.log("🔍 Polar customer state for user", session.user.id, JSON.stringify({
          activeSubscriptionsCount: customerState.activeSubscriptions?.length ?? 0,
          activeSubscriptionIds: customerState.activeSubscriptions?.map((s: { id: string }) => s.id),
        }, null, 2));

        const activeSubscription = customerState.activeSubscriptions?.[0];
        if (activeSubscription) {
          return {
            hasSubscription: true,
            subscription: {
              id: activeSubscription.id,
              productId: activeSubscription.productId,
              status: String(activeSubscription.status ?? "active"),
              amount: activeSubscription.amount ?? 0,
              currency: activeSubscription.currency ?? "usd",
              recurringInterval: String(activeSubscription.recurringInterval ?? "month"),
              currentPeriodStart: new Date(activeSubscription.currentPeriodStart),
              currentPeriodEnd: activeSubscription.currentPeriodEnd
                ? new Date(activeSubscription.currentPeriodEnd)
                : new Date(),
              cancelAtPeriodEnd: activeSubscription.cancelAtPeriodEnd,
              canceledAt: activeSubscription.canceledAt
                ? new Date(activeSubscription.canceledAt)
                : null,
              organizationId: null,
            },
          };
        }

        // ── Secondary fallback: query subscriptions directly ────────────────
        // Free ($0) plans may not appear in activeSubscriptions immediately.
        // Query the subscriptions endpoint directly as a last resort.
        try {
          const { result: subsList } = await polarClient.subscriptions.list({
            customerId: customerState.id,
            active: true,
          });

          console.log("🔍 Polar subscriptions.list fallback:", JSON.stringify({
            count: subsList.items?.length ?? 0,
            subscriptions: subsList.items?.map((s: { id: string; status: string; productId: string }) => ({
              id: s.id,
              status: s.status,
              productId: s.productId,
            })),
          }, null, 2));

          const directSub = subsList.items?.[0];
          if (directSub) {
            return {
              hasSubscription: true,
              subscription: {
                id: directSub.id,
                productId: directSub.productId,
                status: String(directSub.status ?? "active"),
                amount: directSub.amount ?? 0,
                currency: directSub.currency ?? "usd",
                recurringInterval: String(directSub.recurringInterval ?? "month"),
                currentPeriodStart: new Date(directSub.currentPeriodStart),
                currentPeriodEnd: directSub.currentPeriodEnd
                  ? new Date(directSub.currentPeriodEnd)
                  : new Date(),
                cancelAtPeriodEnd: directSub.cancelAtPeriodEnd ?? false,
                canceledAt: directSub.canceledAt
                  ? new Date(directSub.canceledAt)
                  : null,
                organizationId: null,
              },
            };
          }
        } catch (subListError) {
          console.warn("Polar subscriptions.list fallback failed:", subListError);
        }
      } catch (polarError) {
        // Polar API unavailable — fall through to hasSubscription: false
        console.warn("Polar API fallback failed:", polarError);
      }
      return { hasSubscription: false };
    }

    // Get the most recent active subscription
    const activeSubscription = userSubscriptions
      .filter((sub) => sub.status === "active")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

    if (!activeSubscription) {
      // Check for canceled or expired subscriptions
      const latestSubscription = userSubscriptions
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

      if (latestSubscription) {
        const now = new Date();
        const isExpired = new Date(latestSubscription.currentPeriodEnd) < now;
        const isCanceled = latestSubscription.status === "canceled";

        return {
          hasSubscription: true,
          subscription: {
            id: latestSubscription.id,
            productId: latestSubscription.productId,
            status: latestSubscription.status,
            amount: latestSubscription.amount,
            currency: latestSubscription.currency,
            recurringInterval: latestSubscription.recurringInterval,
            currentPeriodStart: latestSubscription.currentPeriodStart,
            currentPeriodEnd: latestSubscription.currentPeriodEnd,
            cancelAtPeriodEnd: latestSubscription.cancelAtPeriodEnd,
            canceledAt: latestSubscription.canceledAt,
            organizationId: null,
          },
          error: isCanceled ? "Subscription has been canceled" : isExpired ? "Subscription has expired" : "Subscription is not active",
          errorType: isCanceled ? "CANCELED" : isExpired ? "EXPIRED" : "GENERAL",
        };
      }

      return { hasSubscription: false };
    }

    return {
      hasSubscription: true,
      subscription: {
        id: activeSubscription.id,
        productId: activeSubscription.productId,
        status: activeSubscription.status,
        amount: activeSubscription.amount,
        currency: activeSubscription.currency,
        recurringInterval: activeSubscription.recurringInterval,
        currentPeriodStart: activeSubscription.currentPeriodStart,
        currentPeriodEnd: activeSubscription.currentPeriodEnd,
        cancelAtPeriodEnd: activeSubscription.cancelAtPeriodEnd,
        canceledAt: activeSubscription.canceledAt,
        organizationId: null,
      },
    };
  } catch (error) {
    console.error("Error fetching subscription details:", error);
    return {
      hasSubscription: false,
      error: "Failed to load subscription details",
      errorType: "GENERAL",
    };
  }
}

// Simple helper to check if user has an active subscription
export async function isUserSubscribed(): Promise<boolean> {
  const result = await getSubscriptionDetails();
  return result.hasSubscription && result.subscription?.status === "active";
}

// Helper to check if user has access to a specific product/tier
export async function hasAccessToProduct(productId: string): Promise<boolean> {
  const result = await getSubscriptionDetails();
  return (
    result.hasSubscription &&
    result.subscription?.status === "active" &&
    result.subscription?.productId === productId
  );
}

// Helper to get user's current subscription status
export async function getUserSubscriptionStatus(): Promise<"active" | "canceled" | "expired" | "none"> {
  const result = await getSubscriptionDetails();

  if (!result.hasSubscription) {
    return "none";
  }

  if (result.subscription?.status === "active") {
    return "active";
  }

  if (result.errorType === "CANCELED") {
    return "canceled";
  }

  if (result.errorType === "EXPIRED") {
    return "expired";
  }

  return "none";
}