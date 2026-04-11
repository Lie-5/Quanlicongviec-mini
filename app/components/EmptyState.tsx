"use client";

import Button from "./Button";
import { Language } from "../types";

interface EmptyStateProps {
  language?: Language;
  title?: string;
  subtitle?: string;
  onImport?: () => void;
  onAddNew?: () => void;
  onCreateTask?: () => void;
}

export default function EmptyState({
  language = "en",
  title,
  subtitle,
  onImport,
  onAddNew,
  onCreateTask,
}: EmptyStateProps) {
  const defaultTitle = title || (language === "vi" ? "Oops! Không có công việc" : "Oops! No Task");
  const defaultSubtitle = subtitle || (language === "vi" 
    ? "Có vẻ như bạn chưa tạo công việc nào."
    : "Looks like you haven't created any tasks yet."
  );

  const handleAddClick = () => {
    if (onAddNew) {
      onAddNew();
    } else if (onCreateTask) {
      onCreateTask();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon Card */}
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-3xl flex items-center justify-center">
          <svg 
            className="w-16 h-16 text-purple-400 dark:text-purple-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
            />
          </svg>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">✨</span>
        </div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-white text-sm">🎯</span>
        </div>
      </div>

      {/* Text */}
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
        {defaultTitle}
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
        {defaultSubtitle}
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        {onImport && (
          <Button variant="secondary" onClick={onImport}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {language === "vi" ? "Nhập khẩu" : "Import"}
          </Button>
        )}
        {(onAddNew || onCreateTask) && (
          <Button variant="primary" onClick={handleAddClick}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {language === "vi" ? "Thêm mới" : "Add New"}
          </Button>
        )}
      </div>
    </div>
  );
}
