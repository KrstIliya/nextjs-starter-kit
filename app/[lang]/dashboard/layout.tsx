import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-full space-gradient-bg">
      {children}
    </div>
  );
}
