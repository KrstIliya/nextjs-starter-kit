import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserInfo {
  id: string;
  name: string;
  image?: string | null | undefined;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function UserProfile({ mini, lang: langProp }: { mini?: boolean; lang?: string }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const lang = langProp || (params.lang as string) || "sr";

  const dict = {
    myAccount: lang === "sr" ? "Moj nalog" : "My Account",
    profile: lang === "sr" ? "Profil" : "Profile",
    logOut: lang === "sr" ? "Odjavi se" : "Log out",
    loading: lang === "sr" ? "Učitavanje..." : "Loading...",
    user: lang === "sr" ? "Korisnik" : "User",
    error: lang === "sr" ? "Greška" : "Error",
    errorMessage: lang === "sr" ? "Učitavanje profila nije uspelo. Pokušajte da osvežite stranicu." : "Failed to load user profile. Please try refreshing the page.",
  };

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await authClient.getSession();

      if (!result.data?.user) {
        router.push(`/${lang}/sign-in`);
        return;
      }

      setUserInfo(result.data?.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(dict.errorMessage);
    } finally {
      setLoading(false);
    }
  }, [router, lang, dict.errorMessage]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(`/${lang}/sign-in`);
        },
      },
    });
  };

  if (error) {
    return (
      <div
        className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}
      >
        <div className="text-red-500 text-sm flex-1">
          {mini ? dict.error : error}
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex gap-2 justify-start items-center w-full rounded ${mini ? "" : "px-4 pt-2 pb-3"}`}
        >
          <Avatar>
            {loading ? (
              <div className="flex items-center justify-center w-full h-full">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <>
                {userInfo?.image ? (
                  <AvatarImage src={userInfo?.image} alt="User Avatar" />
                ) : (
                  <AvatarFallback>
                    {userInfo?.name && userInfo.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </>
            )}
          </Avatar>
          {mini ? null : (
            <div className="flex items-center gap-2">
              <p className="font-medium text-md">
                {loading ? dict.loading : userInfo?.name || dict.user}
              </p>
              {loading && <Loader2 className="h-3 w-3 animate-spin" />}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-surface-container-high border-outline-variant/50 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl p-4">
        <DropdownMenuLabel className="text-foreground/80 font-display">{dict.myAccount}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-outline-variant/30" />
        <DropdownMenuGroup>
          <Link href={`/${lang}/dashboard/profile`}>
            <DropdownMenuItem className="rounded-sm focus:bg-surface-bright focus:text-foreground cursor-pointer">
              {dict.profile}
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-outline-variant/30" />
        <DropdownMenuItem onClick={handleSignOut} className="rounded-sm focus:bg-destructive/10 focus:text-destructive cursor-pointer">
          {dict.logOut}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
