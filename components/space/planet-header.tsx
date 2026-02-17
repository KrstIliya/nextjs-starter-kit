"use client";

import { Button } from "@/components/ui/button";
import UserProfile from "@/components/user-profile";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader() {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-transparent">
            {/* Back to Home */}
            <Button
                asChild
                variant="ghost"
                size="lg"
                className="min-h-12 min-w-12 p-2 rounded-full"
                aria-label="Back to home"
            >
                <Link href="/" prefetch={true}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only md:not-sr-only md:ml-2">Home</span>
                </Link>
            </Button>

            {/* Profile */}
            <div className="flex items-center">
                <UserProfile mini={true} />
            </div>
        </header>
    );
}
