import { Rocket } from "lucide-react";
import Link from "next/link";

interface FooterDict {
  termsOfService: string;
  privacyPolicy: string;
  pricing: string;
  copyright: string;
}

export default function FooterSection({ dict, lang }: { dict: FooterDict; lang: string }) {
  const links = [
    { title: dict.termsOfService, href: `/${lang}/terms-of-service` },
    { title: dict.privacyPolicy, href: `/${lang}/privacy-policy` },
    { title: dict.pricing, href: `/${lang}/pricing` },
  ];

  return (
    <footer className="bg-surface-container-lowest py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 text-lg font-display font-bold text-foreground">
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
            {dict.copyright.replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
}
