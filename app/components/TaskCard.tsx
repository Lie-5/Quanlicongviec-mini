"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, Language } from "../types";
import ProgressBar from "./ProgressBar";

// Simple i18n translations
const translations = {
  en: { public: "Public", private: "Private", edit: "Edit", delete: "Delete", progress: "Progress", addToFavorites: "Add to favorites", removeFromFavorites: "Remove from favorites" },
  vi: { public: "Công khai", private: "Riêng tư", edit: "Chỉnh sửa", delete: "Xóa", progress: "Tiến độ", addToFavorites: "Thêm vào yêu thích", removeFromFavorites: "Bỏ yêu thích" },
  zh: { public: "公开", private: "私有", edit: "编辑", delete: "删除", progress: "进度", addToFavorites: "添加到收藏", removeFromFavorites: "从收藏中移除" },
  hi: { public: "सार्वजनिक", private: "निजी", edit: "संपादित करें", delete: "हटाएं", progress: "प्रगति", addToFavorites: "पसंदीदा में जोड़ें", removeFromFavorites: "पसंदीदा से हटाएं" },
  ja: { public: "公開", private: "プライベート", edit: "編集", delete: "削除", progress: "進捗", addToFavorites: "お気に入りに追加", removeFromFavorites: "お気に入りから削除" },
  fr: { public: "Public", private: "Privé", edit: "Modifier", delete: "Supprimer", progress: "Progression", addToFavorites: "Ajouter aux favoris", removeFromFavorites: "Retirer des favoris" },
};

interface TaskCardProps {
  task: Task;
  language: Language;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleFavorite: (taskId: string) => void;
  priorityColors: Record<string, string>;
  priorityLabels: Record<string, string>;
}

export default function TaskCard({
  task,
  language,
  onEdit,
  onDelete,
  onToggleFavorite,
  priorityColors,
  priorityLabels,
}: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getTaskTitle = () => (language === "vi" ? task.title : task.titleEn);
  const getTag = () => (language === "vi" ? task.tag : task.tagEn);
  const t = translations[language] || translations.en;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onEdit(task)}
      className="glass-card rounded-lg p-4 cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 relative group"
    >
      {/* Favorite Star Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(task.id);
        }}
        className="absolute top-2 right-2 p-1 hover:scale-110 transition-transform duration-200 active:scale-95 z-10"
        title={task.isFavorite ? t.removeFromFavorites : t.addToFavorites}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={task.isFavorite ? "#F5A623" : "none"}
          stroke={task.isFavorite ? "#F5A623" : "#9b9a97"}
          strokeWidth="2"
          className="transition-all"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>

      {getTag() && (
        <span className="inline-block px-2 py-0.5 bg-[#f7f6f3] dark:bg-[#4f4f4f] text-[12px] text-[#9b9a97] rounded-[3px] mb-2 transition-colors duration-200 hover:bg-[#eaeaea] dark:hover:bg-[#5f5f5f]">
          {getTag()}
        </span>
      )}

      <div className="flex items-start justify-between">
        <p className="text-[14px] text-[#37352f] dark:text-[#e0e0e0] flex-1 mr-8">
          {getTaskTitle()}
        </p>

        {/* 3 dots menu button */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-1 hover:bg-[#f0f0f0] dark:hover:bg-[#4f4f4f] rounded text-[#9b9a97] text-[12px] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ⋮
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-[120px] bg-white dark:bg-[#3f3f3f] border border-[#e0e0e0] dark:border-[#4f4f4f] rounded-[4px] shadow-lg z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                  setMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-[13px] text-[#37352f] dark:text-[#e0e0e0] hover:bg-[#f0f0f0] dark:hover:bg-[#4f4f4f] rounded-t-[4px]"
              >
                {t.edit}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                  setMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-[13px] text-red-500 hover:bg-[#f0f0f0] dark:hover:bg-[#4f4f4f] rounded-b-[4px]"
              >
                {t.delete}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {task.progress > 0 && (
        <div className="mt-2">
          <ProgressBar progress={task.progress} label={t.progress} showLabel size="sm" />
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] px-1.5 py-0.5 rounded-[3px] text-white"
            style={{ backgroundColor: priorityColors[task.priority] }}
          >
            {priorityLabels[task.priority]}
          </span>
          {task.dueDate && (
            <span className="text-[11px] text-[#9b9a97]">📅 {task.dueDate}</span>
          )}
          <span className="text-[11px]" title={task.isPublic ? t.public : t.private}>
            {task.isPublic ? "🌍" : "🔒"}
          </span>
        </div>
      </div>
    </div>
  );
}
