import PageContainer from "@/components/space/page-container";
import { Button } from "@/components/ui/button";
import { getSubscriptionDetails } from "@/lib/subscription";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PricingTable from "./_component/pricing-table";

export default async function PricingPage() {
  const subscriptionDetails = await getSubscriptionDetails();

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-16 px-6">
        <PricingTable subscriptionDetails={subscriptionDetails} />
      </div>
    </PageContainer>
  );
}
