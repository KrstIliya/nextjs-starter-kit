import SectionContainer from "@/components/space/section-container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Puzzle,
  BookOpen,
  Calculator,
  Palette,
  Music,
} from "lucide-react";

const services = [
  {
    icon: Puzzle,
    title: "Memory Games",
    description: "Match cards and remember patterns to make your memory stronger.",
  },
  {
    icon: Calculator,
    title: "Number Games",
    description: "Learn to count, add, and compare numbers with easy puzzles.",
  },
  {
    icon: BookOpen,
    title: "Word Games",
    description: "Practice letters, words, and simple reading through fun challenges.",
  },
  {
    icon: Palette,
    title: "Art and Colors",
    description: "Draw, paint, and learn about colors in a creative space.",
  },
  {
    icon: Music,
    title: "Sound and Music",
    description: "Play with sounds and rhythms to sharpen your listening skills.",
  },
];

export default function WhatWeOffer() {
  return (
    <SectionContainer id="services">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          What We Offer
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Fun activities to help you learn and grow. Start your free trial and unlock all games!
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.title}
              className="bg-card border-border/50"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="rounded-xl bg-primary/10 p-3 w-fit">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
