"use client";

import Sidebar from "../components/Sidebar";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar />
      <main className="ml-64 pt-8 px-8 pb-8">
        {children}
      </main>
    </div>
  );
}
