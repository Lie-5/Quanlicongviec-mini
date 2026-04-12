"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Task, Priority, TaskStatus } from "../types";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "updatedAt" | "isFavorite" | "isPublic" | "progress" | "lastViewedAt">) => void;
}

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const { language } = useStore();
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setTitleEn("");
      setDescription("");
      setPriority("medium");
      setAssignee("");
      setDueDate("");
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!titleEn.trim()) {
      newErrors.titleEn = language === "vi" ? "Tên công việc bằng tiếng Anh là bắt buộc" : "English task name is required";
    }

    if (!title.trim() && language === "vi") {
      newErrors.title = "Tên công việc bằng tiếng Việt là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newTask: Omit<Task, "id" | "createdAt" | "updatedAt" | "isFavorite" | "isPublic" | "progress" | "lastViewedAt"> = {
      title: title || titleEn,
      titleEn,
      description,
      priority,
      status: "todo" as TaskStatus,
      dueDate: dueDate || undefined,
      assignee: assignee || undefined,
    };

    onSubmit(newTask);

    // Reset form
    setTitle("");
    setTitleEn("");
    setDescription("");
    setPriority("medium");
    setAssignee("");
    setDueDate("");
    setErrors({});
  };

  if (!isOpen) return null;

  const translations = {
    title: {
      en: "Add New Task",
      vi: "Thêm công việc mới",
      zh: "添加新任务",
      hi: "नया कार्य जोड़ें",
      ja: "新しいタスクを追加",
      fr: "Ajouter une nouvelle tâche",
    },
    taskNameEn: {
      en: "Task Name (English)",
      vi: "Tên công việc (Tiếng Anh)",
      zh: "任务名称（英文）",
      hi: "कार्य का नाम (अंग्रेजी)",
      ja: "タスク名（英語）",
      fr: "Nom de la tâche (Anglais)",
    },
    taskName: {
      en: "Task Name",
      vi: "Tên công việc",
      zh: "任务名称",
      hi: "कार्य का नाम",
      ja: "タスク名",
      fr: "Nom de la tâche",
    },
    description: {
      en: "Description (Optional)",
      vi: "Mô tả (Tùy chọn)",
      zh: "描述（可选）",
      hi: "विवरण (वैकल्पिक)",
      ja: "説明（オプション）",
      fr: "Description (Facultatif)",
    },
    priority: {
      en: "Priority",
      vi: "Mức độ ưu tiên",
      zh: "优先级",
      hi: "प्राथमिकता",
      ja: "優先度",
      fr: "Priorité",
    },
    high: {
      en: "High",
      vi: "Cao",
      zh: "高",
      hi: "उच्च",
      ja: "高",
      fr: "Haut",
    },
    medium: {
      en: "Medium",
      vi: "Trung bình",
      zh: "中等",
      hi: "मध्यम",
      ja: "中",
      fr: "Moyen",
    },
    low: {
      en: "Low",
      vi: "Thấp",
      zh: "低",
      hi: "कम",
      ja: "低",
      fr: "Bas",
    },
    assignee: {
      en: "Assign To (Optional)",
      vi: "Gán cho (Tùy chọn)",
      zh: "分配给（可选）",
      hi: "को असाइन करें (वैकल्पिक)",
      ja: "割り当て（オプション）",
      fr: "Assigner à (Facultatif)",
    },
    dueDate: {
      en: "Due Date (Optional)",
      vi: "Ngày hạn (Tùy chọn)",
      zh: "截止日期（可选）",
      hi: "देय तारीख (वैकल्पिक)",
      ja: "期日（オプション）",
      fr: "Date d'échéance (Facultatif)",
    },
    add: {
      en: "Add Task",
      vi: "Thêm công việc",
      zh: "添加任务",
      hi: "कार्य जोड़ें",
      ja: "タスクを追加",
      fr: "Ajouter une tâche",
    },
    cancel: {
      en: "Cancel",
      vi: "Hủy",
      zh: "取消",
      hi: "रद्द करें",
      ja: "キャンセル",
      fr: "Annuler",
    },
  };

  const getText = (key: keyof typeof translations): string => {
    const langKey = language as keyof typeof translations[keyof typeof translations];
    return (translations[key as keyof typeof translations] as any)[langKey] || (translations[key as keyof typeof translations] as any).en;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-gray-200 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {getText("title")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Task Name */}
          <div className="flex items-center gap-4">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {getText("taskName")}
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Name task"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              {errors.titleEn && (
                <p className="text-red-500 text-sm mt-1">{errors.titleEn}</p>
              )}
            </div>
          </div>

          {/* Priority Level */}
          <div className="flex items-center gap-4">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {getText("priority")}
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="high">{getText("high")}</option>
                <option value="medium">{getText("medium")}</option>
                <option value="low">{getText("low")}</option>
              </select>
            </div>
          </div>

          {/* Assign To */}
          <div className="flex items-center gap-4">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {getText("assignee")}
              </label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder={language === "vi" ? "Tên người..." : "Person's name..."}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Task Deadline */}
          <div className="flex items-center gap-4">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {getText("dueDate")}
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-semibold"
            >
              {getText("cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-semibold"
            >
              {getText("add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
