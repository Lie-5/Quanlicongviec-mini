"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import TaskBoardNew from "../components/TaskBoardNew";
import CalendarView from "../components/CalendarView";

type ViewMode = "board" | "calendar";

export default function TasksPage() {
  const router = useRouter();
  const { language } = useStore();
  const { user, isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");

  // Redirect to login if not authenticated (only on client, only once)
  useEffect(() => {
    if (!isAuthenticated && user === null) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, router]);

  // Show loading while checking auth
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  const labels = {
    board: {
      en: "Board",
      vi: "Bảng",
      zh: "看板",
      hi: "बोर्ड",
      ja: "ボード",
      fr: "Tableau",
    },
    calendar: {
      en: "Calendar",
      vi: "Lịch",
      zh: "日历",
      hi: "कैलेंडर",
      ja: "カレンダー",
      fr: "Calendrier",
    },
  };
  
  const getLabel = (mode: ViewMode) => {
    return labels[mode][language] || labels[mode].en;
  };

  return (
    <div className="min-h-screen">
      {/* View Toggle - Fixed at top right */}
      <div className="fixed top-[50px] right-4 z-40 flex gap-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-1">
        <button
          onClick={() => setViewMode("calendar")}
          className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
            viewMode === "calendar"
              ? "bg-blue-500 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          }`}
        >
          📅 {getLabel("calendar")}
        </button>
        <button
          onClick={() => setViewMode("board")}
          className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
            viewMode === "board"
              ? "bg-blue-500 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          }`}
        >
          📋 {getLabel("board")}
        </button>
      </div>
      
      {/* Content */}
      {viewMode === "calendar" ? <CalendarView /> : <TaskBoardNew />}
    </div>
  );
}
