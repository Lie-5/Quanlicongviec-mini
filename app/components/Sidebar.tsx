"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../store/useStore";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();
  const { language } = useStore();

  const menuItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
        </svg>
      ),
      label: language === "vi" ? "Tổng quan" : "Overview",
      path: "/overview",
      active: pathname === "/overview"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      label: language === "vi" ? "Người của tôi" : "My People",
      path: "/my-people",
      active: pathname === "/my-people"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      label: language === "vi" ? "Quản lý công việc" : "Manage Task",
      path: "/tasks",
      active: pathname === "/tasks"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      label: language === "vi" ? "Phần thưởng" : "Rewards",
      path: "/rewards",
      active: pathname === "/rewards"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      label: language === "vi" ? "AI Tùy chỉnh" : "AI Customs",
      path: "/ai-customs",
      active: pathname === "/ai-customs"
    },
  ];

  const otherItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: language === "vi" ? "Cài đặt" : "Settings",
      path: "/settings",
      active: pathname === "/settings"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-1.165 2.578 0a1.724 1.724 0 002.228 1.628c1.282.33 2.425.988 3.308 1.874a6.06 6.06 0 002.452 1.84c1.126.575 2.468.21 3.294-.76a1.724 1.724 0 00-.097-2.436c-.546-1.165-2.03-1.165-2.578 0a1.724 1.724 0 00-2.228 1.628c-1.282.33-2.425.988-3.308 1.874a6.06 6.06 0 00-2.452 1.84c-1.126.575-2.468.21-3.294-.76a1.724 1.724 0 00.097-2.436z" />
        </svg>
      ),
      label: language === "vi" ? "Trung tâm trợ giúp" : "Help Center",
      path: "/help",
      active: pathname === "/help"
    },
  ];

  return (
    <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto ${className}`}>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">TaskFlow</h1>
            <p className="text-xs text-gray-500">
              {language === "vi" ? "Quản lý công việc" : "Task Management"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="p-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          {language === "vi" ? "Chính" : "Main"}
        </p>

        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 group ${
                item.active
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800 shadow-sm scale-105"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className={`transition-colors ${item.active ? "text-yellow-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                {item.icon}
              </span>
              <span className={`font-bold transition-all ${item.active ? "text-yellow-800" : "group-hover:translate-x-0.5"}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Other Menu */}
      <div className="p-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          {language === "vi" ? "Khác" : "Others"}
        </p>

        <div className="space-y-1">
          {otherItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 group ${
                item.active
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800 shadow-sm scale-105"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className={`transition-colors ${item.active ? "text-yellow-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                {item.icon}
              </span>
              <span className={`font-bold transition-all ${item.active ? "text-yellow-800" : "group-hover:translate-x-0.5"}`}>
                {item.label}
              </span>
            </Link>
          ))}

          {/* Log Out */}
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-200 group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-bold group-hover:translate-x-0.5 transition-transform">
              {language === "vi" ? "Đăng xuất" : "Log Out"}
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
