import SectionContainer from "@/components/space/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Puzzle,
  BookOpen,
  Calculator,
  Palette,
  Music,
  Shapes,
} from "lucide-react";

const services = [
  {
    icon: Shapes,
    title: "Free Experience",
    description: "Start playing right away with fun shape and color games — no payment needed.",
    free: true,
  },
  {
    icon: Puzzle,
    title: "Memory Games",
    description: "Match cards and remember patterns to make your memory stronger.",
    free: false,
  },
  {
    icon: Calculator,
    title: "Number Games",
    description: "Learn to count, add, and compare numbers with easy puzzles.",
    free: false,
  },
  {
    icon: BookOpen,
    title: "Word Games",
    description: "Practice letters, words, and simple reading through fun challenges.",
    free: false,
  },
  {
    icon: Palette,
    title: "Art and Colors",
    description: "Draw, paint, and learn about colors in a creative space.",
    free: false,
  },
  {
    icon: Music,
    title: "Sound and Music",
    description: "Play with sounds and rhythms to sharpen your listening skills.",
    free: false,
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
          Fun activities to help you learn and grow. Start for free and unlock more games!
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.title}
              className={`bg-card border-border/50 relative ${service.free ? "border-primary/40 ring-1 ring-primary/20" : ""
                }`}
            >
              {service.free && (
                <div className="absolute -top-3 left-4">
                  <Badge className="bg-primary text-primary-foreground text-xs px-3 py-1">
                    Free
                  </Badge>
                </div>
              )}
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
