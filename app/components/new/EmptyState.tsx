"use client";

import { Language } from "../../types";

interface EmptyStateProps {
  language?: Language;
  onAddNew?: () => void;
  onImport?: () => void;
}

export default function EmptyState({
  language = "en",
  onAddNew,
  onImport,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon Card */}
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center">
          <svg 
            className="w-16 h-16 text-purple-400" 
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
        {/* Decorative */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">✨</span>
        </div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-white text-sm">🎯</span>
        </div>
      </div>

      {/* Text */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {language === "vi" ? "Oops! Không có công việc" : "Oops! No Task"}
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        {language === "vi" 
          ? "Có vẻ như bạn chưa tạo công việc nào. Hãy bắt đầu bằng cách tạo công việc đầu tiên!"
          : "Looks like you haven't created any tasks yet. Start by creating your first task!"
        }
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        {onImport && (
          <button
            onClick={onImport}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            {language === "vi" ? "Nhập khẩu" : "Import"}
          </button>
        )}
        {onAddNew && (
          <button
            onClick={onAddNew}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            {language === "vi" ? "Thêm công việc mới" : "Add New Task"}
          </button>
        )}
      </div>
    </div>
  );
}