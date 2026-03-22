"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../store/useStore";
import { useTasks } from "../hooks/useTasks";
import { getTranslation } from "../lib/translations";

export default function SidebarNew() {
  const { sidebarCollapsed, language } = useStore();
  const { getFavoriteTasks, getRecentTasks } = useTasks();
  const pathname = usePathname();
  const t = getTranslation(language);

  const menuItems = [
    { icon: "📊", label: t.dashboard, labelEn: "Dashboard", path: "/", active: pathname === "/" },
    { icon: "📋", label: t.tasks, labelEn: "Tasks", path: "/tasks", active: pathname === "/tasks" },
    { icon: "⚙️", label: t.settings, labelEn: "Settings", path: "/settings", active: pathname === "/settings" },
  ];

  // Get favorite tasks dynamically
  const favoriteTasks = getFavoriteTasks();
  
  // Get recent tasks dynamically
  const recentTasks = getRecentTasks();

  if (sidebarCollapsed) {
    return (
      <aside className="fixed left-0 top-[45px] bottom-0 w-[0px] bg-[#f7f6f3] dark:bg-[#2f2f2f] border-r border-[#e0e0e0] dark:border-[#3f3f3f] overflow-hidden transition-all duration-300"></aside>
    );
  }

  return (
    <aside className="fixed left-0 top-[45px] bottom-0 w-[240px] bg-[#f7f6f3] dark:bg-[#2f2f2f] border-r border-[#e0e0e0] dark:border-[#3f3f3f] overflow-y-auto transition-all duration-300">
      {/* Workspace section */}
      <div className="p-3">
        <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#efefed] dark:hover:bg-[#3f3f3f] rounded-[4px] cursor-pointer transition-colors">
          <div className="w-[18px] h-[18px] bg-[#E16737] rounded-[3px] flex items-center justify-center">
            <span className="text-white text-[10px] font-medium">U</span>
          </div>
          <span className="text-[14px] font-medium text-[#37352f] dark:text-[#e0e0e0]">{t.workspace}</span>
          <svg className="ml-auto w-4 h-4 text-[#9b9a97]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-1.5 px-2 py-1">
          <span className="text-[11px] text-[#9b9a97] font-medium uppercase tracking-wide">{t.quickFind}</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-2 pb-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-[4px] cursor-pointer transition-colors ${
              item.active ? "bg-[#ededec] dark:bg-[#3f3f3f]" : "hover:bg-[#efefed] dark:hover:bg-[#3f3f3f]"
            }`}
          >
            <span>{item.icon}</span>
            <span className={`text-[14px] ${item.active ? "font-medium" : ""} text-[#37352f] dark:text-[#e0e0e0]`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Favorites */}
      <div className="px-3 pt-2 pb-1">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-[11px] text-[#9b9a97] font-medium uppercase tracking-wide">{t.favorites}</span>
          <span className="text-[11px] text-[#9b9a97]">{favoriteTasks.length}</span>
        </div>
      </div>

      <div className="px-2 pb-2">
        {favoriteTasks.length === 0 ? (
          <div className="px-2 py-3 text-center">
            <p className="text-[12px] text-[#9b9a97]">
              {language === "vi" ? "Chưa có mục yêu thích" : "No favorites yet"}
            </p>
          </div>
        ) : (
          favoriteTasks.slice(0, 5).map((task) => (
            <Link
              key={task.id}
              href="/"
              className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] cursor-pointer hover:bg-[#efefed] dark:hover:bg-[#3f3f3f] transition-colors group"
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
              <span className="text-[14px] text-[#37352f] dark:text-[#e0e0e0] truncate">
                {language === "vi" ? task.title : task.titleEn}
              </span>
            </Link>
          ))
        )}
      </div>

      {/* Recent */}
      <div className="px-3 pt-2 pb-1">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-[11px] text-[#9b9a97] font-medium uppercase tracking-wide">{t.recent}</span>
          <span className="text-[11px] text-[#9b9a97]">{recentTasks.length}</span>
        </div>
      </div>

      <div className="px-2 pb-2">
        {recentTasks.length === 0 ? (
          <div className="px-2 py-3 text-center">
            <p className="text-[12px] text-[#9b9a97]">
              {language === "vi" ? "Công việc gần đây sẽ hiện ở đây" : "Recent tasks will appear here"}
            </p>
          </div>
        ) : (
          recentTasks.map((task) => (
            <Link
              key={task.id}
              href="/"
              className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] cursor-pointer hover:bg-[#efefed] dark:hover:bg-[#3f3f3f] transition-colors group"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9b9a97"
                strokeWidth="2"
                className="group-hover:text-[#37352f] dark:group-hover:text-[#e0e0e0] transition-colors"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-[14px] text-[#37352f] dark:text-[#e0e0e0] truncate">
                {language === "vi" ? task.title : task.titleEn}
              </span>
            </Link>
          ))
        )}
      </div>

      {/* Private section */}
      <div className="px-3 pt-4 pb-1">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-[11px] text-[#9b9a97] font-medium uppercase tracking-wide">{t.private}</span>
          <button className="text-[#9b9a97] hover:text-[#37352f] dark:hover:text-[#e0e0e0] text-[14px]">+</button>
        </div>
      </div>

      <div className="px-2">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] cursor-pointer hover:bg-[#efefed] dark:hover:bg-[#3f3f3f] transition-colors">
          <span>📄</span>
          <span className="text-[14px] text-[#37352f] dark:text-[#e0e0e0]">{t.myTasks}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[#e0e0e0] dark:border-[#3f3f3f] bg-[#f7f6f3] dark:bg-[#2f2f2f]">
        <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#efefed] dark:hover:bg-[#3f3f3f] rounded-[4px] cursor-pointer transition-colors">
          <svg className="w-4 h-4 text-[#9b9a97]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span className="text-[14px] text-[#9b9a97]">{t.newPage}</span>
        </div>
      </div>
    </aside>
  );
}
