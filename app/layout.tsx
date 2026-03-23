import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lexend } from "next/font/google";
import { ThemeProvider } from "../components/provider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
});
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  title: "Ablio — Learn and Grow with Fun Games",
  description:
    "Ablio helps improve cognitive and mental abilities through interactive games designed for people with Down Syndrome.",
  openGraph: {
    title: "Ablio — Learn and Grow with Fun Games",
    description:
      "Ablio helps improve cognitive and mental abilities through interactive games designed for people with Down Syndrome.",
    siteName: "Ablio",
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexend.variable} ${plusJakartaSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
