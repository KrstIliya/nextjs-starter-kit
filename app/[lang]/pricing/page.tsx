import PageContainer from "@/components/space/page-container";
import { Button } from "@/components/ui/button";
import { getSubscriptionDetails } from "@/lib/subscription";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PricingTable from "./_component/pricing-table";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, subscriptionDetails] = await Promise.all([
    getDictionary(lang),
    getSubscriptionDetails(),
  ]);

  const hasSubscription =
    subscriptionDetails.hasSubscription &&
    subscriptionDetails.subscription?.status === "active";

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-16 px-6">
        <PricingTable subscriptionDetails={subscriptionDetails} dict={dict.pricing} lang={lang} />
        <Button asChild variant="ghost" size="lg" className="min-h-12 text-base mt-12 rounded-full">
          <Link href={hasSubscription ? `/${lang}/dashboard` : `/${lang}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {hasSubscription ? dict.pricing.backToEarth : dict.pricing.backToHome}
          </Link>
        </Button>
      </div>
    </PageContainer>
  );
}
