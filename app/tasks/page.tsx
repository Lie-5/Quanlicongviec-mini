"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout";
import CalendarView from "../components/CalendarView";

export default function TasksPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

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

  return (
    <DashboardLayout>
      <CalendarView />
    </DashboardLayout>
  );
}
