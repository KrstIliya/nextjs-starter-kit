import { ReactNode } from "react";

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

export default function PageContainer({ children, className = "" }: PageContainerProps) {
    return (
        <div className={`min-h-screen space-gradient-bg ${className}`}>
            {children}
        </div>
    );
}
