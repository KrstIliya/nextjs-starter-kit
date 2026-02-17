import { Rocket } from "lucide-react";
import Link from "next/link";

const links = [
  { title: "Terms of Service", href: "/terms-of-service" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Pricing", href: "/pricing" },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-border/40 bg-card/30 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Rocket className="h-5 w-5 text-primary" />
            <span>Ablio</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3" aria-label="Footer navigation">
            {links.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm min-h-12 flex items-center"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Ablio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
