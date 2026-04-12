"use client";

import { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  language?: string;
  onToggleFavorite?: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const handleEdit = onEdit || (() => {});
  const handleDelete = onDelete || (() => {});
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-600";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-600";
      case "low":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-600";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "todo":
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">{task.description}</p>
          )}
        </div>
        <button
          onClick={() => handleDelete(task.id)}
          className="ml-2 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/50 transition-all duration-200"
          aria-label="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(task.status)}`}>
          {task.status === "in-progress"
            ? "In Progress"
            : task.status === "done"
            ? "Done"
            : "To Do"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-slate-400 mb-3">
        <div>
          <p className="text-xs text-gray-500 dark:text-slate-500">Due Date</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-slate-500">Assignee</p>
          <p className="font-medium text-gray-900 dark:text-white">{task.assignee || "Unassigned"}</p>
        </div>
      </div>

      <button
        onClick={() => handleEdit(task)}
        className="w-full px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 border border-blue-200 dark:border-blue-600"
      >
        Edit Task
      </button>
    </div>
  );
}