"use client";

import DashboardHeader from "@/components/space/planet-header";
import PlanetNav from "@/components/space/planet-nav";
import { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto">
        <PlanetNav />
        {children}
      </main>
    </div>
  );
}
