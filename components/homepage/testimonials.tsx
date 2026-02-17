import SectionContainer from "@/components/space/section-container";
import TestimonialCard from "@/components/space/testimonial-card";

const testimonials = [
    {
        author: "Sarah M., Parent",
        rating: 5,
        description:
            "My son loves the games! He plays every day and I can see how much his memory has improved. The simple design makes it easy for him to use on his own.",
    },
    {
        author: "David K., Therapist",
        rating: 5,
        description:
            "I recommend Ablio to the families I work with. The games are well designed for cognitive training and the kids really enjoy playing them.",
    },
    {
        author: "Maria L., Parent",
        rating: 4,
        description:
            "Great app for my daughter. She finds the colors and sounds very fun. It is wonderful to see her learn while having a good time.",
    },
];

export default function Testimonials() {
    return (
        <SectionContainer id="testimonials">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    What Parents Say
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Hear from families and therapists who use Ablio every day.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
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
