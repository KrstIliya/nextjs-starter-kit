"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rocket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "@/components/language-switcher";

interface HeaderDict {
    about: string;
    services: string;
    pricing: string;
    signIn: string;
    signUp: string;
}

export default function Header({ dict, lang }: { dict: HeaderDict; lang: string }) {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { label: dict.about, href: "#about" },
        { label: dict.services, href: "#services" },
        { label: dict.pricing, href: "#pricing" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-surface-bright/60 backdrop-blur-[20px] mb-10">
            <div className="flex w-full items-center justify-between px-6 py-3 relative">
                {/* Logo */}
                <Link
                    href={`/${lang}`}
                    className="flex items-center gap-2 text-xl font-display font-bold text-foreground"
                    prefetch={true}
                >
                    <Rocket className="h-6 w-6 text-primary" />
                    <span>Ablio</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium min-h-12 flex items-center"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop Auth Buttons + Language Switcher */}
                <div className="hidden md:flex items-center gap-3">
                    <LanguageSwitcher />
                    <Button asChild variant="ghost" size="lg" className="min-h-12 text-base">
                        <Link href={`/${lang}/sign-in`} prefetch={true}>
                            {dict.signIn}
                        </Link>
                    </Button>
                    <Button asChild variant="default" size="lg" className="min-h-12 text-base">
                        <Link href={`/${lang}/sign-up`} prefetch={true}>
                            {dict.signUp}
                        </Link>
                    </Button>
                </div>

                {/* Mobile Hamburger */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="lg"
                            className="min-h-12 min-w-12 md:hidden"
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-background border-border w-72">
                        <nav className="flex flex-col gap-2 mt-8" aria-label="Mobile navigation">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="text-foreground hover:text-primary transition-colors text-lg font-medium py-3 px-4 rounded-lg hover:bg-muted min-h-12 flex items-center"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="px-4 py-2">
                                <LanguageSwitcher />
                            </div>
                            <hr className="border-border my-2" />
                            <Button asChild variant="ghost" size="lg" className="min-h-12 justify-start text-base">
                                <Link href={`/${lang}/sign-in`} prefetch={true} onClick={() => setOpen(false)}>
                                    {dict.signIn}
                                </Link>
                            </Button>
                            <Button asChild variant="default" size="lg" className="min-h-12 text-base">
                                <Link href={`/${lang}/sign-up`} prefetch={true} onClick={() => setOpen(false)}>
                                    {dict.signUp}
                                </Link>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
