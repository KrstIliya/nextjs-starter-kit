import PageContainer from "@/components/space/page-container";
import { Button } from "@/components/ui/button";
import { getSubscriptionDetails } from "@/lib/subscription";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PricingTable from "./_component/pricing-table";

export default async function PricingPage() {
  const subscriptionDetails = await getSubscriptionDetails();
  const hasSubscription =
    subscriptionDetails.hasSubscription &&
    subscriptionDetails.subscription?.status === "active";

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-16 px-6">
        <PricingTable subscriptionDetails={subscriptionDetails} />
        <Button asChild variant="ghost" size="lg" className="min-h-12 text-base mt-12 rounded-full">
          <Link href={hasSubscription ? "/dashboard" : "/"}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {hasSubscription ? "Back to Earth" : "Back to Home"}
          </Link>
        </Button>
      </div>
    </PageContainer>
  );
}
