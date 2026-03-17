"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";

type Language = "vi" | "en";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState<Language>("vi");
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Check for logged in user
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Check for saved theme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const handleAvatarChange = (newAvatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar: newAvatar };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919] transition-colors">
      <Navbar 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
        language={language}
        onToggleLanguage={toggleLanguage}
        user={user}
        onSignOut={handleSignOut}
        onAvatarChange={handleAvatarChange}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onSearch={handleSearch}
      />
      
      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} language={language} />
        
        <main 
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-[0px]" : "ml-[240px]"
          }`}
        >
          <TaskBoard language={language} searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
}
