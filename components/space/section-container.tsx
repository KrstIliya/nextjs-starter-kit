import { ReactNode } from "react";

interface SectionContainerProps {
    children: ReactNode;
    id?: string;
    className?: string;
}

export default function SectionContainer({ children, id, className = "" }: SectionContainerProps) {
    return (
        <section id={id} className={`py-16 md:py-20 ${className}`}>
            <div className="mx-auto max-w-5xl px-6">
                {children}
            </div>
        </section>
    );
}
