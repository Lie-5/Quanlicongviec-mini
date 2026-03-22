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
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-[#2383E2]/20 to-[#1a6fc4]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#2383E2]"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="9" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#E16737] to-[#d15527] rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">+</span>
        </div>
      </div>

      <h2 className="text-[24px] font-bold text-[#37352f] dark:text-[#e0e0e0] mb-2">
        {t.noTasks}
      </h2>
      <p className="text-[14px] text-[#9b9a97] mb-6 text-center max-w-[400px]">
        {t.description}
      </p>

      <button
        onClick={onCreateTask}
        className="px-6 py-3 bg-gradient-to-r from-[#2383E2] to-[#1a6fc4] text-white rounded-[8px] hover:shadow-lg hover:shadow-[#2383E2]/30 transition-all font-medium flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {t.createFirst}
      </button>

      <div className="mt-12 grid grid-cols-3 gap-6 max-w-[600px]">
        <div className="text-center">
          <div className="w-12 h-12 bg-[#f7f6f3] dark:bg-[#2f2f2f] rounded-[8px] flex items-center justify-center mx-auto mb-2">
            <span className="text-[24px]">📝</span>
          </div>
          <p className="text-[12px] text-[#9b9a97]">
            {t.createTasks}
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-[#f7f6f3] dark:bg-[#2f2f2f] rounded-[8px] flex items-center justify-center mx-auto mb-2">
            <span className="text-[24px]">🎯</span>
          </div>
          <p className="text-[12px] text-[#9b9a97]">
            {t.setPriorities}
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-[#f7f6f3] dark:bg-[#2f2f2f] rounded-[8px] flex items-center justify-center mx-auto mb-2">
            <span className="text-[24px]">✅</span>
          </div>
          <p className="text-[12px] text-[#9b9a97]">
            {t.complete}
          </p>
        </div>
      </div>
    </div>
  );
}
