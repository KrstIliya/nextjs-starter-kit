import SectionContainer from "@/components/space/section-container";
import TestimonialCard from "@/components/space/testimonial-card";

interface TestimonialItem {
    author: string;
    rating: number;
    description: string;
}

interface TestimonialsDict {
    title: string;
    description: string;
    items: TestimonialItem[];
}

export default function Testimonials({ dict }: { dict: TestimonialsDict }) {
    return (
        <SectionContainer id="testimonials">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    {dict.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    {dict.description}
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dict.items.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.author}
                        author={testimonial.author}
                        rating={testimonial.rating}
                        description={testimonial.description}
                    />
                ))}
            </div>
        </SectionContainer>
    );
}
