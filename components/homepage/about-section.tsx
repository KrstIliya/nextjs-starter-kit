import SectionContainer from "@/components/space/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Gamepad2, TrendingUp } from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "Brain Training",
        description: "Games that help you think faster and remember better.",
    },
    {
        icon: Gamepad2,
        title: "Fun Games",
        description: "Play colorful games that are easy to understand and enjoy.",
    },
    {
        icon: TrendingUp,
        title: "Track Your Progress",
        description: "See how much you have improved over time with simple charts.",
    },
];

export default function AboutSection() {
    return (
        <SectionContainer id="about">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    What is Ablio?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Ablio is a fun platform that helps you build your thinking skills.
                    We use simple games to make learning feel like play.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <Card
                            key={feature.title}
                            className="bg-card border-border/50 hover:border-primary/30 transition-colors"
                        >
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <div className="rounded-xl bg-primary/10 p-3">
                                    <Icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </SectionContainer>
    );
}
