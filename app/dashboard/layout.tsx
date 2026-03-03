import { ReactNode } from "react";
import DashboardShell from "./_components/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-full space-gradient-bg">
      <DashboardShell>
        {children}
      </DashboardShell>
    </div>
  );
}
