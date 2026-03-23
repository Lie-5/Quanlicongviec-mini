"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useStore } from "../store/useStore";
import { useTasks } from "../hooks/useTasks";
import { getTranslation } from "../lib/translations";
import { Task, TaskStatus } from "../types";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import EmptyState from "./EmptyState";

export default function TaskBoardNew() {
  const { language, searchQuery, statusFilter, setStatusFilter } = useStore();
  const { columns, createTask, editTask, removeTask, changeTaskStatus, toggleFavorite, viewTask, getFilteredTasks, getFilteredColumns } = useTasks();
  const t = getTranslation(language);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<{ task: Task; columnId: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskColumnId, setNewTaskColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const priorityColors = {
    high: "#FF4618",
    medium: "#F5A623",
    low: "#9b9a97",
  };

  const priorityLabels = {
    high: t.priorityHigh,
    medium: t.priorityMedium,
    low: t.priorityLow,
  };

  const getColumnTitle = (column: typeof columns[0]) =>
    language === "vi" ? column.title : column.titleEn;

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    // Check if dropped on a column
    const targetColumn = columns.find((col) => col.id === newColumnId);
    if (targetColumn) {
      changeTaskStatus(taskId, newColumnId);
    }
  };

  const handleTaskEdit = (task: Task, columnId: string) => {
    // Track that this task was viewed
    viewTask(task.id);
    setSelectedTask({ task, columnId });
    setIsModalOpen(true);
  };

  const handleTaskSave = (taskData: Partial<Task>) => {
    if (selectedTask) {
      editTask(selectedTask.task.id, taskData);
    } else if (newTaskColumnId) {
      createTask(newTaskColumnId, taskData);
    }
    setIsModalOpen(false);
    setSelectedTask(null);
    setNewTaskColumnId(null);
  };

  const handleAddTask = (columnId: string) => {
    setNewTaskColumnId(columnId);
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const filteredTasks = getFilteredTasks();
  const hasAnyTasks = columns.some((col) => col.tasks.length > 0);
  
  // Use filtered columns when status filter is active
  const displayColumns = statusFilter ? getFilteredColumns() : columns;

  return (
    <div className="pt-[45px] min-h-screen transition-colors">
      {/* Search Results Overlay */}
      {searchQuery && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 animate-fadeIn backdrop-blur-sm" 
          onClick={() => useStore.getState().setSearchQuery("")}
        >
          <div
            className="mt-[45px] mx-auto max-w-[600px] glass-light rounded-xl shadow-2xl max-h-[70vh] overflow-y-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#e0e0e0] dark:border-[#3f3f3f]">
              <h3 className="font-medium text-[#37352f] dark:text-[#e0e0e0]">{t.searchResults}</h3>
            </div>
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center text-[#9b9a97]">{t.noResults}</div>
            ) : (
              <div className="divide-y divide-[#e0e0e0] dark:divide-[#3f3f3f]">
                {filteredTasks.map(({ task, columnId }) => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskEdit(task, columnId)}
                    className="w-full p-4 text-left hover:bg-[#f7f6f3] dark:hover:bg-[#3f3f3f] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded text-white"
                        style={{ backgroundColor: priorityColors[task.priority] }}
                      >
                        {priorityLabels[task.priority]}
                      </span>
                      <span className="text-[12px] text-[#9b9a97]">
                        {columns.find((c) => c.id === columnId)
                          ? getColumnTitle(columns.find((c) => c.id === columnId)!)
                          : ""}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#37352f] dark:text-[#e0e0e0] font-medium">
                      {language === "vi" ? task.title : task.titleEn}
                    </p>
                    {(language === "vi" ? task.tag : task.tagEn) && (
                      <span className="text-[12px] text-[#9b9a97]">
                        {language === "vi" ? task.tag : task.tagEn}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        task={selectedTask?.task || null}
        columnId={selectedTask?.columnId || newTaskColumnId || "todo"}
        language={language}
        onSave={handleTaskSave}
        onDelete={removeTask}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
          setNewTaskColumnId(null);
        }}
        isOpen={isModalOpen}
      />

      {/* Page Header */}
      <div className="px-8 py-6 glass border-b border-[#e0e0e0]/30 dark:border-[#ffffff/10]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[14px] text-[#9b9a97]">{t.workspace}</span>
          <span className="text-[14px] text-[#9b9a97]">/</span>
          <span className="text-[14px] text-[#37352f] dark:text-[#e0e0e0] font-medium">{t.board}</span>
        </div>
        <h1 className="text-[28px] font-bold text-[#37352f] dark:text-[#e0e0e0]">{t.taskBoard}</h1>
      </div>

      {/* Status Filter */}
      <div className="px-8 py-4 glass border-b border-[#e0e0e0]/30 dark:border-[#ffffff/10] flex items-center gap-2">
        <span className="text-[14px] text-[#9b9a97] mr-2">{t.status}:</span>
        <button
          onClick={() => setStatusFilter(null)}
          className={`px-3 py-1.5 text-[13px] rounded-md transition-all duration-200 hover:scale-105 active:scale-95 ${
            statusFilter === null
              ? "bg-[#37352f] dark:bg-[#e0e0e0] text-white dark:text-[#37352f] shadow-md"
              : "bg-[#f7f6f3] dark:bg-[#2f2f2f] text-[#37352f] dark:text-[#e0e0e0] hover:bg-[#eaeaea] dark:hover:bg-[#3f3f3f]"
          }`}
        >
          All
        </button>
        {[  
          { id: "todo", label: t.statusTodo, color: "#9b9a97" },
          { id: "in-progress", label: t.statusInProgress, color: "#E16737" },
          { id: "review", label: t.statusReview, color: "#6988FF" },
          { id: "done", label: t.statusDone, color: "#0F7B6D" },
        ].map((status) => (
          <button
            key={status.id}
            onClick={() => setStatusFilter(status.id as TaskStatus)}
            className={`px-3 py-1.5 text-[13px] rounded-md transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 ${
              statusFilter === status.id
                ? "bg-[#37352f] dark:bg-[#e0e0e0] text-white dark:text-[#37352f] shadow-md"
                : "bg-[#f7f6f3] dark:bg-[#2f2f2f] text-[#37352f] dark:text-[#e0e0e0] hover:bg-[#eaeaea] dark:hover:bg-[#3f3f3f]"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: status.color }}
            />
            {status.label}
          </button>
        ))}
      </div>

      {/* Board */}
      <div className="p-6">
        {!hasAnyTasks ? (
          <EmptyState language={language} onCreateTask={() => handleAddTask("todo")} />
        ) : (
          <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4">
            {displayColumns.map((column) => (
              <div
                key={column.id}
                className="flex-shrink-0 w-[300px] glass rounded-xl p-4"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }} />
                    <span className="font-medium text-[14px] text-[#37352f] dark:text-[#e0e0e0]">
                      {getColumnTitle(column)}
                    </span>
                    <span className="text-[12px] text-[#9b9a97]">{column.tasks.length}</span>
                  </div>
                  <button
                    onClick={() => handleAddTask(column.id)}
                    className="text-[#9b9a97] hover:text-[#37352f] dark:hover:text-[#e0e0e0] text-[18px] transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    +
                  </button>
                </div>

                {/* Tasks */}
                <SortableContext items={column.tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2 min-h-[100px]" id={column.id}>
                    {column.tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        language={language}
                        onEdit={(task) => handleTaskEdit(task, column.id)}
                        onDelete={removeTask}
                        onToggleFavorite={toggleFavorite}
                        priorityColors={priorityColors}
                        priorityLabels={priorityLabels}
                      />
                    ))}
                  </div>
                </SortableContext>
              </div>
            ))}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="bg-white dark:bg-[#3f3f3f] rounded-[6px] p-3 shadow-lg border border-[#e0e0e0] dark:border-[#4f4f4f] opacity-90">
                <p className="text-[14px] text-[#37352f] dark:text-[#e0e0e0]">
                  {language === "vi" ? activeTask.title : activeTask.titleEn}
                </p>
              </div>
            ) : null}
          </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  );
}
