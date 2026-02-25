import { ReactNode } from "react";
import DashboardShell from "./_components/navbar";
import { getSubscriptionDetails } from "@/lib/subscription";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const subscriptionDetails = await getSubscriptionDetails();

  if (!subscriptionDetails.hasSubscription || !subscriptionDetails.subscription || subscriptionDetails.subscription.status !== "active") {
    redirect("/pricing");
  }

  return (
    <div className="flex flex-col h-screen w-full space-gradient-bg">
      <DashboardShell>
        {children}
      </DashboardShell>
    </div>
  );
}
