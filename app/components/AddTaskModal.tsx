"use client";

import { useState, useEffect } from "react";
import { Task, Priority, TaskStatus, Language } from "../types";
import Button from "./Button";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => void;
  task?: Task | null;
  language: Language;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onSave,
  task,
  language,
}: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    priority: "medium" as Priority,
    dueDate: "",
    assigneeName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens or task changes
  useEffect(() => {
    if (isOpen) {
      if (task) {
        setFormData({
          title: task.title,
          titleEn: task.titleEn,
          priority: task.priority,
          dueDate: task.dueDate || "",
          assigneeName: task.assignee || "",
        });
      } else {
        setFormData({
          title: "",
          titleEn: "",
          priority: "medium",
          dueDate: "",
          assigneeName: "",
        });
      }
      setErrors({});
    }
  }, [isOpen, task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = language === "vi" ? "Tên công việc là bắt buộc" : "Task name is required";
    }
    
    if (!formData.titleEn.trim()) {
      newErrors.titleEn = language === "vi" ? "Tên tiếng Anh là bắt buộc" : "English name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const taskData: Partial<Task> = {
        title: formData.title.trim(),
        titleEn: formData.titleEn.trim(),
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
        assignee: formData.assigneeName || undefined,
        status: task?.status || "todo",
        isFavorite: task?.isFavorite || false,
        isPublic: task?.isPublic || false,
        progress: task?.progress || 0,
      };

      await onSave(taskData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md mx-4 animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {task 
              ? (language === "vi" ? "Chỉnh s��a công việc" : "Edit Task")
              : (language === "vi" ? "Thêm công việc mới" : "Add New Task")
            }
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === "vi" ? "Tên công việc" : "Task Name"} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={language === "vi" ? "Nhập tên công việc..." : "Enter task name..."}
              className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none transition-colors focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.title 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-slate-200 dark:border-slate-700"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* English Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === "vi" ? "Tên tiếng Anh" : "English Name"} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="titleEn"
              value={formData.titleEn}
              onChange={handleChange}
              placeholder={language === "vi" ? "Nhập tên tiếng Anh..." : "Enter English name..."}
              className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none transition-colors focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.titleEn 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-slate-200 dark:border-slate-700"
              }`}
            />
            {errors.titleEn && (
              <p className="mt-1 text-sm text-red-500">{errors.titleEn}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === "vi" ? "Độ ưu tiên" : "Priority"}
            </label>
            <div className="relative">
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 outline-none transition-colors focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="low">
                  {language === "vi" ? "Thấp" : "Low"}
                </option>
                <option value="medium">
                  {language === "vi" ? "Trung bình" : "Medium"}
                </option>
                <option value="high">
                  {language === "vi" ? "Cao" : "High"}
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === "vi" ? "Ngày hết hạn" : "Deadline"}
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 outline-none transition-colors focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === "vi" ? "Người phụ trách" : "Assignee"}
            </label>
            <input
              type="text"
              name="assigneeName"
              value={formData.assigneeName}
              onChange={handleChange}
              placeholder={language === "vi" ? "Nhập tên người phụ trách..." : "Enter assignee name..."}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none transition-colors focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              {language === "vi" ? "Hủy" : "Cancel"}
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="flex-1"
            >
              {language === "vi" ? "Lưu" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}