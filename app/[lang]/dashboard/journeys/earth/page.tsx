import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EarthPage() {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result?.session?.userId) {
        redirect("/sign-in");
    }

    return (
        <section className="flex flex-col items-center justify-center flex-1 p-6 w-full">
            {/* Earth content goes here */}
        </section>
    );
}
