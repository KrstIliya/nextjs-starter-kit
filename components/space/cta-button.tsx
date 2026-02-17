import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface CTAButtonProps {
    href: string;
    children: ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
}

export default function CTAButton({
    href,
    children,
    variant = "primary",
    className = "",
}: CTAButtonProps) {
    return (
        <Button
            asChild
            variant={variant === "primary" ? "default" : "outline"}
            size="lg"
            className={`min-h-12 text-lg px-8 font-medium ${className}`}
        >
            <Link href={href} prefetch={true}>
                {children}
            </Link>
        </Button>
    );
}
