"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../store/useStore";
import { useTasks } from "../hooks/useTasks";
import { getTranslation } from "../lib/translations";

export default function SidebarNew() {
  const { sidebarCollapsed, language, isDarkMode } = useStore();
  const { getFavoriteTasks, getRecentTasks } = useTasks();
  const pathname = usePathname();
  const t = getTranslation(language);

  const menuItems = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ), 
      label: t.dashboard, 
      labelEn: "Dashboard", 
      path: "/", 
      active: pathname === "/" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ), 
      label: t.tasks, 
      labelEn: "Tasks", 
      path: "/tasks", 
      active: pathname === "/tasks" 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      label: t.settings, 
      labelEn: "Settings", 
      path: "/settings", 
      active: pathname === "/settings" 
    },
  ];

  const sideMenuItems = [
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-1.165 2.578 0a1.724 1.724 0 002.228 1.628c1.282.33 2.425.988 3.308 1.874a6.06 6.06 0 002.452 1.84c1.126.575 2.468.21 3.294-.76a1.724 1.724 0 00-.097-2.436c-.546-1.165-2.03-1.165-2.578 0a1.724 1.724 0 00-2.228 1.628c-1.282.33-2.425.988-3.308 1.874a6.06 6.06 0 00-2.452 1.84c-1.126.575-2.468.21-3.294-.76a1.724 1.724 0 00.097-2.436z" />
        </svg>
      ), 
      label: language === "vi" ? "Người dùng" : "My People", 
      path: "/", 
      active: false 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ), 
      label: language === "vi" ? "Quản lý công việc" : "Manage Task", 
      path: "/", 
      active: false 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ), 
      label: language === "vi" ? "Phần thưởng" : "Rewards", 
      path: "/", 
      active: false 
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ), 
      label: language === "vi" ? "AI Tùy chỉnh" : "AI Customs", 
      path: "/", 
      active: false 
    },
  ];

  // Get favorite tasks dynamically
  const favoriteTasks = getFavoriteTasks();
  
  // Get recent tasks dynamically
  const recentTasks = getRecentTasks();

  if (sidebarCollapsed) {
    return (
      <aside className="fixed left-0 top-0 bottom-0 w-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 z-40" />
    );
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto transition-all duration-300 z-40">
      {/* Logo Section */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">TaskFlow</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === "vi" ? "Quản lý công việc" : "Task Management"}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
          {language === "vi" ? "Tổng quan" : "Overview"}
        </p>
        
        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group ${
                item.active 
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md" 
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              <span className={item.active ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"}>
                {item.icon}
              </span>
              <span className={`text-sm font-medium ${item.active ? "" : "group-hover:translate-x-0.5 transition-transform"}`}>
                {language === "vi" ? item.label : item.labelEn}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* My People Section */}
      <div className="px-4 pb-4">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
          {language === "vi" ? "Người của tôi" : "My People"}
        </p>
        
        <div className="space-y-1">
          {sideMenuItems.slice(0, 1).map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200 group"
            >
              <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                {item.icon}
              </span>
              <span className="text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Manage Task Section */}
      <div className="px-4 pb-4">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
          {language === "vi" ? "Quản lý công việc" : "Manage Task"}
        </p>
        
        <div className="space-y-1">
          {sideMenuItems.slice(1, 2).map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200 group"
            >
              <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                {item.icon}
              </span>
              <span className="text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="px-4 pb-4">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
          {language === "vi" ? "Phần thưởng" : "Rewards"}
        </p>
        
        <div className="space-y-1">
          {sideMenuItems.slice(2, 3).map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200 group"
            >
              <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                {item.icon}
              </span>
              <span className="text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Customs Section */}
      <div className="px-4 pb-4">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
          {language === "vi" ? "AI Tùy chỉnh" : "AI Customs"}
        </p>
        
        <div className="space-y-1">
          {sideMenuItems.slice(3, 4).map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200 group"
            >
              <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                {item.icon}
              </span>
              <span className="text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {t.favorites}
          </span>
          <span className="text-xs text-slate-400">{favoriteTasks.length}</span>
        </div>
      </div>

      <div className="px-2 pb-2">
        {favoriteTasks.length === 0 ? (
          <div className="px-2 py-3 text-center">
            <p className="text-xs text-slate-400">
              {language === "vi" ? "Chưa có mục yêu thích" : "No favorites yet"}
            </p>
          </div>
        ) : (
          favoriteTasks.slice(0, 5).map((task) => (
            <Link
              key={task.id}
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#F5A623"
                stroke="#F5A623"
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm text-slate-600 dark:text-slate-300 truncate">
                {language === "vi" ? task.title : task.titleEn}
              </span>
            </Link>
          ))
        )}
      </div>

      {/* Recent */}
      <div className="px-4 pt-2 pb-2">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {t.recent}
          </span>
          <span className="text-xs text-slate-400">{recentTasks.length}</span>
        </div>
      </div>

      <div className="px-2 pb-4">
        {recentTasks.length === 0 ? (
          <div className="px-2 py-3 text-center">
            <p className="text-xs text-slate-400">
              {language === "vi" ? "Công việc gần đây sẽ hiện ở đây" : "Recent tasks will appear here"}
            </p>
          </div>
        ) : (
          recentTasks.map((task) => (
            <Link
              key={task.id}
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-sm text-slate-600 dark:text-slate-300 truncate">
                {language === "vi" ? task.title : task.titleEn}
              </span>
            </Link>
          ))
        )}
      </div>

      {/* Bottom Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex flex-col gap-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200 group"
          >
            <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">
              {language === "vi" ? "Cài đặt" : "Settings"}
            </span>
          </Link>
          
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200 group"
          >
            <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-1.165 2.578 0a1.724 1.724 0 002.228 1.628c1.282.33 2.425.988 3.308 1.874a6.06 6.06 0 002.452 1.84c1.126.575 2.468.21 3.294-.76a1.724 1.724 0 00-.097-2.436c-.546-1.165-2.03-1.165-2.578 0a1.724 1.724 0 00-2.228 1.628c-1.282.33-2.425.988-3.308 1.874a6.06 6.06 0 00-2.452 1.84c-1.126.575-2.468.21-3.294-.76a1.724 1.724 0 00.097-2.436z" />
            </svg>
            <span className="text-sm font-medium">
              {language === "vi" ? "Trung tâm trợ giúp" : "Help Center"}
            </span>
          </Link>
          
          <Link
            href="/auth"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-all duration-200 group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-medium">
              {language === "vi" ? "Đăng xuất" : "Logout"}
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
