"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rocket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold text-foreground"
                    prefetch={true}
                >
                    <Rocket className="h-6 w-6 text-primary" />
                    <span>Ablio</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
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

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Button asChild variant="ghost" size="lg" className="min-h-12 text-base">
                        <Link href="/sign-in" prefetch={true}>
                            Sign In
                        </Link>
                    </Button>
                    <Button asChild variant="default" size="lg" className="min-h-12 text-base">
                        <Link href="/sign-up" prefetch={true}>
                            Sign Up
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
                            <hr className="border-border my-2" />
                            <Button asChild variant="ghost" size="lg" className="min-h-12 justify-start text-base">
                                <Link href="/sign-in" prefetch={true} onClick={() => setOpen(false)}>
                                    Sign In
                                </Link>
                            </Button>
                            <Button asChild variant="default" size="lg" className="min-h-12 text-base">
                                <Link href="/sign-up" prefetch={true} onClick={() => setOpen(false)}>
                                    Sign Up
                                </Link>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
