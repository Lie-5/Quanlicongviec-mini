"use client";

import { useStore } from "../store/useStore";
import NavbarNew from "../components/NavbarNew";
import SidebarNew from "../components/SidebarNew";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useStore();

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] transition-colors">
      <NavbarNew />
      <div className="flex">
        <SidebarNew />
        <main
          className={`flex-1 transition-all duration-300 pt-[45px] ${
            sidebarCollapsed ? "ml-[0px]" : "ml-[240px]"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
