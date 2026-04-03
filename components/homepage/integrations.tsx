import SectionContainer from "@/components/space/section-container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Puzzle,
  BookOpen,
  Calculator,
  Palette,
  Music,
} from "lucide-react";

const serviceIcons = [Puzzle, Calculator, BookOpen, Palette, Music];

interface ServiceItem {
  title: string;
  description: string;
}

interface ServicesDict {
  title: string;
  description: string;
  items: ServiceItem[];
}

export default function WhatWeOffer({ dict }: { dict: ServicesDict }) {
  return (
    <SectionContainer id="services">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          {dict.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {dict.description}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dict.items.map((service, index) => {
          const Icon = serviceIcons[index];
          return (
            <Card
              key={service.title}
              className="bg-card"
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
