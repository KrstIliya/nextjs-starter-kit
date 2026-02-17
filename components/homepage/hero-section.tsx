import CTAButton from "@/components/space/cta-button";
import SectionContainer from "@/components/space/section-container";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <SectionContainer className="pt-24 md:pt-32 pb-16">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary mb-8">
          <Sparkles className="h-4 w-4" />
          <span>Fun games for learning</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
          Learn and Grow with Fun Games
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Ablio helps you build your brain power through colorful, easy-to-play games.
          Made for you, at your own speed.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton href="/sign-up" variant="primary">
            Sign Up for Free
          </CTAButton>
          <CTAButton href="#about" variant="secondary">
            Learn More
          </CTAButton>
        </div>
      </div>
    </SectionContainer>
  );
}
