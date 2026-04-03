"use client";

import UserProfile from "@/components/user-profile";
import { Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/language-switcher";

export default function DashboardHeader({ lang: langProp }: { lang?: string }) {
    const pathname = usePathname();
    const params = useParams();
    const lang = langProp || (params.lang as string) || "sr";

    const dict = {
        journeys: lang === "sr" ? "Putovanja" : "Journeys",
        profile: lang === "sr" ? "Profil" : "Profile",
    };

    const navItems = [
        { label: dict.journeys, href: `/${lang}/dashboard`, icon: Home },
        { label: dict.profile, href: `/${lang}/dashboard/profile`, icon: User },
    ];

    return (
        <header className="flex items-center justify-between px-8 py-5 bg-transparent w-full">
            {/* Logo */}
            <div className="flex items-center w-48">
                <Link href={`/${lang}`} className="text-2xl font-display font-bold text-primary tracking-tight">
                    Ablio
                </Link>
            </div>

            {/* Center Nav */}
            <nav className="hidden md:flex flex-1 items-center justify-center gap-10" aria-label="Main navigation">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.label === dict.journeys && pathname.startsWith(`/${lang}/dashboard/journeys`));
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

            {/* Right Profile Widget + Language Switcher */}
            <div className="flex items-center w-48 justify-end gap-3">
                <LanguageSwitcher />
                <div className="text-primary hover:text-primary/80 transition-colors">
                    <UserProfile mini={true} lang={lang} />
                </div>
            </div>
        </header>
    );
}
