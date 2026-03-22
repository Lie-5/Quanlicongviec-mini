"use client";

import { useState } from "react";
import { Language } from "../types";

interface VisibilityToggleProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
  language?: Language;
}

// Simple i18n translations object
const translations = {
  en: { public: "Public", private: "Private" },
  vi: { public: "Công khai", private: "Riêng tư" },
  zh: { public: "公开", private: "私有" },
  hi: { public: "सार्वजनिक", private: "निजी" },
  ja: { public: "公開", private: "プライベート" },
  fr: { public: "Public", private: "Privé" },
};

export default function VisibilityToggle({ 
  isPublic, 
  onChange,
  language = "en"
}: VisibilityToggleProps) {
  const t = translations[language] || translations.en;

  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] font-medium text-[#9b9a97] dark:text-[#9b9a97]">
        {isPublic ? t.public : t.private}
      </span>
      <button
        type="button"
        onClick={() => onChange(!isPublic)}
        className={`
          relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2383E2] focus:ring-offset-2
          ${isPublic ? "bg-green-500" : "bg-gray-400 dark:bg-gray-600"}
          hover:scale-105 active:scale-95
        `}
        role="switch"
        aria-checked={isPublic}
      >
        <span className="sr-only">Toggle visibility</span>
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 
            transition duration-300 ease-in-out
            ${isPublic ? "translate-x-5" : "translate-x-0"}
          `}
        >
          <span className="flex h-full w-full items-center justify-center text-[10px]">
            {isPublic ? (
              <span role="img" aria-label="public" className="text-lg leading-none">
                🌍
              </span>
            ) : (
              <span role="img" aria-label="private" className="text-lg leading-none">
                🔒
              </span>
            )}
          </span>
        </span>
      </button>
    </div>
  );
}
