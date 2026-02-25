import PageContainer from "@/components/space/page-container";
import { getSubscriptionDetails } from "@/lib/subscription";
import PricingTable from "./_component/pricing-table";

export default async function PricingPage() {
  const subscriptionDetails = await getSubscriptionDetails();

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-6 px-6">
        <PricingTable subscriptionDetails={subscriptionDetails} />
      </div>
    </PageContainer>
  );
}
