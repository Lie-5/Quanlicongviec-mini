"use client";

import { useState, useRef, useEffect } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface NavbarProps {
  onToggleSidebar: () => void;
  language: "vi" | "en";
  onToggleLanguage: () => void;
  user: User | null;
  onSignOut: () => void;
  onAvatarChange: (newAvatar: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onSearch?: (query: string) => void;
}

export default function Navbar({ 
  onToggleSidebar, 
  language, 
  onToggleLanguage, 
  user,
  onSignOut,
  onAvatarChange,
  isDarkMode,
  onToggleTheme,
  onSearch
}: NavbarProps) {
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = language === "vi" ? {
    search: "Tìm kiếm",
    signOut: "Đăng xuất",
    changeAvatar: "Đổi ảnh đại diện",
    profile: "Hồ sơ",
  } : {
    search: "Search",
    signOut: "Sign Out",
    changeAvatar: "Change Avatar",
    profile: "Profile",
  };

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = () => {
      if (showAvatarMenu || showProfileMenu) {
        setShowAvatarMenu(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showAvatarMenu, showProfileMenu]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchQuery("");
      if (onSearch) {
        onSearch("");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onAvatarChange(result);
      };
      reader.readAsDataURL(file);
    }
    setShowAvatarMenu(false);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[45px] bg-white dark:bg-[#191919] border-b border-[#e0e0e0] dark:border-[#2f2f2f] flex items-center justify-between px-3 z-50 transition-colors">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onToggleSidebar}
          className="p-1.5 hover:bg-[#f0f0f0] dark:hover:bg-[#2f2f2f] rounded transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dark:text-[#9b9a97]">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        
        <div className="flex items-center gap-1.5 ml-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16v16H4V4z" fill="#FF4618"/>
            <path d="M9 9h6v6H9V9z" fill="white"/>
          </svg>
          <span className="font-semibold text-[14px] text-[#37352f] dark:text-[#e0e0e0]">
            {language === "vi" ? "Quản Lý Công Việc" : "Task Manager"}
          </span>
        </div>
      </div>

      {/* Search bar - Notion style */}
      <div className="flex-1 max-w-[400px] mx-4">
        <div className="bg-[#f7f6f3] dark:bg-[#2f2f2f] hover:bg-[#efefed] dark:hover:bg-[#3f3f3f] rounded-[4px] px-2 py-1.5 flex items-center gap-2 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9b9a97" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder={t.search}
            className="flex-1 bg-transparent text-[13px] outline-none text-[#37352f] dark:text-[#e0e0e0] placeholder-[#9b9a97]"
          />
          <span className="text-[11px] text-[#9b9a97]">⌘K</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {user ? (
          // User is logged in - show avatar and name
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button 
              onClick={onToggleTheme}
              className="p-1.5 hover:bg-[#f0f0f0] dark:hover:bg-[#2f2f2f] rounded transition-colors text-[#9b9a97]"
              title={language === "vi" ? "Chuyển đổi giao diện" : "Toggle theme"}
            >
              {isDarkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            
            {/* Language Toggle Button (Globe) */}
            <button 
              onClick={onToggleLanguage}
              className="p-1.5 hover:bg-[#f0f0f0] dark:hover:bg-[#2f2f2f] rounded transition-colors text-[#9b9a97]"
              title={language === "vi" ? "Chuyển đổi ngôn ngữ" : "Toggle language"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            
            {/* User Profile Button */}
            <div className="relative">
              <button 
                onClick={handleProfileClick}
                className="flex items-center gap-2 px-2 py-1 hover:bg-[#f0f0f0] dark:hover:bg-[#2f2f2f] rounded-[4px] transition-colors"
              >
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-[24px] h-[24px] rounded-[3px] object-cover"
                  />
                ) : (
                  <div className="w-[24px] h-[24px] bg-[#E16737] rounded-[3px] flex items-center justify-center">
                    <span className="text-white text-[10px] font-medium">{getInitials(user.name)}</span>
                  </div>
                )}
                <span className="text-[13px] text-[#37352f] dark:text-[#e0e0e0] font-medium">
                  {user.name}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-1 w-[200px] bg-white dark:bg-[#2f2f2f] border border-[#e0e0e0] dark:border-[#3f3f3f] rounded-[6px] shadow-lg py-1 z-50">
                  <div className="px-3 py-2 border-b border-[#e0e0e0] dark:border-[#3f3f3f]">
                    <p className="text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0]">{user.name}</p>
                    <p className="text-[11px] text-[#9b9a97]">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAvatarMenu(!showAvatarMenu);
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-[13px] text-[#37352f] dark:text-[#e0e0e0] hover:bg-[#f0f0f0] dark:hover:bg-[#3f3f3f]"
                  >
                    {t.changeAvatar}
                  </button>
                  <button
                    onClick={onSignOut}
                    className="w-full px-3 py-2 text-left text-[13px] text-red-500 hover:bg-[#f0f0f0] dark:hover:bg-[#3f3f3f]"
                  >
                    {t.signOut}
                  </button>
                </div>
              )}
            </div>

            {/* Avatar Change Menu */}
            {showAvatarMenu && (
              <div className="absolute right-[160px] top-[50px] w-[250px] bg-white dark:bg-[#2f2f2f] border border-[#e0e0e0] dark:border-[#3f3f3f] rounded-[6px] shadow-lg py-2 z-50">
                <p className="px-3 py-1 text-[11px] text-[#9b9a97] uppercase">
                  {t.changeAvatar}
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-3 py-2 text-left text-[13px] text-[#37352f] dark:text-[#e0e0e0] hover:bg-[#f0f0f0] dark:hover:bg-[#3f3f3f] flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  {language === "vi" ? "Tải ảnh từ máy tính" : "Upload from computer"}
                </button>
                <button
                  onClick={() => {
                    const url = prompt(language === "vi" ? "Nhập URL ảnh:" : "Enter image URL:");
                    if (url) {
                      onAvatarChange(url);
                    }
                    setShowAvatarMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-[13px] text-[#37352f] dark:text-[#e0e0e0] hover:bg-[#f0f0f0] dark:hover:bg-[#3f3f3f] flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  {language === "vi" ? "Dán URL ảnh" : "Paste image URL"}
                </button>
              </div>
            )}
          </div>
        ) : (
          // User is not logged in - show Sign In / Sign Up buttons
          <>
            {/* Sign In Button - Opens in new tab */}
            <a 
              href="/auth" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-[13px] text-[#37352f] dark:text-[#e0e0e0] hover:bg-[#f0f0f0] dark:hover:bg-[#2f2f2f] rounded-[4px] transition-colors font-medium"
            >
              {language === "vi" ? "Đăng nhập" : "Sign In"}
            </a>
            
            {/* Sign Up Button - Opens in new tab */}
            <a 
              href="/auth" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-[13px] bg-[#2383E2] text-white rounded-[4px] hover:bg-[#1a6fc4] transition-colors font-medium"
            >
              {language === "vi" ? "Đăng ký" : "Sign Up"}
            </a>

            {/* Theme Toggle Button */}
            <button 
              onClick={onToggleTheme}
              className="p-1.5 hover:bg-[#f0f0f0] dark:hover:bg-[#2f2f2f] rounded transition-colors text-[#9b9a97]"
              title={language === "vi" ? "Chuyển đổi giao diện" : "Toggle theme"}
            >
              {isDarkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            
            {/* Language Toggle Button (Globe) */}
            <button 
              onClick={onToggleLanguage}
              className="p-1.5 hover:bg-[#f0f0f0] dark:hover:bg-[#2f2f2f] rounded transition-colors text-[#9b9a97]"
              title={language === "vi" ? "Chuyển đổi ngôn ngữ" : "Toggle language"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            
            {/* Settings Button */}
            <button className="p-1.5 hover:bg-[#f0f0f0] dark:hover:bg-[#2f2f2f] rounded transition-colors text-[#9b9a97]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
            
            <div className="w-[24px] h-[24px] bg-[#E16737] rounded-[3px] flex items-center justify-center ml-1 cursor-pointer">
              <span className="text-white text-[12px] font-medium">U</span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
