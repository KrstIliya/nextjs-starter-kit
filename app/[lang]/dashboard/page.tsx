import DashboardHeader from "@/components/space/planet-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSubscriptionDetails } from "@/lib/subscription";
import Link from "next/link";
import { Rocket, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (!result?.session?.userId) {
    redirect(`/${lang}/sign-in`);
  }

  const [dict, subscriptionDetails] = await Promise.all([
    getDictionary(lang),
    getSubscriptionDetails(),
  ]);

  const hasSubscription =
    subscriptionDetails.subscription?.status === "active" && subscriptionDetails.subscription?.productId === process.env.NEXT_PUBLIC_STARTER_TIER;

  const d = dict.dashboard;

  return (
    <div className="flex flex-col min-h-screen w-full">
      <DashboardHeader lang={lang} />

      <main className="flex-1 flex flex-col items-center pt-8 px-6 pb-20 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-[3.5rem] font-display font-bold text-foreground">
            {d.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground/90 font-light">
            {d.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-14 w-full place-items-start">
          {/* Earth */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full mb-10 shadow-[0_0_80px_-20px_rgba(59,130,246,0.25)]">
              <div className="absolute inset-0 rounded-full bg-[#030b1c] border border-primary/10 flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground text-sm font-medium">{d.earth.imageArea}</span>
              </div>
            </div>

            <h2 className="text-3xl font-display font-bold text-foreground mb-4 tracking-tight">{d.earth.title}</h2>
            <p className="text-muted-foreground/80 leading-relaxed mb-8 h-20 px-2 text-[15px]">
              {d.earth.description}
            </p>

            <Button asChild size="lg" className="w-full max-w-[280px] rounded-full min-h-14 text-[17px] font-semibold bg-gradient-to-r from-[#eab308] to-[#ca8a04] hover:from-[#facc15] hover:to-[#eab308] text-black border-none shadow-[0_0_30px_-5px_rgba(234,179,8,0.5)] transition-all">
              <Link href={`/${lang}/dashboard/journeys/earth`}>
                <Rocket className="h-[22px] w-[22px] mr-2" fill="currentColor" />
                {d.earth.explore}
              </Link>
            </Button>
          </div>

          {/* Mars */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full mb-10 transition-transform duration-300">
              <div className="absolute inset-0 rounded-full bg-[#1c1109] border border-border/20 flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground/50 text-sm font-medium">{d.mars.imageArea}</span>
                {!hasSubscription && (
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-lg shadow-xl">
                      <Lock className="h-8 w-8 text-black" fill="currentColor" strokeWidth={0} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-3xl font-display font-bold text-muted-foreground mb-4 tracking-tight">{d.mars.title}</h2>
            <p className="text-muted-foreground/60 leading-relaxed mb-8 h-20 px-2 text-[15px]">
              {d.mars.description}
            </p>

            {hasSubscription ? (
              <Button asChild size="lg" className="w-full max-w-[280px] rounded-full min-h-14 text-[17px] font-semibold bg-gradient-to-r from-primary to-primary-container text-primary-foreground border-none transition-transform hover:scale-105">
                <Link href={`/${lang}/dashboard/journeys/mars`}>
                  <Rocket className="h-[22px] w-[22px] mr-2" />
                  {d.mars.explore}
                </Link>
              </Button>
            ) : (
              <div className="w-full flex flex-col items-center space-y-4">
                <Button size="lg" className="w-full max-w-[280px] rounded-full min-h-14 text-[17px] font-semibold bg-[#2a2c3a] text-muted-foreground/70 hover:bg-[#2a2c3a] cursor-not-allowed border-none">
                  <Lock className="h-[20px] w-[20px] mr-2" fill="currentColor" strokeWidth={0} />
                  {d.mars.explore}
                </Button>
                <div className="text-[#eab308] text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-1">
                  {d.mars.requiresSubscription}
                </div>
              </div>
            )}
          </div>

          {/* Moon */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full mb-10">
              <div className="absolute inset-0 rounded-full bg-[#0a0a0c] border border-border/20 flex items-center justify-center overflow-hidden">
                <span className="text-muted-foreground/50 text-sm font-medium">{d.moon.imageArea}</span>
                {!hasSubscription && (
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                    <div className="bg-white p-3 rounded-lg shadow-xl">
                      <Lock className="h-8 w-8 text-black" fill="currentColor" strokeWidth={0} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-3xl font-display font-bold text-muted-foreground mb-4 tracking-tight">{d.moon.title}</h2>
            <p className="text-muted-foreground/60 leading-relaxed mb-8 h-20 px-2 text-[15px]">
              {d.moon.description}
            </p>

            {hasSubscription ? (
              <Button asChild size="lg" className="w-full max-w-[280px] rounded-full min-h-14 text-[17px] font-semibold bg-gradient-to-r from-primary to-primary-container text-primary-foreground border-none transition-transform hover:scale-105">
                <Link href={`/${lang}/dashboard/journeys/moon`}>
                  <Rocket className="h-[22px] w-[22px] mr-2" />
                  {d.moon.explore}
                </Link>
              </Button>
            ) : (
              <div className="w-full flex flex-col items-center space-y-4">
                <Button size="lg" className="w-full max-w-[280px] rounded-full min-h-14 text-[17px] font-semibold bg-[#2a2c3a] text-muted-foreground/70 hover:bg-[#2a2c3a] cursor-not-allowed border-none">
                  <Lock className="h-[20px] w-[20px] mr-2" fill="currentColor" strokeWidth={0} />
                  {d.moon.explore}
                </Button>
                <div className="text-[#eab308] text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-1">
                  {d.moon.requiresSubscription}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
