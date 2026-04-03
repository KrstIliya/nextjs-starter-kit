import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["sr", "en"];
const defaultLocale = "sr";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return match(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
    if (pathname === `/${locale}`) {
      return "/";
    }
  }
  return pathname;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, Next.js internals, and static files
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  if (!pathnameHasLocale(pathname)) {
    // Redirect to the locale-prefixed URL
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Extract the locale-less pathname for auth checks
  const strippedPath = stripLocale(pathname);
  const sessionCookie = getSessionCookie(request);

  // Extract the current locale from the pathname
  const currentLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  ) || defaultLocale;

  // Redirect authenticated users away from sign-in/sign-up
  if (sessionCookie && ["/sign-in", "/sign-up"].includes(strippedPath)) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/dashboard`, request.url)
    );
  }

  // Redirect unauthenticated users away from dashboard
  if (!sessionCookie && strippedPath.startsWith("/dashboard")) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/sign-in`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
