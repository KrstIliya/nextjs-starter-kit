"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import {
  Music,
  Volume2,
  User,
  LogOut,
  Save,
  Pencil,
  ExternalLink,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/language-switcher";

interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface OrderItem {
  label: string;
  amount: number;
}

interface Order {
  id: string;
  product?: { name: string };
  createdAt: string;
  totalAmount: number;
  currency: string;
  status: string;
  subscription?: { status: string; endedAt?: string };
  items: OrderItem[];
}

interface OrdersResponse {
  result: { items: Order[] };
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en-us");

  // Profile picture
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Settings toggles
  const [gameMusic, setGameMusic] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

  // Billing
  const [orders, setOrders] = useState<OrdersResponse | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const lang = (params.lang as string) || "sr";

  const dict = {
    journeys: lang === "sr" ? "Putovanja" : "Journeys",
    profile: lang === "sr" ? "Profil" : "Profile",
    explorerLevel: lang === "sr" ? "Istraživač nivo 12" : "Explorer Level 12",
    brightStudent: lang === "sr" ? "Sjajni učenik" : "Bright Student",
    gameMaster: lang === "sr" ? "Majstor igara" : "Game Master",
    uploading: lang === "sr" ? "Otpremanje..." : "Uploading...",
    savePhoto: lang === "sr" ? "Sačuvaj sliku" : "Save Photo",
    cancel: lang === "sr" ? "Otkaži" : "Cancel",
    settings: lang === "sr" ? "Podešavanja" : "Settings",
    gameMusic: lang === "sr" ? "Muzika u igri" : "Game Music",
    soundtrack: lang === "sr" ? "Zvučni zapis" : "Soundtrack",
    soundEffects: lang === "sr" ? "Zvučni efekti" : "Sound Effects",
    interactions: lang === "sr" ? "Interakcije" : "Interactions",
    personalDetails: lang === "sr" ? "Lični podaci" : "Personal Details",
    emailAddress: lang === "sr" ? "Email adresa" : "Email Address",
    fullName: lang === "sr" ? "Puno ime" : "Full Name",
    fullNamePlaceholder: lang === "sr" ? "Unesite vaše puno ime" : "Enter your full name",
    preferredLanguage: lang === "sr" ? "Željeni jezik" : "Preferred Language",
    selectLanguage: lang === "sr" ? "Izaberite jezik" : "Select language",
    billing: lang === "sr" ? "Naplata i pretplata" : "Billing & Subscription",
    manageSubscription: lang === "sr" ? "Upravljaj pretplatom" : "Manage Subscription",
    paid: lang === "sr" ? "Plaćeno" : "Paid",
    canceled: lang === "sr" ? "Otkazano" : "Canceled",
    unableToLoadBilling: lang === "sr" ? "Nije moguće učitati istoriju naplate." : "Unable to load billing history.",
    noOrdersYet: lang === "sr" ? "Još nema narudžbina. Vaša istorija naplate će se pojaviti ovde." : "No orders yet. Your billing history will appear here.",
    logOut: lang === "sr" ? "Odjavi se" : "Log Out",
    saveChanges: lang === "sr" ? "Sačuvaj promene" : "Save Changes",
    profileUpdated: lang === "sr" ? "Profil je uspešno ažuriran" : "Profile updated successfully",
    profileUpdateFailed: lang === "sr" ? "Ažuriranje profila nije uspelo" : "Failed to update profile",
    profilePictureUpdated: lang === "sr" ? "Slika profila je uspešno ažurirana" : "Profile picture updated successfully",
    profilePictureFailed: lang === "sr" ? "Otpremanje slike profila nije uspelo" : "Failed to upload profile picture",
    terms: lang === "sr" ? "Uslovi" : "Terms",
    privacy: lang === "sr" ? "Privatnost" : "Privacy",
    footerCopyright: lang === "sr" ? `© ${new Date().getFullYear()} Ablio. Siguran prostor za sve.` : `© ${new Date().getFullYear()} Ablio. A safe space for everyone.`,
    subscription: lang === "sr" ? "Pretplata" : "Subscription",
  };

  const navItems = [
    { label: dict.journeys, href: `/${lang}/dashboard` },
    { label: dict.profile, href: `/${lang}/dashboard/profile` },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await authClient.getSession();
        if (session.data?.user) {
          setUser(session.data.user);
          setName(session.data.user.name || "");
          setEmail(session.data.user.email || "");
        }

        // Fetch billing data
        try {
          const ordersResponse = await authClient.customer.orders.list({});
          if (ordersResponse.data) {
            setOrders(ordersResponse.data as unknown as OrdersResponse);
          }
        } catch (orderError) {
          console.log("Orders fetch failed:", orderError);
          setOrders(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await authClient.updateUser({ name });
      toast.success(dict.profileUpdated);
    } catch {
      toast.error(dict.profileUpdateFailed);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfilePicture = async () => {
    if (!profileImage) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", profileImage);
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const { url } = await response.json();
        await authClient.updateUser({ name, image: url });
        setUser((prev) => (prev ? { ...prev, image: url } : null));
        setImagePreview(null);
        setProfileImage(null);
        toast.success(dict.profilePictureUpdated);
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      toast.error(dict.profilePictureFailed);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push(`/${lang}/sign-in`),
      },
    });
  };

