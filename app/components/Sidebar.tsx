"use client";

interface SidebarProps {
  collapsed: boolean;
  language: "vi" | "en";
}

export default function Sidebar({ collapsed, language }: SidebarProps) {
  const t = language === "vi" ? {
    workspace: "Không gian làm việc",
    quickFind: "Tìm nhanh",
    favorites: "Yêu thích",
    recent: "Gần đây",
    private: "Riêng tư",
    newPage: "Trang mới",
    menuItems: [
      { icon: "📊", label: "Bảng", active: true },
      { icon: "📋", label: "Danh sách", active: false },
      { icon: "📅", label: "Lịch", active: false },
      { icon: "📈", label: "Dòng thời gian", active: false },
      { icon: "👥", label: "Nhóm", active: false },
    ],
    favoritesItems: [
      { icon: "📁", label: "Dự án Alpha" },
      { icon: "📁", label: "Lập kế hoạch Sprint" },
      { icon: "📁", label: "Biên bản họp" },
    ],
    recentItems: [
      { icon: "📄", label: "Mục tiêu Q1" },
      { icon: "📄", label: "Theo dõi lỗi" },
      { icon: "📄", label: "Ghi chú phát hành" },
    ],
    myTasks: "Công việc của tôi",
  } : {
    workspace: "Workspace",
    quickFind: "Quick Find",
    favorites: "Favorites",
    recent: "Recent",
    private: "Private",
    newPage: "New Page",
    menuItems: [
      { icon: "📊", label: "Board", active: true },
      { icon: "📋", label: "List", active: false },
      { icon: "📅", label: "Calendar", active: false },
      { icon: "📈", label: "Timeline", active: false },
      { icon: "👥", label: "Team", active: false },
    ],
    favoritesItems: [
      { icon: "📁", label: "Project Alpha" },
      { icon: "📁", label: "Sprint Planning" },
      { icon: "📁", label: "Meeting Notes" },
    ],
    recentItems: [
      { icon: "📄", label: "Q1 Goals" },
      { icon: "📄", label: "Bug Tracker" },
      { icon: "📄", label: "Release Notes" },
    ],
    myTasks: "My Tasks",
  };

  if (collapsed) {
    return (
      <aside className="fixed left-0 top-[45px] bottom-0 w-[0px] bg-[#f7f6f3] dark:bg-[#2f2f2f] border-r border-[#e0e0e0] dark:border-[#3f3f3f] overflow-hidden transition-all duration-300">
      </aside>
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
        {t.menuItems.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-[4px] cursor-pointer transition-colors ${
              item.active ? "bg-[#ededec] dark:bg-[#3f3f3f]" : "hover:bg-[#efefed] dark:hover:bg-[#3f3f3f]"
            }`}
          >
            <span>{item.icon}</span>
            <span className={`text-[14px] ${item.active ? "font-medium" : ""} text-[#37352f] dark:text-[#e0e0e0]`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Favorites */}
      <div className="px-3 pt-2 pb-1">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-[11px] text-[#9b9a97] font-medium uppercase tracking-wide">{t.favorites}</span>
          <button className="text-[#9b9a97] hover:text-[#37352f] dark:hover:text-[#e0e0e0] text-[14px]">+</button>
        </div>
      </div>

      <div className="px-2 pb-2">
        {t.favoritesItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] cursor-pointer hover:bg-[#efefed] dark:hover:bg-[#3f3f3f] transition-colors"
          >
            <span>{item.icon}</span>
            <span className="text-[14px] text-[#37352f] dark:text-[#e0e0e0]">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="px-3 pt-2 pb-1">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-[11px] text-[#9b9a97] font-medium uppercase tracking-wide">{t.recent}</span>
          <button className="text-[#9b9a97] hover:text-[#37352f] dark:hover:text-[#e0e0e0] text-[14px]">+</button>
        </div>
      </div>

      <div className="px-2 pb-2">
        {t.recentItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] cursor-pointer hover:bg-[#efefed] dark:hover:bg-[#3f3f3f] transition-colors"
          >
            <span>{item.icon}</span>
            <span className="text-[14px] text-[#37352f] dark:text-[#e0e0e0]">{item.label}</span>
          </div>
        ))}
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
