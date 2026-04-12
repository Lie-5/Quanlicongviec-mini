"use client";

import { Task, Language } from "../../types";
import TaskCard from "./TaskCard";

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  language?: Language;
  onAddTask?: (columnId: string) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onToggleFavorite?: (taskId: string) => void;
}

export default function Column({
  id,
  title,
  tasks,
  language = "en",
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleFavorite,
}: ColumnProps) {
  // Column colors
  const columnColors: Record<string, string> = {
    todo: "bg-gray-500",
    "in-progress": "bg-orange-500",
    review: "bg-blue-500",
    done: "bg-green-500",
  };

  return (
    <div className="flex flex-col w-80 min-w-[320px] bg-gray-50 rounded-2xl border border-gray-200">
      {/* Column Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full ${columnColors[id] || "bg-gray-500"}`} />
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-lg">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask && onAddTask(id)}
          className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Tasks List */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-250px)]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            language={language}
            onEdit={onEditTask || (() => {})}
            onDelete={onDeleteTask || (() => {})}
            onToggleFavorite={onToggleFavorite || (() => {})}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-xs text-gray-400 text-center">
              {language === "vi" ? "Chưa có công việc" : "No tasks yet"}
            </p>
            <button
              onClick={() => onAddTask && onAddTask(id)}
              className="mt-2 text-xs text-purple-600 font-medium hover:text-purple-700"
            >
              {language === "vi" ? "+ Thêm công việc" : "+ Add task"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}