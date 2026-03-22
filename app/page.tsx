"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "./store/useStore";
import { useAuth } from "./hooks/useAuth";
import NavbarNew from "./components/NavbarNew";
import SidebarNew from "./components/SidebarNew";
import TaskBoardNew from "./components/TaskBoardNew";

export default function Home() {
  const { sidebarCollapsed } = useStore();
  const { user } = useAuth();
  const router = useRouter();

  // Listen for login messages from auth popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "userLoggedIn") {
        window.location.reload();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] transition-colors">
      <NavbarNew />

      <div className="flex">
        <SidebarNew />

        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-[0px]" : "ml-[240px]"
          }`}
        >
          <TaskBoardNew />
        </main>
      </div>
    </div>
  );
}
