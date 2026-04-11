"use client";

import { useState } from "react";
import { Task, Language } from "../types";
import Badge from "./Badge";
import Button from "./Button";

interface TaskCardProps {
  task: Task;
  language: Language;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleFavorite: (taskId: string) => void;
  priorityColors?: Record<string, string>;
  priorityLabels?: Record<string, string>;
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
  const [isHovered, setIsHovered] = useState(false);

  const getTaskTitle = () => (language === "vi" ? task.title : task.titleEn);
  const getTag = () => (language === "vi" ? task.tag : task.tagEn);

  // Get priority variant for badge
  const getPriorityVariant = (): "low" | "medium" | "high" => {
    return task.priority as "low" | "medium" | "high";
  };

  // Get priority label
  const getPriorityLabel = () => {
    if (language === "vi") {
      return task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp";
    }
    return task.priority === "high" ? "High" : task.priority === "medium" ? "Medium" : "Low";
  };

  // Get status label
  const getStatusLabel = () => {
    if (language === "vi") {
      return task.status === "todo" ? "Cần làm" : 
             task.status === "in-progress" ? "Đang làm" : 
             task.status === "review" ? "Đang xem xét" : "Hoàn thành";
    }
    return task.status === "todo" ? "To Do" : 
           task.status === "in-progress" ? "In Progress" : 
           task.status === "review" ? "In Review" : "Done";
  };

  // Check if overdue
  const isOverdue = () => {
    if (!task.dueDate) return false;
    const due = new Date(task.dueDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return due < now;
  };

  // Format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Status colors
  const getStatusColor = () => {
    switch (task.status) {
      case "todo":
        return "bg-slate-500";
      case "in-progress":
        return "bg-orange-500";
      case "review":
        return "bg-blue-500";
      case "done":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMenuOpen(false);
      }}
      onClick={() => onEdit(task)}
      className="group bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer relative"
    >
      {/* Header: Favorite & Menu */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {getTag() && (
            <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-medium rounded-lg">
              {getTag()}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(task.id);
            }}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
            title={language === "vi" ? "Yêu thích" : "Favorite"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={task.isFavorite ? "#F5A623" : "none"}
              stroke={task.isFavorite ? "#F5A623" : "currentColor"}
              strokeWidth="2"
              className={`transition-all duration-200 ${task.isFavorite ? "text-amber-500" : "text-slate-400"}`}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>

          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className={`p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L13.5 13.5" />
                  </svg>
                  {language === "vi" ? "Chỉnh sửa" : "Edit"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(language === "vi" ? "Bạn có chắc chắn muốn xóa?" : "Are you sure you want to delete?")) {
                      onDelete(task.id);
                    }
                    setMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H6a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  {language === "vi" ? "Xóa" : "Delete"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Title */}
      <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-4 line-clamp-2">
        {getTaskTitle()}
      </h3>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Priority Badge */}
        <Badge variant={getPriorityVariant()}>
          {getPriorityLabel()}
        </Badge>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor()}`}></span>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            {getStatusLabel()}
          </span>
        </div>

        {/* Deadline */}
        {task.dueDate && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
            isOverdue() 
              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" 
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          }`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">
              {formatDate(task.dueDate)}
              {isOverdue() && (language === "vi" ? " (quá hạn)" : " (overdue)")}
            </span>
          </div>
        )}

        {/* Public/Private */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-500">
          {task.isPublic ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {task.progress > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {language === "vi" ? "Tiến độ" : "Progress"}
            </span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {task.progress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer: Created & Assignee */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2">
          {/* Avatar Display for Assigned Members */}
          {task.assignedTo && task.assignedTo.length > 0 ? (
            <div className="flex items-center">
              {task.assignedTo.slice(0, 3).map((assignee, index) => (
                <div key={index} className="relative">
                  {assignee.avatar ? (
                    <img
                      src={assignee.avatar}
                      alt={assignee.name}
                      className="w-6 h-6 rounded-lg object-cover border-2 border-white dark:border-slate-800"
                      style={{ marginLeft: index > 0 ? "-8px" : "0" }}
                    />
                  ) : (
                    <div
                      className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-slate-800"
                      style={{ marginLeft: index > 0 ? "-8px" : "0" }}
                    >
                      {assignee.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
              {task.assignedTo.length > 3 && (
                <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-500 dark:text-slate-400 border-2 border-white dark:border-slate-800 -ml-2">
                  +{task.assignedTo.length - 3}
                </div>
              )}
            </div>
          ) : (
            <span className="text-xs text-slate-400">
              {language === "vi" ? "Chưa giao" : "Unassigned"}
            </span>
          )}
        </div>

        <span className="text-xs text-slate-400">
          {formatDate(task.createdAt)}
        </span>
      </div>
    </div>
  );
}
