"use client";

import { Button } from "@/components/ui/button";
import { Globe, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const planets = [
    { label: "Mars", href: "/dashboard/mars", icon: Globe },
    { label: "Earth", href: "/dashboard", icon: Globe },
    { label: "Moon", href: "/dashboard/moon", icon: Moon },
];

export default function PlanetNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-center gap-2 py-4" aria-label="Planet navigation">
            {planets.map((planet) => {
                const isActive = pathname === planet.href;
                const Icon = planet.icon;

                return (
                    <Button
                        key={planet.label}
                        asChild
                        variant={isActive ? "default" : "ghost"}
                        size="lg"
                        className={`min-h-12 px-4 md:px-6 rounded-full ${isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Link href={planet.href} prefetch={true}>
                            <Icon className="h-4 w-4 mr-1.5" />
                            <span>{planet.label}</span>
                        </Link>
                    </Button>
                );
            })}
        </nav>
    );
}
