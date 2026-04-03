"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n, type Locale } from "@/lib/i18n-config";
import { ChevronRight, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from pathname
  const currentLocale = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  ) || i18n.defaultLocale;

  const handleToggle = () => {
    // Toggle between sr and en. If we add more locales later, we'd cycle through them.
    const newLocale = currentLocale === "sr" ? "en" : "sr";

    // Replace the locale prefix in the pathname
    let newPath = pathname;
    for (const locale of i18n.locales) {
      if (pathname.startsWith(`/${locale}/`)) {
        newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
        break;
      }
      if (pathname === `/${locale}`) {
        newPath = `/${newLocale}`;
        break;
      }
    }

    router.push(newPath);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/60 text-muted-foreground hover:text-foreground hover:bg-surface-bright/40 transition-all duration-200 border border-outline-variant/30 group"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
      <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide">
        <span className={currentLocale === 'sr' ? "text-foreground" : "text-muted-foreground/50"}>SR</span>
        <span className="text-muted-foreground/30">/</span>
        <span className={currentLocale === 'en' ? "text-foreground" : "text-muted-foreground/50"}>EN</span>
      </div>
    </button>
  );
}
