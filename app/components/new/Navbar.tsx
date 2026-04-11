"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/useStore";
import { useAuth } from "../../hooks/useAuth";
import { Language, User } from "../../types";

interface NavbarProps {
  language?: Language;
}

export default function Navbar({ language }: NavbarProps) {
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    isDarkMode, 
    toggleTheme, 
    language: storeLang,
    setSearchQuery,
    user
  } = useStore();
  const { signOut, updateAvatar } = useAuth();
  
  const activeLang = language || storeLang;
  const [searchQuery, setLocalSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, setSearchQuery]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showProfileMenu || showNotifications) {
        setShowProfileMenu(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showProfileMenu, showNotifications]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        updateAvatar(result);
      };
      reader.readAsDataURL(file);
    }
    setShowProfileMenu(false);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (activeLang === "vi") {
      if (hour < 12) return "Chào buổi sáng";
      if (hour < 18) return "Chào buổi chiều";
      return "Chào buổi tối";
    }
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: activeLang === "vi" ? "Công việc mới được giao" : "New task assigned", time: "2h", icon: "📋" },
    { id: 2, title: activeLang === "vi" ? "Công việc đã hoàn thành" : "Task completed", time: "5h", icon: "✅" },
    { id: 3, title: activeLang === "vi" ? "Nhắc nhở deadline" : "Deadline reminder", time: "1d", icon: "⏰" },
  ];

  return (
    <nav className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30 transition-all duration-300 ${
      sidebarCollapsed ? "left-0" : "left-64"
    }`}>
      {/* Left - Menu toggle & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Search Bar - Rounded */}
        <div className="relative">
          <div className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2.5 transition-colors w-80">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              placeholder={activeLang === "vi" ? "Tìm kiếm..." : "Search..."}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            <span className="text-xs text-gray-400 bg-gray-300 px-1.5 py-0.5 rounded">⌘K</span>
          </div>
        </div>
      </div>

      {/* Right - Actions & User */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
          title={activeLang === "vi" ? "Chuyển đổi giao diện" : "Toggle theme"}
        >
          {isDarkMode ? (
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5a2 2 0 01-2-2v-4l-3-3H7a2 2 0 01-2 2v4l-3 3h5a2 2 0 002-2v-1" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7a3 3 0 016 0v10" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-500/20 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">
                  {activeLang === "vi" ? "Thông báo" : "Notifications"}
                </h3>
              </div>
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{notif.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{notif.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={handleProfileClick}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {user ? (
              <>
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{getInitials(user.name)}</span>
                  </div>
                )}
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-medium text-gray-700">
                    {getGreeting()}, {user.name.split(' ')[0]}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.email}
                  </p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            ) : (
              <>
                <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">
                  {activeLang === "vi" ? "Đăng nhập" : "Sign In"}
                </span>
              </>
            )}
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && user && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-500/20 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {activeLang === "vi" ? "Đổi ảnh đại diện" : "Change avatar"}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => {}}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {activeLang === "vi" ? "Cài đặt" : "Settings"}
              </button>
              <div className="my-1 border-t border-gray-100"></div>
              <button
                onClick={signOut}
                className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {activeLang === "vi" ? "Đăng xuất" : "Sign out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}