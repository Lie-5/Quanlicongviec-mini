"use client";

import { useState, useEffect, useMemo } from "react";
import { Task, Language, Priority } from "../types";
import { getTranslation } from "../lib/translations";
import ProgressBar from "./ProgressBar";
import DateRangePicker from "./DateRangePicker";

interface CalendarModalProps {
  task: Task | null;
  selectedDate: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  language: Language;
  isOpen: boolean;
  onSave: (taskData: Partial<Task>) => void;
  onDelete?: (taskId: string) => void;
  onClose: () => void;
}

const PRIORITY_COLORS = {
  high: { bg: "bg-red-500", label: "High" },
  medium: { bg: "bg-yellow-500", label: "Medium" },
  low: { bg: "bg-green-500", label: "Low" },
};

export default function CalendarModal({
  task,
  selectedDate,
  rangeStart,
  rangeEnd,
  language,
  isOpen,
  onSave,
  onDelete,
  onClose,
}: CalendarModalProps) {
  const t = getTranslation(language);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatTimeForInput = (time?: string) => {
    return time || "09:00";
  };

  // Compute initial form data based on props
  const initialFormData = useMemo(() => {
    let startDateStr: string;
    let endDateStr: string;
    
    if (rangeStart && rangeEnd) {
      startDateStr = formatDateForInput(rangeStart < rangeEnd ? rangeStart : rangeEnd);
      endDateStr = formatDateForInput(rangeStart < rangeEnd ? rangeEnd : rangeStart);
    } else if (selectedDate) {
      startDateStr = formatDateForInput(selectedDate);
      endDateStr = formatDateForInput(selectedDate);
    } else {
      startDateStr = formatDateForInput(new Date());
      endDateStr = formatDateForInput(new Date());
    }
    
    if (task) {
      return {
        title: task.title,
        titleEn: task.titleEn,
        description: task.description || "",
        descriptionEn: task.descriptionEn || "",
        priority: task.priority,
        startDate: task.startDate || task.dueDate || startDateStr,
        endDate: task.endDate || task.dueDate || endDateStr,
        startTime: task.startTime || "09:00",
        endTime: task.endTime || "10:00",
        progress: task.progress || 0,
        tag: task.tag || "",
        tagEn: task.tagEn || "",
      };
    }
    
    return {
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      priority: "medium" as Priority,
      startDate: startDateStr,
      endDate: endDateStr,
      startTime: "09:00",
      endTime: "10:00",
      progress: 0,
      tag: "",
      tagEn: "",
    };
  }, [task, selectedDate, rangeStart, rangeEnd]);

  const [formData, setFormData] = useState(initialFormData);

  // Reset form data when modal opens with new initial data
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen, initialFormData.startDate, initialFormData.endDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...formData,
      titleEn: formData.titleEn || formData.title,
      descriptionEn: formData.descriptionEn || formData.description,
      tagEn: formData.tagEn || formData.tag,
    });
    onClose();
  };

  // Handle range change from DateRangePicker
  const handleRangeChange = (start: Date | null, end: Date | null) => {
    if (start && end) {
      setFormData(prev => ({
        ...prev,
        startDate: formatDateForInput(start),
        endDate: formatDateForInput(end),
      }));
    }
  };

  // Check if it's a multi-day range
  const isMultiDayRange = formData.startDate !== formData.endDate;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="glass-light rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {task ? t.edit : t.addTask}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 hover:rotate-90"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t.taskName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder={language === "vi" ? "Nhập tên công việc..." : "Enter task name..."}
              required
            />
          </div>

          {/* Title (English) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Title (English)
            </label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Enter task name in English..."
            />
          </div>

          {/* Date Range Section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {language === "vi" ? "Ngày" : "Date"}
              </label>
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400"
              >
                {showDatePicker 
                  ? (language === "vi" ? "Ẩn lịch" : "Hide calendar")
                  : (language === "vi" ? "Chọn từ lịch" : "Pick from calendar")
                }
              </button>
            </div>
            
            {/* Date Range Picker (collapsible) */}
            {showDatePicker && (
              <div className="mb-4">
                <DateRangePicker
                  startDate={formData.startDate ? new Date(formData.startDate) : null}
                  endDate={formData.endDate ? new Date(formData.endDate) : null}
                  onRangeChange={handleRangeChange}
                  language={language}
                />
              </div>
            )}

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {language === "vi" ? "Bắt đầu" : "Start"}
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {language === "vi" ? "Kết thúc" : "End"}
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {/* Range indicator */}
            {isMultiDayRange && (
              <div className="mt-2 flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {language === "vi" 
                    ? `Nhiệm vụ kéo dài ${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} ngày`
                    : `Task spans ${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days`
                  }
                </span>
              </div>
            )}
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {language === "vi" ? "Giờ bắt đầu" : "Start Time"}
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {language === "vi" ? "Giờ kết thúc" : "End Time"}
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t.priority}
            </label>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as Priority[]).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority })}
                  className={`
                    flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all
                    ${formData.priority === priority 
                      ? `${PRIORITY_COLORS[priority].bg} text-white shadow-lg` 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}
                  `}
                >
                  {language === "vi" 
                    ? (priority === "high" ? "Cao" : priority === "medium" ? "Trung bình" : "Thấp")
                    : PRIORITY_COLORS[priority].label
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div>
            <ProgressBar 
              progress={formData.progress} 
              showLabel 
              label={t.progress || "Progress"} 
              size="md" 
            />
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
              className="w-full mt-3 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t.taskDescription}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[80px]"
              placeholder={language === "vi" ? "Nhập mô tả..." : "Enter description..."}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            {task && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(task.id);
                  onClose();
                }}
                className="px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 text-sm font-medium"
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
                className="px-5 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 text-sm font-medium hover:scale-105 active:scale-95"
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
