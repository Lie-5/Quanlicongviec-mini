"use client";

import { useState } from "react";
import { useStore } from "../store/useStore";
import { useTasks } from "../hooks/useTasks";
import { getTranslation } from "../lib/translations";
import { Task } from "../types";
import CalendarGrid from "./CalendarGrid";
import CalendarModal from "./CalendarModal";
import toast from "react-hot-toast";

export default function CalendarView() {
  const { language, columns } = useStore();
  const { createTask, editTask, removeTask, getAllTasks } = useTasks();
  const t = getTranslation(language);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Get all tasks from store
  const allTasks = getAllTasks();
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingTask(null);
    setIsModalOpen(true);
  };
  
  const handleTaskClick = (task: Task) => {
    setEditingTask(task);
    setSelectedDate(null);
    setIsModalOpen(true);
  };
  
  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      editTask(editingTask.id, taskData);
    } else if (selectedDate) {
      // Create new task with selected date
      const columnId = "todo";
      const newTask = {
        ...taskData,
        startDate: taskData.startDate || selectedDate.toISOString().split("T")[0],
        endDate: taskData.endDate || taskData.startDate || selectedDate.toISOString().split("T")[0],
      };
      
      // Use createTask from useTasks - it will add to the default column
      createTask(columnId, newTask);
    }
  };
  
  const handleDeleteTask = (taskId: string) => {
    removeTask(taskId);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setSelectedDate(null);
  };

  return (
    <div className="pt-[45px] min-h-screen transition-colors">
      {/* Page Header */}
      <div className="px-8 py-6 glass border-b border-slate-200/30 dark:border-slate-700/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-slate-500">{t.workspace}</span>
          <span className="text-sm text-slate-400">/</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t.tasks}</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          {language === "vi" ? "Lịch Công Việc" : "Task Calendar"}
        </h1>
      </div>

      {/* Calendar */}
      <div className="flex-1 overflow-auto">
        <CalendarGrid
          tasks={allTasks}
          language={language}
          onDateClick={handleDateClick}
          onTaskClick={handleTaskClick}
        />
      </div>

      {/* Modal */}
      <CalendarModal
        task={editingTask}
        selectedDate={selectedDate}
        language={language}
        isOpen={isModalOpen}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        onClose={handleCloseModal}
      />
    </div>
  );
}
