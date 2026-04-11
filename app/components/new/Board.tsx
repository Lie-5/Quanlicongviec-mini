"use client";

import { useState } from "react";
import { useStore } from "../../store/useStore";
import { useTasks } from "../../hooks/useTasks";
import { Task, Language, TaskStatus } from "../../types";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";
import EmptyState from "./EmptyState";

interface BoardProps {
  language?: Language;
}

export default function Board({ language = "en" }: BoardProps) {
  const { columns, language: storeLang, searchQuery } = useStore();
  const { createTask, editTask, removeTask, toggleFavorite, getAllTasks } = useTasks();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultColumn, setDefaultColumn] = useState<string>("todo");

  const activeLang = language || storeLang;

  // Get all tasks
  const allTasks = getAllTasks();

  // Filter by search
  const filteredTasks = searchQuery
    ? allTasks.filter((task) => {
        const title = activeLang === "vi" ? task.title : task.titleEn;
        return title.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : allTasks;

  // Check if has any tasks
  const hasAnyTasks = allTasks.length > 0;

  const handleAddTask = (columnId: string) => {
    setDefaultColumn(columnId);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    await removeTask(taskId);
  };

  const handleToggleFavorite = async (taskId: string) => {
    await toggleFavorite(taskId);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    if (editingTask) {
      await editTask(editingTask.id, taskData);
    } else {
      await createTask(taskData.status as string || "todo", taskData);
    }
  };

  // Get column titles
  const getColumnTitle = (columnId: string) => {
    if (activeLang === "vi") {
      const col = columns.find((c) => c.id === columnId);
      return col?.title || columnId;
    }
    const col = columns.find((c) => c.id === columnId);
    return col?.titleEn || columnId;
  };

  // Get column tasks
  const getColumnTasks = (columnId: string) => {
    return filteredTasks.filter((task) => task.status === columnId);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {activeLang === "vi" ? "Quản lý công việc" : "Manage Tasks"}
        </h1>
        <p className="text-gray-500">
          {activeLang === "vi"
            ? `Bạn có ${allTasks.length} công việc. Theo dõi tiến độ tại đây.`
            : `You have ${allTasks.length} tasks. Track progress here.`
          }
        </p>
      </div>

      {/* Board - Kanban Style */}
      {!hasAnyTasks ? (
        <EmptyState 
          language={activeLang} 
          onAddNew={() => handleAddTask("todo")}
        />
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {/* To Do Column */}
          <Column
            id="todo"
            title={getColumnTitle("todo")}
            tasks={getColumnTasks("todo")}
            language={activeLang}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* In Progress Column */}
          <Column
            id="in-progress"
            title={getColumnTitle("in-progress")}
            tasks={getColumnTasks("in-progress")}
            language={activeLang}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* In Review Column */}
          <Column
            id="review"
            title={getColumnTitle("review")}
            tasks={getColumnTasks("review")}
            language={activeLang}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* Done Column */}
          <Column
            id="done"
            title={getColumnTitle("done")}
            tasks={getColumnTasks("done")}
            language={activeLang}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      )}

      {/* Add/Edit Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        language={activeLang}
        defaultStatus={defaultColumn}
      />
    </div>
  );
}