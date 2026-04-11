"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { getTranslation } from "../lib/translations";
import { Language } from "../types";

const languages: { code: Language; name: string; native: string }[] = [
  { code: "en", name: "English", native: "English" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { code: "zh", name: "Chinese", native: "中文" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "fr", name: "French", native: "Français" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { language, setLanguage, toggleLanguage } = useStore();
  const { user, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const t = getTranslation(language);

  // Redirect to login if not authenticated (only on client, only once)
  useEffect(() => {
    if (!isAuthenticated && user === null) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const handleLanguageChange = (lang: Language) => {
    if (language !== lang) {
      setLanguage(lang);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-[28px] font-bold text-[#37352f] dark:text-[#e0e0e0] mb-6">
        {t.settings}
      </h1>

      {/* User Profile Section */}
      {user && (
        <div className="bg-white dark:bg-[#2f2f2f] rounded-[8px] p-6 border border-[#e0e0e0] dark:border-[#3f3f3f] mb-6">
          <h2 className="text-[18px] font-bold text-[#37352f] dark:text-[#e0e0e0] mb-4">
            {t.profile}
          </h2>
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-[64px] h-[64px] rounded-[8px] object-cover"
              />
            ) : (
              <div className="w-[64px] h-[64px] bg-[#E16737] rounded-[8px] flex items-center justify-center">
                <span className="text-white text-[24px] font-medium">
                  {user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                </span>
              </div>
            )}
            <div>
              <p className="text-[16px] font-medium text-[#37352f] dark:text-[#e0e0e0]">
                {user.name}
              </p>
              <p className="text-[14px] text-[#9b9a97]">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-[#2f2f2f] rounded-[8px] p-6 border border-[#e0e0e0] dark:border-[#3f3f3f] mb-6">
        <h2 className="text-[18px] font-bold text-[#37352f] dark:text-[#e0e0e0] mb-4">
          {t.appearance}
        </h2>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-[#e0e0e0] dark:border-[#3f3f3f]">
          <div>
            <p className="text-[14px] font-medium text-[#37352f] dark:text-[#e0e0e0]">
              {t.theme}
            </p>
            <p className="text-[13px] text-[#9b9a97]">
              {language === "vi"
                ? "Chọn giao diện sáng hoặc tối"
                : "Choose light or dark theme"}
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-[52px] h-[28px] rounded-full transition-colors ${
              isDarkMode ? "bg-[#2383E2]" : "bg-[#e0e0e0]"
            }`}
          >
            <div
              className={`absolute top-[2px] w-[24px] h-[24px] bg-white rounded-full shadow-sm transition-transform ${
                isDarkMode ? "translate-x-[26px]" : "translate-x-[2px]"
              }`}
            >
              {isDarkMode ? (
                <svg
                  className="w-full h-full p-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2383E2"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg
                  className="w-full h-full p-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9b9a97"
                  strokeWidth="2"
                >
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
              )}
            </div>
          </button>
        </div>

        {/* Current Theme Display */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-[6px] border-2 cursor-pointer transition-all ${
              !isDarkMode
                ? "border-[#2383E2] bg-[#f7f6f3]"
                : "border-[#e0e0e0] dark:border-[#3f3f3f] bg-white"
            }`}
            onClick={() => !isDarkMode || toggleTheme()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-medium text-[#37352f]">{t.lightMode}</span>
              {!isDarkMode && <span className="text-[#2383E2]">✓</span>}
            </div>
            <div className="h-[60px] bg-white rounded-[4px] border border-[#e0e0e0]"></div>
          </div>

          <div
            className={`p-4 rounded-[6px] border-2 cursor-pointer transition-all ${
              isDarkMode
                ? "border-[#2383E2] bg-[#2f2f2f]"
                : "border-[#e0e0e0] bg-white"
            }`}
            onClick={() => isDarkMode || toggleTheme()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[14px] font-medium ${isDarkMode ? "text-[#e0e0e0]" : "text-[#37352f]"}`}>
                {t.darkMode}
              </span>
              {isDarkMode && <span className="text-[#2383E2]">✓</span>}
            </div>
            <div className="h-[60px] bg-[#191919] rounded-[4px] border border-[#3f3f3f]"></div>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-white dark:bg-[#2f2f2f] rounded-[8px] p-6 border border-[#e0e0e0] dark:border-[#3f3f3f]">
        <h2 className="text-[18px] font-bold text-[#37352f] dark:text-[#e0e0e0] mb-4">
          {t.language}
        </h2>

        {/* Language Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-[#e0e0e0] dark:border-[#3f3f3f]">
          <div>
            <p className="text-[14px] font-medium text-[#37352f] dark:text-[#e0e0e0]">
              {language === "vi" ? "Ngôn ngữ hiển thị" : "Display Language"}
            </p>
            <p className="text-[13px] text-[#9b9a97]">
              {language === "vi"
                ? "Chọn ngôn ngữ cho giao diện"
                : "Choose interface language"}
            </p>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-[#2383E2] text-white rounded-[4px] hover:bg-[#1a6fc4] transition-colors text-[14px] font-medium"
          >
            {language === "vi" ? "Switch to English" : language === "en" ? "Chuyển sang Tiếng Việt" : "Next Language"}
          </button>
        </div>

        {/* Language Options */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`p-4 rounded-[6px] border-2 cursor-pointer transition-all ${
                language === lang.code
                  ? "border-[#2383E2] bg-[#f7f6f3] dark:bg-[#3f3f3f]"
                  : "border-[#e0e0e0] dark:border-[#3f3f3f] bg-white dark:bg-[#2f2f2f]"
              }`}
              onClick={() => language !== lang.code && handleLanguageChange(lang.code)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-medium text-[#37352f] dark:text-[#e0e0e0]">
                    {lang.native}
                  </p>
                  <p className="text-[12px] text-[#9b9a97]">{lang.name}</p>
                </div>
                {language === lang.code && <span className="text-[#2383E2]">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
