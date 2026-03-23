"use client";

import { Language } from "../types";

interface EmptyStateProps {
  language: Language;
  onCreateTask: () => void;
}

// Simple i18n for EmptyState
const translations = {
  en: {
    noTasks: "No tasks yet",
    description: "Get started by creating your first task. Organize and manage your work efficiently.",
    createFirst: "Create your first task",
    createTasks: "Create tasks",
    setPriorities: "Set priorities",
    complete: "Complete",
  },
  vi: {
    noTasks: "Chưa có công việc nào",
    description: "Bắt đầu bằng cách tạo công việc đầu tiên của bạn. Tổ chức và quản lý công việc một cách hiệu quả.",
    createFirst: "Tạo công việc đầu tiên",
    createTasks: "Tạo công việc",
    setPriorities: "Đặt ưu tiên",
    complete: "Hoàn thành",
  },
  zh: {
    noTasks: "暂无任务",
    description: "开始创建您的第一个任务。高效地组织和管理您的工作。",
    createFirst: "创建第一个任务",
    createTasks: "创建任务",
    setPriorities: "设置优先级",
    complete: "完成",
  },
  hi: {
    noTasks: "अभी तक कोई कार्य नहीं",
    description: "अपना पहला कार्य बनाकर शुरू करें। अपने कार्य को कुशलता से व्यवस्थित और प्रबंधित करें।",
    createFirst: "अपना पहला कार्य बनाएं",
    createTasks: "कार्य बनाएं",
    setPriorities: "प्राथमिकता निर्धारित करें",
    complete: "पूर्ण",
  },
  ja: {
    noTasks: "タスクがありません",
    description: "最初のタスクを作成して始めましょう。作業を効率的に整理・管理します。",
    createFirst: "最初のタスクを作成",
    createTasks: "タスク作成",
    setPriorities: "優先度を設定",
    complete: "完了",
  },
  fr: {
    noTasks: "Pas encore de tâches",
    description: "Commencez par créer votre première tâche. Organisez et gérez efficacement votre travail.",
    createFirst: "Créer votre première tâche",
    createTasks: "Créer des tâches",
    setPriorities: "Définir les priorités",
    complete: "Terminé",
  },
};

export default function EmptyState({ language, onCreateTask }: EmptyStateProps) {
  const t = translations[language] || translations.en;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      {/* Animated Illustration */}
      <div className="relative mb-8 group">
        {/* Floating orbs animation */}
        <div className="absolute inset-0 w-40 h-40 mx-auto bg-gradient-to-r from-blue-400/30 to-indigo-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse" />
        
        {/* Main icon container */}
        <div className="relative w-36 h-36 bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-2xl">
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-blue-500 dark:text-blue-400 drop-shadow-lg"
          >
            {/* Task list icon */}
            <rect x="3" y="4" width="18" height="16" rx="2" className="stroke-blue-300/50" />
            <line x1="3" y1="10" x2="21" y2="10" className="stroke-blue-300/30" />
            <line x1="3" y1="15" x2="15" y2="15" className="stroke-blue-300/30" />
            <circle cx="7" cy="7" r="1.5" fill="currentColor" className="text-blue-500" />
            <circle cx="7" cy="12" r="1.5" fill="currentColor" className="text-blue-400/60" />
            {/* Checkmark */}
            <path d="M16 6l2.5 2.5L21 2" className="stroke-emerald-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        {/* Floating add button */}
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-yellow-400/80 rounded-full shadow-lg shadow-yellow-400/30 animate-ping" />
        <div className="absolute top-1/2 -right-4 w-4 h-4 bg-purple-400/60 rounded-full" />
      </div>

      {/* Message */}
      <h2 className="text-[28px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3">
        {t.noTasks}
      </h2>
      <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-8 text-center max-w-[420px] leading-relaxed">
        {t.description}
      </p>

      {/* CTA Button */}
      <button
        onClick={onCreateTask}
        className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
      >
        {/* Button shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        
        <span className="relative flex items-center gap-2 font-medium">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-90 transition-transform duration-300">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {t.createFirst}
        </span>
      </button>

      {/* Feature cards */}
      <div className="mt-16 grid grid-cols-3 gap-6 max-w-[700px]">
        <div className="glass-card rounded-xl p-5 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[13px] font-medium text-slate-600 dark:text-slate-300">
            {t.createTasks}
          </p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-500">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[13px] font-medium text-slate-600 dark:text-slate-300">
            {t.setPriorities}
          </p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center hover:scale-105 transition-transform duration-200">
          <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[13px] font-medium text-slate-600 dark:text-slate-300">
            {t.complete}
          </p>
        </div>
      </div>
    </div>
  );
}
