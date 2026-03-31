"use client";

import { useState, useCallback, useMemo } from "react";
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
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [enableRangeSelection, setEnableRangeSelection] = useState(false);
  
  // Get all tasks from store - memoized to prevent unnecessary re-renders
  const allTasks = useMemo(() => getAllTasks(), [getAllTasks]);
  
  // Handle single date click
  const handleDateClick = useCallback((date: Date) => {
    if (!enableRangeSelection) {
      setSelectedDate(date);
      setRangeStart(null);
      setRangeEnd(null);
      setEditingTask(null);
      setIsModalOpen(true);
    }
  }, [enableRangeSelection]);
  
  // Handle range selection from calendar
  const handleRangeSelect = useCallback((start: Date, end: Date) => {
    setRangeStart(start);
    setRangeEnd(end);
    setSelectedDate(null);
    setEditingTask(null);
    setIsModalOpen(true);
    setEnableRangeSelection(false);
  }, []);
  
  // Handle task click
  const handleTaskClick = useCallback((task: Task) => {
    setEditingTask(task);
    setSelectedDate(null);
    setRangeStart(null);
    setRangeEnd(null);
    setIsModalOpen(true);
    setEnableRangeSelection(false);
  }, []);
  
  // Toggle range selection mode
  const toggleRangeSelection = useCallback(() => {
    setEnableRangeSelection(prev => !prev);
    if (enableRangeSelection) {
      setRangeStart(null);
      setRangeEnd(null);
    }
  }, [enableRangeSelection]);
  
  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      editTask(editingTask.id, taskData);
      toast.success(t.taskUpdated || "Task updated");
    } else {
      // Create new task with selected date/range
      const columnId = "todo";
      const newTask = {
        ...taskData,
        startDate: taskData.startDate || (selectedDate ? selectedDate.toISOString().split("T")[0] : undefined),
        endDate: taskData.endDate || taskData.startDate || (selectedDate ? selectedDate.toISOString().split("T")[0] : undefined),
      };
      
      // Use createTask from useTasks - it will add to the default column
      createTask(columnId, newTask);
      toast.success(t.taskCreated || "Task created");
    }
  };
  
  const handleDeleteTask = (taskId: string) => {
    removeTask(taskId);
    toast.success(t.taskDeleted || "Task deleted");
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setSelectedDate(null);
    setRangeStart(null);
    setRangeEnd(null);
    setEnableRangeSelection(false);
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {language === "vi" ? "Lịch Công Việc" : "Task Calendar"}
          </h1>
          
          {/* Range Selection Toggle */}
          <button
            onClick={toggleRangeSelection}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
              ${enableRangeSelection 
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 ring-2 ring-yellow-400/50" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }
            `}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">
              {language === "vi" ? "Chọn khoảng" : "Select Range"}
            </span>
          </button>
        </div>
        
        {/* Range Selection Hint */}
        {enableRangeSelection && (
          <div className="mt-3 flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {language === "vi" 
                ? "Nhấp vào ngày bắt đầu, sau đó nhấp vào ngày kết thúc để tạo nhiệm vụ kéo dài nhiều ngày"
                : "Click start date, then click end date to create a multi-day task"
              }
            </span>
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="flex-1 overflow-auto">
        <CalendarGrid
          tasks={allTasks}
          language={language}
          onDateClick={handleDateClick}
          onTaskClick={handleTaskClick}
          onRangeSelect={handleRangeSelect}
          enableRangeSelection={enableRangeSelection}
        />
      </div>

      {/* Modal */}
      <CalendarModal
        task={editingTask}
        selectedDate={selectedDate}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        language={language}
        isOpen={isModalOpen}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        onClose={handleCloseModal}
      />
    </div>
  );
}
