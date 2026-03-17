"use client";

import { useState } from "react";

interface Task {
  id: string;
  title: string;
  titleEn: string;
  tag?: string;
  tagEn?: string;
  priority: "high" | "medium" | "low";
  status: string;
  dueDate?: string;
  assignee?: string;
}

interface Column {
  id: string;
  title: string;
  titleEn: string;
  color: string;
  tasks: Task[];
}

interface TaskBoardProps {
  language: "vi" | "en";
  searchQuery?: string;
}

export default function TaskBoard({ language, searchQuery = "" }: TaskBoardProps) {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "Cần làm",
      titleEn: "To Do",
      color: "#9b9a97",
      tasks: [
        { id: "1", title: "Thiết kế trang đích mới", titleEn: "Design new landing page", priority: "high", tag: "Thiết kế", tagEn: "Design", status: "todo", dueDate: "2024-12-25" },
        { id: "2", title: "Thiết lập CI/CD pipeline", titleEn: "Set up CI/CD pipeline", priority: "medium", tag: "DevOps", tagEn: "DevOps", status: "todo", dueDate: "2024-12-30" },
        { id: "3", title: "Viết tài liệu", titleEn: "Write documentation", priority: "low", tag: "Tài liệu", tagEn: "Docs", status: "todo", dueDate: "" },
      ],
    },
    {
      id: "in-progress",
      title: "Đang làm",
      titleEn: "In Progress",
      color: "#E16737",
      tasks: [
        { id: "4", title: "Xác thực người dùng", titleEn: "Implement user authentication", priority: "high", tag: "Backend", tagEn: "Backend", status: "in-progress", dueDate: "2024-12-28" },
        { id: "5", title: "Tạo API endpoints", titleEn: "Create API endpoints", priority: "medium", tag: "API", tagEn: "API", status: "in-progress", dueDate: "2024-12-29" },
      ],
    },
    {
      id: "review",
      title: "Đang xem xét",
      titleEn: "In Review",
      color: "#6988FF",
      tasks: [
        { id: "6", title: "Review code cho PR #42", titleEn: "Code review for PR #42", priority: "medium", tag: "Review", tagEn: "Review", status: "review", dueDate: "" },
      ],
    },
    {
      id: "done",
      title: "Hoàn thành",
      titleEn: "Done",
      color: "#0F7B6D",
      tasks: [
        { id: "7", title: "Thiết lập repository dự án", titleEn: "Setup project repository", priority: "high", status: "done", dueDate: "2024-12-20" },
        { id: "8", title: "Cấu hình quy tắc linting", titleEn: "Configure linting rules", priority: "low", status: "done", dueDate: "" },
      ],
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [taskMenuOpen, setTaskMenuOpen] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<{task: Task; columnId: string} | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const priorityColors = {
    high: "#FF4618",
    medium: "#F5A623",
    low: "#9b9a97",
  };

  const priorityLabels = language === "vi" 
    ? { high: "Cao", medium: "Trung bình", low: "Thấp" }
    : { high: "High", medium: "Medium", low: "Low" };

  const statusLabels = language === "vi"
    ? { todo: "Cần làm", "in-progress": "Đang làm", review: "Đang xem xét", done: "Hoàn thành" }
    : { todo: "To Do", "in-progress": "In Progress", review: "In Review", done: "Done" };

  const t = language === "vi" ? {
    workspace: "Không gian làm việc",
    board: "Bảng",
    title: "Bảng Công Việc",
    titleEn: "Task Board",
    addTask: "+ Thêm công việc",
    addTaskPlaceholder: "Nhận tiêu đề công việc...",
    add: "Thêm",
    cancel: "Hủy",
    addColumn: "Thêm cột",
    delete: "Xóa",
    edit: "Chỉnh sửa",
    taskDetails: "Chi tiết công việc",
    taskName: "Tên công việc",
    priority: "Mức độ ưu tiên",
    status: "Trạng thái",
    dueDate: "Ngày hết hạn",
    tag: "Nhãn",
    save: "Lưu",
    close: "Đóng",
    searchPlaceholder: "Tìm kiếm công việc...",
    noResults: "Không tìm thấy công việc nào",
    searchResults: "Kết quả tìm kiếm",
  } : {
    workspace: "Workspace",
    board: "Board",
    title: "Task Board",
    titleEn: "Task Board",
    addTask: "+ Add a task",
    addTaskPlaceholder: "Enter task title...",
    add: "Add",
    cancel: "Cancel",
    addColumn: "Add a column",
    delete: "Delete",
    edit: "Edit",
    taskDetails: "Task Details",
    taskName: "Task Name",
    priority: "Priority",
    status: "Status",
    dueDate: "Due Date",
    tag: "Tag",
    save: "Save",
    close: "Close",
    searchPlaceholder: "Search tasks...",
    noResults: "No tasks found",
    searchResults: "Search Results",
  };

  const getTaskTitle = (task: Task) => language === "vi" ? task.title : task.titleEn;
  const getTag = (task: Task) => language === "vi" ? task.tag : task.tagEn;
  const getColumnTitle = (column: Column) => language === "vi" ? column.title : column.titleEn;

  // Handle search
  useState(() => {
    setIsSearching(searchQuery.length > 0);
  });

  const getFilteredTasks = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: {task: Task; columnId: string}[] = [];
    columns.forEach(col => {
      col.tasks.forEach(task => {
        const title = getTaskTitle(task).toLowerCase();
        const tag = getTag(task)?.toLowerCase() || "";
        if (title.includes(query) || tag.includes(query)) {
          results.push({ task, columnId: col.id });
        }
      });
    });
    return results;
  };

  const addTask = (columnId: string) => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      titleEn: newTaskTitle,
      priority: "medium",
      status: columnId,
    };
    
    setColumns(columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          tasks: [...col.tasks, newTask],
        };
      }
      return col;
    }));
    
    setNewTaskTitle("");
    setSelectedColumn(null);
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns(columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          tasks: col.tasks.filter(task => task.id !== taskId),
        };
      }
      return col;
    }));
    setTaskMenuOpen(null);
    setSelectedTask(null);
  };

  const toggleTaskMenu = (taskId: string) => {
    setTaskMenuOpen(taskMenuOpen === taskId ? null : taskId);
  };

  const openTaskDetails = (task: Task, columnId: string) => {
    setSelectedTask({ task, columnId });
    setEditingTask({ ...task });
    setTaskMenuOpen(null);
  };

  const saveTaskEdit = () => {
    if (!editingTask || !selectedTask) return;

    setColumns(columns.map(col => {
      if (col.id === selectedTask.columnId) {
        return {
          ...col,
          tasks: col.tasks.map(task => 
            task.id === editingTask.id ? editingTask : task
          ),
        };
      }
      // Also check if status changed (moving to different column)
      if (col.id === editingTask.status && col.id !== selectedTask.columnId) {
        return {
          ...col,
          tasks: [...col.tasks, editingTask],
        };
      }
      return col;
    }));

    setSelectedTask(null);
    setEditingTask(null);
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="pt-[45px] min-h-screen bg-white dark:bg-[#191919] transition-colors">
      {/* Search Results Overlay */}
      {isSearching && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsSearching(false)}>
          <div 
            className="mt-[45px] mx-auto max-w-[600px] bg-white dark:bg-[#2f2f2f] rounded-lg shadow-xl max-h-[70vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#e0e0e0] dark:border-[#3f3f3f]">
              <h3 className="font-medium text-[#37352f] dark:text-[#e0e0e0]">{t.searchResults}</h3>
            </div>
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center text-[#9b9a97]">
                {t.noResults}
              </div>
            ) : (
              <div className="divide-y divide-[#e0e0e0] dark:divide-[#3f3f3f]">
                {filteredTasks.map(({task, columnId}) => (
                  <button
                    key={task.id}
                    onClick={() => openTaskDetails(task, columnId)}
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
                        {statusLabels[task.status as keyof typeof statusLabels]}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#37352f] dark:text-[#e0e0e0] font-medium">
                      {getTaskTitle(task)}
                    </p>
                    {getTag(task) && (
                      <span className="text-[12px] text-[#9b9a97]">{getTag(task)}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && editingTask && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2f2f2f] rounded-lg shadow-xl w-full max-w-[500px]">
            <div className="p-4 border-b border-[#e0e0e0] dark:border-[#3f3f3f] flex items-center justify-between">
              <h3 className="font-medium text-[#37352f] dark:text-[#e0e0e0]">{t.taskDetails}</h3>
              <button 
                onClick={() => { setSelectedTask(null); setEditingTask(null); }}
                className="text-[#9b9a97] hover:text-[#37352f] dark:hover:text-[#e0e0e0]"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Task Name */}
              <div>
                <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                  {t.taskName}
                </label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                  className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px]"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                  {t.priority}
                </label>
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({...editingTask, priority: e.target.value as "high" | "medium" | "low"})}
                  className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px]"
                >
                  <option value="high">{priorityLabels.high}</option>
                  <option value="medium">{priorityLabels.medium}</option>
                  <option value="low">{priorityLabels.low}</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                  {t.status}
                </label>
                <select
                  value={editingTask.status}
                  onChange={(e) => setEditingTask({...editingTask, status: e.target.value})}
                  className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px]"
                >
                  <option value="todo">{statusLabels.todo}</option>
                  <option value="in-progress">{statusLabels["in-progress"]}</option>
                  <option value="review">{statusLabels.review}</option>
                  <option value="done">{statusLabels.done}</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                  {t.dueDate}
                </label>
                <input
                  type="date"
                  value={editingTask.dueDate || ""}
                  onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px]"
                />
              </div>
            </div>

            <div className="p-4 border-t border-[#e0e0e0] dark:border-[#3f3f3f] flex justify-between">
              <button
                onClick={() => deleteTask(selectedTask.columnId, selectedTask.task.id)}
                className="px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-[4px]"
              >
                {t.delete}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => { setSelectedTask(null); setEditingTask(null); }}
                  className="px-4 py-2 text-[14px] text-[#9b9a97] hover:bg-[#f7f6f3] dark:hover:bg-[#3f3f3f] rounded-[4px]"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={saveTaskEdit}
                  className="px-4 py-2 text-[14px] bg-[#2383E2] text-white rounded-[4px] hover:bg-[#1a6fc4]"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="px-8 py-6 border-b border-[#e0e0e0] dark:border-[#2f2f2f]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[14px] text-[#9b9a97]">{t.workspace}</span>
          <span className="text-[14px] text-[#9b9a97]">/</span>
          <span className="text-[14px] text-[#37352f] dark:text-[#e0e0e0] font-medium">{t.board}</span>
        </div>
        <h1 className="text-[28px] font-bold text-[#37352f] dark:text-[#e0e0e0]">{t.title}</h1>
      </div>

      {/* Board */}
      <div className="p-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div 
              key={column.id}
              className="flex-shrink-0 w-[280px] bg-[#f7f6f3] dark:bg-[#2f2f2f] rounded-[8px] p-3"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: column.color }}
                  />
                  <span className="font-medium text-[14px] text-[#37352f] dark:text-[#e0e0e0]">
                    {getColumnTitle(column)}
                  </span>
                  <span className="text-[12px] text-[#9b9a97]">
                    {column.tasks.length}
                  </span>
                </div>
                <button className="text-[#9b9a97] hover:text-[#37352f] dark:hover:text-[#e0e0e0] text-[18px]">
                  +
                </button>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => openTaskDetails(task, column.id)}
                    className="bg-white dark:bg-[#3f3f3f] rounded-[6px] p-3 shadow-sm border border-[#e0e0e0] dark:border-[#4f4f4f] cursor-pointer hover:shadow-md transition-shadow relative"
                  >
                    {getTag(task) && (
                      <span className="inline-block px-2 py-0.5 bg-[#f7f6f3] dark:bg-[#4f4f4f] text-[12px] text-[#9b9a97] rounded-[3px] mb-2">
                        {getTag(task)}
                      </span>
                    )}
                    
                    <div className="flex items-start justify-between">
                      <p className="text-[14px] text-[#37352f] dark:text-[#e0e0e0] flex-1 mr-2">{getTaskTitle(task)}</p>
                      
                      {/* 3 dots menu button */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskMenu(task.id);
                          }}
                          className="p-1 hover:bg-[#f0f0f0] dark:hover:bg-[#4f4f4f] rounded text-[#9b9a97] text-[12px]"
                        >
                          ⋮
                        </button>
                        
                        {/* Dropdown menu */}
                        {taskMenuOpen === task.id && (
                          <div className="absolute right-0 top-full mt-1 w-[120px] bg-white dark:bg-[#3f3f3f] border border-[#e0e0e0] dark:border-[#4f4f4f] rounded-[4px] shadow-lg z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openTaskDetails(task, column.id);
                              }}
                              className="w-full px-3 py-2 text-left text-[13px] text-[#37352f] dark:text-[#e0e0e0] hover:bg-[#f0f0f0] dark:hover:bg-[#4f4f4f] rounded-t-[4px]"
                            >
                              {t.edit}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(column.id, task.id);
                              }}
                              className="w-full px-3 py-2 text-left text-[13px] text-red-500 hover:bg-[#f0f0f0] dark:hover:bg-[#4f4f4f] rounded-b-[4px]"
                            >
                              {t.delete}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-[11px] px-1.5 py-0.5 rounded-[3px] text-white"
                          style={{ backgroundColor: priorityColors[task.priority] }}
                        >
                          {priorityLabels[task.priority]}
                        </span>
                        {task.dueDate && (
                          <span className="text-[11px] text-[#9b9a97]">
                            📅 {task.dueDate}
                          </span>
                        )}
                      </div>
                      {task.assignee && (
                        <div className="w-[20px] h-[20px] bg-[#E16737] rounded-[3px] flex items-center justify-center">
                          <span className="text-white text-[10px]">{task.assignee[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Task Input */}
                {selectedColumn === column.id ? (
                  <div className="bg-white dark:bg-[#3f3f3f] rounded-[6px] p-3 shadow-sm border border-[#e0e0e0] dark:border-[#4f4f4f]">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addTask(column.id);
                        if (e.key === "Escape") {
                          setSelectedColumn(null);
                          setNewTaskTitle("");
                        }
                      }}
                      placeholder={t.addTaskPlaceholder}
                      className="w-full text-[14px] outline-none mb-2 bg-transparent text-[#37352f] dark:text-[#e0e0e0]"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => addTask(column.id)}
                        className="px-3 py-1.5 bg-[#2383E2] text-white text-[13px] rounded-[4px] hover:bg-[#1a6fc4] transition-colors"
                      >
                        {t.add}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedColumn(null);
                          setNewTaskTitle("");
                        }}
                        className="px-3 py-1.5 text-[13px] text-[#9b9a97] hover:text-[#37352f] dark:hover:text-[#e0e0e0] transition-colors"
                      >
                        {t.cancel}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedColumn(column.id)}
                    className="w-full text-left px-3 py-2 text-[13px] text-[#9b9a97] hover:bg-[#efefed] dark:hover:bg-[#3f3f3f] rounded-[6px] transition-colors"
                  >
                    {t.addTask}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Column Button */}
          <div className="flex-shrink-0 w-[280px]">
            <button className="w-full py-2 px-3 text-[14px] text-[#9b9a97] hover:bg-[#f7f6f3] dark:hover:bg-[#2f2f2f] rounded-[8px] transition-colors flex items-center gap-2">
              <span className="text-[18px]">+</span>
              {t.addColumn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
