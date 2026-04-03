import CTAButton from "@/components/space/cta-button";
import SectionContainer from "@/components/space/section-container";
import { Sparkles } from "lucide-react";

interface HeroDict {
  badge: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export default function HeroSection({ dict, lang }: { dict: HeroDict; lang: string }) {
  return (
    <SectionContainer className="pt-24 md:pt-32 pb-16">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-2 text-sm text-primary mb-8 tracking-wide">
          <Sparkles className="h-4 w-4" />
          <span>{dict.badge}</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-tight">
          {dict.title}
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {dict.description}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton href={`/${lang}/sign-up`} variant="primary">
            {dict.ctaPrimary}
          </CTAButton>
          <CTAButton href="#about" variant="secondary">
            {dict.ctaSecondary}
          </CTAButton>
        </div>
      </div>
    </SectionContainer>
  );
}