  // ── Loading Skeleton ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full profile-page-bg">
        {/* Header skeleton */}
        <header className="flex items-center justify-between px-8 py-5 w-full">
          <Skeleton className="h-8 w-24 bg-surface-container-high" />
          <div className="flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-5 w-16 bg-surface-container-high" />
            ))}
          </div>
          <Skeleton className="h-9 w-9 rounded-full bg-surface-container-high" />
        </header>

        <main className="flex-1 w-full max-w-2xl mx-auto px-6 pb-20 pt-4">
          {/* Profile hero skeleton */}
          <div className="flex items-center gap-6 mb-10">
            <Skeleton className="h-[100px] w-[100px] rounded-full bg-surface-container-high" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-48 bg-surface-container-high" />
              <Skeleton className="h-4 w-32 bg-surface-container-high" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full bg-surface-container-high" />
                <Skeleton className="h-6 w-24 rounded-full bg-surface-container-high" />
              </div>
            </div>
          </div>

          {/* Settings skeleton */}
          <Skeleton className="h-6 w-20 mb-4 bg-surface-container-high" />
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Skeleton className="h-24 rounded-2xl bg-surface-container-high" />
            <Skeleton className="h-24 rounded-2xl bg-surface-container-high" />
          </div>

          {/* Personal details skeleton */}
          <Skeleton className="h-48 rounded-2xl mb-8 bg-surface-container-high" />

          {/* Buttons skeleton */}
          <div className="flex gap-4">
            <Skeleton className="h-14 flex-1 rounded-full bg-surface-container-high" />
            <Skeleton className="h-14 flex-1 rounded-full bg-surface-container-high" />
          </div>
        </main>
      </div>
    );
  }

  // ── Main Render ───────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen w-full profile-page-bg">
      {/* ── HEADER ────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 py-5 w-full">
        <Link
          href={`/${lang}`}
          className="text-2xl font-display font-bold text-primary tracking-tight"
        >
          Ablio
        </Link>

        <nav
          className="hidden md:flex items-center gap-10"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Avatar className="h-9 w-9 ring-2 ring-primary/30 cursor-pointer">
            <AvatarImage src={user?.image || ""} alt="User Avatar" />
            <AvatarFallback className="text-xs bg-surface-container-high text-foreground">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 pb-20 pt-4">
        {/* ── PROFILE HERO ──────────────────────────────────────── */}
        <section id="profile-hero" className="flex items-center gap-6 mb-12">
          <div className="relative group">
            <Avatar className="h-[100px] w-[100px] ring-[3px] ring-primary shadow-[0_0_30px_-5px_rgba(89,113,207,0.3)]">
              <AvatarImage src={imagePreview || user?.image || ""} alt="Profile" />
              <AvatarFallback className="text-2xl bg-surface-container-high text-foreground font-display font-bold">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <button
              id="profile-image-change-btn"
              onClick={() =>
                document.getElementById("profile-image-input")?.click()
              }
              disabled={uploadingImage}
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-all group-hover:scale-110"
              aria-label="Change profile photo"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <input
              id="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div>
            <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">
              {name || "User"}
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5 mb-3">
              {dict.explorerLevel}
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs font-semibold px-3 py-0.5 rounded-full">
                {dict.brightStudent}
              </Badge>
              <Badge className="bg-tertiary/20 text-[#ff9d4d] border-tertiary/30 text-xs font-semibold px-3 py-0.5 rounded-full">
                {dict.gameMaster}
              </Badge>
            </div>

            {/* Upload controls */}
            {profileImage && (
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={handleUploadProfilePicture}
                  disabled={uploadingImage}
                  className="text-xs"
                >
                  {uploadingImage ? dict.uploading : dict.savePhoto}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImagePreview(null);
                    setProfileImage(null);
                  }}
                  className="text-xs"
                >
                  {dict.cancel}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* ── SETTINGS SECTION ──────────────────────────────────── */}
        <section id="settings-section" className="mb-8">
          <h2 className="text-lg font-display font-semibold text-primary mb-4 tracking-tight">
            {dict.settings}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Game Music Card */}
            <div className="profile-card flex items-center justify-between p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Music className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {dict.gameMusic}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {dict.soundtrack}
                  </p>
                </div>
              </div>
              <Switch
                id="game-music-switch"
                checked={gameMusic}
                onCheckedChange={setGameMusic}
                className="data-[state=checked]:bg-secondary"
              />
            </div>

            {/* Sound Effects Card */}
            <div className="profile-card flex items-center justify-between p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Volume2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {dict.soundEffects}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {dict.interactions}
                  </p>
                </div>
              </div>
              <Switch
                id="sound-effects-switch"
                checked={soundEffects}
                onCheckedChange={setSoundEffects}
              />
            </div>
          </div>
        </section>

        {/* ── PERSONAL DETAILS SECTION ──────────────────────────── */}
        <section id="personal-details-section" className="mb-8">
          <div className="profile-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5 text-foreground" />
              <h3 className="font-display font-bold text-foreground text-base">
                {dict.personalDetails}
              </h3>
            </div>

            <div className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email-address"
                  className="text-xs text-muted-foreground uppercase tracking-wider font-medium"
                >
                  {dict.emailAddress}
                </Label>
                <Input
                  id="email-address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  className="profile-input h-12 rounded-xl text-sm"
                />
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="full-name"
                  className="text-xs text-muted-foreground uppercase tracking-wider font-medium"
                >
                  {dict.fullName}
                </Label>
                <Input
                  id="full-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={dict.fullNamePlaceholder}
                  className="profile-input h-12 rounded-xl text-sm"
                />
              </div>

              {/* Preferred Language */}
              <div className="space-y-2">
                <Label
                  htmlFor="preferred-language"
                  className="text-xs text-muted-foreground uppercase tracking-wider font-medium"
                >
                  {dict.preferredLanguage}
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger
                    id="preferred-language"
                    className="profile-input h-12 rounded-xl text-sm w-full"
                  >
                    <SelectValue placeholder={dict.selectLanguage} />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-container-high border-outline-variant">
                    <SelectItem value="sr">Srpski</SelectItem>
                    <SelectItem value="en-us">English (US)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* ── BILLING SECTION ─────────────────────────────────────── */}
        <section id="billing-section" className="mb-10">
          <div className="profile-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-foreground text-base flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                {dict.billing}
              </h3>
              <Button
                id="manage-subscription-btn"
                variant="outline"
                size="sm"
                onClick={async () => {
                  try {
                    await authClient.customer.portal();
                  } catch (error) {
                    console.error("Failed to open customer portal:", error);
                  }
                }}
                disabled={orders === null}
                className="text-xs gap-1.5"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {dict.manageSubscription}
              </Button>
            </div>

            {orders?.result?.items && orders.result.items.length > 0 ? (
              <div className="space-y-3">
                {orders.result.items.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/50 border border-outline-variant/30"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {order.product?.name || dict.subscription}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString(lang === "sr" ? "sr-RS" : "en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">
                        ${(order.totalAmount / 100).toFixed(2)}
                      </span>
                      {order.subscription?.status === "paid" ? (
                        <Badge className="bg-green-900/30 text-green-300 text-[10px] font-semibold px-2">
                          {dict.paid}
                        </Badge>
                      ) : order.subscription?.status === "canceled" ? (
                        <Badge
                          variant="destructive"
                          className="text-[10px] font-semibold px-2"
                        >
                          {dict.canceled}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-[10px] font-semibold px-2"
                        >
                          {order.subscription?.status || order.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">
                  {orders === null
                    ? dict.unableToLoadBilling
                    : dict.noOrdersYet}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── ACTION BUTTONS ──────────────────────────────────────── */}
        <div
          id="action-buttons"
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Button
            id="logout-btn"
            variant="outline"
            onClick={handleSignOut}
            className="flex-1 h-14 rounded-full text-base font-semibold transition-all gap-2"
          >
            <LogOut className="h-5 w-5" />
            {dict.logOut}
          </Button>

          <Button
            id="save-changes-btn"
            onClick={handleUpdateProfile}
            className="flex-1 h-14 rounded-full text-base font-semibold transition-all gap-2"
          >
            <Save className="h-5 w-5" />
            {dict.saveChanges}
          </Button>
        </div>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="py-8 text-center border-t border-outline-variant/30">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-lg font-display font-bold text-primary mb-3"
        >
          <Rocket className="h-4 w-4" />
          Ablio
        </Link>
        <div className="flex items-center justify-center gap-6 mb-3">
          <Link
            href={`/${lang}/terms-of-service`}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            {dict.terms}
          </Link>
          <Link
            href={`/${lang}/privacy-policy`}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            {dict.privacy}
          </Link>
        </div>
        <p className="text-muted-foreground/60 text-xs">
          {dict.footerCopyright}
        </p>
      </footer>
    </div>
  );
}
