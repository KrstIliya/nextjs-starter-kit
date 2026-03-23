"use client";

import UserProfile from "@/components/user-profile";
import { Home, Gamepad2, Info, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardHeader() {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", href: "/dashboard", icon: Home },
        { label: "Games", href: "#", icon: Gamepad2 },
        { label: "About", href: "#", icon: Info },
        { label: "Profile", href: "/dashboard/profile", icon: User },
    ];

    return (
        <header className="flex items-center justify-between px-8 py-5 bg-transparent w-full">
            {/* Logo */}
            <div className="flex items-center w-48">
                <Link href="/" className="text-2xl font-display font-bold text-primary tracking-tight">
                    Ablio
                </Link>
            </div>

            {/* Center Nav */}
            <nav className="hidden md:flex flex-1 items-center justify-center gap-10" aria-label="Main navigation">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.label === "Home" && pathname.startsWith("/dashboard/journeys"));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 text-sm font-medium transition-colors relative py-2",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="h-[18px] w-[18px]" />
                            {item.label}
                            {isActive && (
                                <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-primary rounded-full"></span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Right Profile Widget */}
            <div className="flex items-center w-48 justify-end">
                <div className="text-primary hover:text-primary/80 transition-colors">
                    <UserProfile mini={true} />
                </div>
            </div>
        </header>
    );
}
