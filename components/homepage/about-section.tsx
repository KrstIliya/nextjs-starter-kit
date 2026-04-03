import SectionContainer from "@/components/space/section-container";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Gamepad2, TrendingUp } from "lucide-react";

const featureIcons = [Brain, Gamepad2, TrendingUp];

interface AboutFeature {
    title: string;
    description: string;
}

interface AboutDict {
    title: string;
    description: string;
    features: AboutFeature[];
}

export default function AboutSection({ dict }: { dict: AboutDict }) {
    return (
        <SectionContainer id="about">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    {dict.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    {dict.description}
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dict.features.map((feature, index) => {
                    const Icon = featureIcons[index];
                    return (
                        <Card
                            key={feature.title}
                            className="bg-card"
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
