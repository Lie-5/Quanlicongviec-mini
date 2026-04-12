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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {language === "vi" ? "Cài đặt" : "Settings"}
      </h1>

      {user && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-slate-700 p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "vi" ? "Hồ sơ người dùng" : "User Profile"}
          </h2>
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-200 dark:border-slate-600"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center border-2 border-gray-200 dark:border-slate-600">
                <span className="text-white text-2xl font-medium">
                  {user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                </span>
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-slate-700 p-6 mb-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {language === "vi" ? "Giao diện" : "Appearance"}
        </h2>

        <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-slate-700">
          <div>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {language === "vi" ? "Chủ đề" : "Theme"}
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {language === "vi"
                ? "Chọn giao diện sáng hoặc tối"
                : "Choose light or dark theme"}
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-8 rounded-full transition-colors border-2 ${
              isDarkMode ? "bg-purple-600 border-purple-600" : "bg-gray-200 border-gray-300"
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              }`}
            >
              {isDarkMode ? (
                <svg className="w-full h-full p-1" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="w-full h-full p-1" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
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

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              !isDarkMode
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                : "border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700"
            }`}
            onClick={() => isDarkMode && toggleTheme()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {language === "vi" ? "Sáng" : "Light"}
              </span>
              {!isDarkMode && (
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="h-16 bg-gray-100 dark:bg-slate-600 rounded-lg border border-gray-200 dark:border-slate-500"></div>
          </div>

          <div
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              isDarkMode
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                : "border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700"
            }`}
            onClick={() => !isDarkMode && toggleTheme()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {language === "vi" ? "Tối" : "Dark"}
              </span>
              {isDarkMode && (
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="h-16 bg-slate-800 rounded-lg border border-slate-600"></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-slate-700 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {language === "vi" ? "Ngôn ngữ" : "Language"}
        </h2>

        <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-slate-700">
          <div>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {language === "vi" ? "Ngôn ngữ hiển thị" : "Display Language"}
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {language === "vi"
                ? "Chọn ngôn ngữ cho giao diện"
                : "Choose interface language"}
            </p>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl border-2 border-purple-500 hover:border-purple-600 transition-all duration-200 font-semibold text-sm"
          >
            {language === "vi" ? "Chuyển sang English" : language === "en" ? "Chuyển sang Tiếng Việt" : "Next Language"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                language === lang.code
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-500"
              }`}
              onClick={() => language !== lang.code && handleLanguageChange(lang.code)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {lang.native}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">{lang.name}</p>
                </div>
                {language === lang.code && (
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
