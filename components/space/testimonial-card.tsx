import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
    author: string;
    rating: number;
    description: string;
    avatar?: string;
}

export default function TestimonialCard({
    author,
    rating,
    description,
}: TestimonialCardProps) {
    return (
        <Card className="bg-card border-border/50 h-full">
            <CardContent className="p-6 flex flex-col gap-4">
                {/* Star Rating */}
                <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`h-5 w-5 ${i < rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground/30"
                                }`}
                        />
                    ))}
                </div>

                {/* Description */}
                <p className="text-foreground/90 leading-relaxed text-base">
                    {description}
                </p>

                {/* Author */}
                <p className="text-muted-foreground font-medium text-sm mt-auto">
                    — {author}
                </p>
            </CardContent>
        </Card>
    );
}
