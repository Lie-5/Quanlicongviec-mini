"use client";

import { useState, useEffect } from "react";
import { Task, Language } from "../types";
import { getTranslation } from "../lib/translations";
import VisibilityToggle from "./VisibilityToggle";

interface TaskModalProps {
  task: Task | null;
  columnId: string;
  language: Language;
  onSave: (taskData: Partial<Task>) => void;
  onDelete?: (taskId: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function TaskModal({
  task,
  columnId,
  language,
  onSave,
  onDelete,
  onClose,
  isOpen,
}: TaskModalProps) {
  const t = getTranslation(language);
  const getInitialFormData = () => {
    if (task) {
      return {
        title: task.title,
        titleEn: task.titleEn,
        description: task.description || "",
        descriptionEn: task.descriptionEn || "",
        priority: task.priority,
        status: task.status as string,
        dueDate: task.dueDate || "",
        tag: task.tag || "",
        tagEn: task.tagEn || "",
        isPublic: task.isPublic || false,
        progress: task.progress || 0,
      };
    }
    return {
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      priority: "medium" as Task["priority"],
      status: columnId,
      dueDate: "",
      tag: "",
      tagEn: "",
      isPublic: false,
      progress: 0,
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  useEffect(() => {
    setFormData(getInitialFormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task?.id, columnId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...formData,
      status: formData.status as Task["status"],
      titleEn: formData.titleEn || formData.title,
      descriptionEn: formData.descriptionEn || formData.description,
      tagEn: formData.tagEn || formData.tag,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="glass-light rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[#e0e0e0] dark:border-[#3f3f3f] flex items-center justify-between sticky top-0 bg-white dark:bg-[#2f2f2f]">
          <h3 className="font-medium text-[#37352f] dark:text-[#e0e0e0]">
            {task ? t.edit : t.addTask}
          </h3>
          <div className="flex items-center gap-3">
            <VisibilityToggle
              isPublic={formData.isPublic}
              onChange={(isPublic) => setFormData({ ...formData, isPublic })}
              language={language}
            />
            <button
              onClick={onClose}
              className="text-[#9b9a97] hover:text-[#37352f] dark:hover:text-[#e0e0e0] transition-all duration-200 hover:rotate-90"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
              {t.taskName}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              placeholder={language === "vi" ? "Nhập tên công việc..." : "Enter task name..."}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
              {t.taskDescription}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2] min-h-[100px]"
              placeholder={language === "vi" ? "Nhập mô tả công việc..." : "Enter task description..."}
            />
          </div>

          

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                {t.priority}
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as Task["priority"] })
                }
                className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              >
                <option value="high">{t.priorityHigh}</option>
                <option value="medium">{t.priorityMedium}</option>
                <option value="low">{t.priorityLow}</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                {t.status}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              >
                <option value="todo">{t.statusTodo}</option>
                <option value="in-progress">{t.statusInProgress}</option>
                <option value="review">{t.statusReview}</option>
                <option value="done">{t.statusDone}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Due Date */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                {t.dueDate}
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              />
            </div>

            {/* Progress */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                Progress ({formData.progress}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                className="w-full h-2 bg-[#e0e0e0] dark:bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer accent-[#2383E2]"
              />
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
              {t.tag}
            </label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              placeholder={language === "vi" ? "Nhãn..." : "Tag..."}
            />
          </div>

          <div className="flex justify-between pt-4 border-t border-[#e0e0e0] dark:border-[#3f3f3f]">
            {task && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(task.id);
                  onClose();
                }}
                className="px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-[4px] transition-all duration-200 active:scale-95"
              >
                {t.delete}
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[14px] text-[#9b9a97] hover:bg-[#f7f6f3] dark:hover:bg-[#3f3f3f] rounded-[4px] transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-[14px] bg-[#2383E2] text-white rounded-[4px] hover:bg-[#1a6fc4] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              >
                {t.save}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
