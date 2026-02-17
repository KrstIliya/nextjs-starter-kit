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

export default async function Home() {
  const subscriptionDetails = await getSubscriptionDetails();

  return (
    <PageContainer>
      <Header />
      <HeroSection />
      <AboutSection />
      <WhatWeOffer />
      <SectionContainer id="pricing">
        <PricingTable subscriptionDetails={subscriptionDetails} />
      </SectionContainer>
      <Testimonials />
      <FooterSection />
    </PageContainer>
  );
}
