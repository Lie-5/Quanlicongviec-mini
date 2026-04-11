"use client";

import { useState, useEffect } from "react";
import { Task, Priority, Language } from "../../types";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => void;
  task?: Task | null;
  language?: Language;
  defaultStatus?: string;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onSave,
  task,
  language = "en",
  defaultStatus = "todo",
}: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    priority: "medium" as Priority,
    dueDate: "",
    assigneeName: "",
    status: defaultStatus,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setFormData({
          title: task.title,
          titleEn: task.titleEn,
          priority: task.priority,
          dueDate: task.dueDate || "",
          assigneeName: task.assignee || "",
          status: task.status,
        });
      } else {
        setFormData({
          title: "",
          titleEn: "",
          priority: "medium",
          dueDate: "",
          assigneeName: "",
          status: defaultStatus,
        });
      }
      setErrors({});
    }
  }, [isOpen, task, defaultStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        status: formData.status as Task["status"],
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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {task 
              ? (language === "vi" ? "Sửa công việc" : "Edit Task")
              : (language === "vi" ? "Thêm công việc mới" : "Add New Task")
            }
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {language === "vi" ? "Tên công việc" : "Task Name"} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={language === "vi" ? "Nhập tên công việc..." : "Enter task name..."}
              className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-purple-500 ${
                errors.title ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {language === "vi" ? "Tên tiếng Anh" : "English Name"} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="titleEn"
              value={formData.titleEn}
              onChange={handleChange}
              placeholder={language === "vi" ? "Nhập tên tiếng Anh..." : "Enter English name..."}
              className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-purple-500 ${
                errors.titleEn ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.titleEn && (
              <p className="mt-1 text-xs text-red-500">{errors.titleEn}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {language === "vi" ? "Độ ưu tiên" : "Priority"}
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-purple-500"
            >
              <option value="low">{language === "vi" ? "Thấp" : "Low"}</option>
              <option value="medium">{language === "vi" ? "Trung bình" : "Medium"}</option>
              <option value="high">{language === "vi" ? "Cao" : "High"}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {language === "vi" ? "Ngày hết hạn" : "Deadline"}
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {language === "vi" ? "Người phụ trách" : "Assignee"}
            </label>
            <input
              type="text"
              name="assigneeName"
              value={formData.assigneeName}
              onChange={handleChange}
              placeholder={language === "vi" ? "Nhập tên..." : "Enter name..."}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              {language === "vi" ? "Hủy" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <svg className="animate-spin w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                language === "vi" ? "Lưu" : "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}