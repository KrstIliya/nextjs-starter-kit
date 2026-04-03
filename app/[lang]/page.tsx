import FooterSection from "@/components/homepage/footer";
import Header from "@/components/homepage/header";
import HeroSection from "@/components/homepage/hero-section";
import AboutSection from "@/components/homepage/about-section";
import WhatWeOffer from "@/components/homepage/integrations";
import Testimonials from "@/components/homepage/testimonials";
import PageContainer from "@/components/space/page-container";
import SectionContainer from "@/components/space/section-container";
import { getSubscriptionDetails } from "@/lib/subscription";
import PricingTable from "./pricing/_component/pricing-table";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home({
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

  return (
    <PageContainer>
      <Header dict={dict.header} lang={lang} />
      <HeroSection dict={dict.hero} lang={lang} />
      <AboutSection dict={dict.about} />
      <WhatWeOffer dict={dict.services} />
      <SectionContainer id="pricing">
        <PricingTable subscriptionDetails={subscriptionDetails} dict={dict.pricing} lang={lang} />
      </SectionContainer>
      <Testimonials dict={dict.testimonials} />
      <FooterSection dict={dict.footer} lang={lang} />
    </PageContainer>
  );
}
