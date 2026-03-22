import { useStore } from "../store/useStore";
import { Task } from "../types";
import toast from "react-hot-toast";

export const useTasks = () => {
  const {
    columns,
    setColumns,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    searchQuery,
    language,
  } = useStore();

  const createTask = (columnId: string, taskData: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title || "",
      titleEn: taskData.titleEn || taskData.title || "",
      description: taskData.description,
      descriptionEn: taskData.descriptionEn || taskData.description,
      priority: taskData.priority || "medium",
      status: columnId as Task["status"],
      tag: taskData.tag,
      tagEn: taskData.tagEn || taskData.tag,
      dueDate: taskData.dueDate,
      assignee: taskData.assignee,
      isFavorite: taskData.isFavorite || false,
      isPublic: taskData.isPublic || false,
      progress: taskData.progress || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addTask(columnId, newTask);
    toast.success(language === "vi" ? "Đã tạo công việc!" : "Task created!");
    return newTask;
  };

  const editTask = (taskId: string, updates: Partial<Task>) => {
    updateTask(taskId, updates);
    toast.success(language === "vi" ? "Đã cập nhật công việc!" : "Task updated!");
  };

  const removeTask = (taskId: string) => {
    deleteTask(taskId);
    toast.success(language === "vi" ? "Đã xóa công việc!" : "Task deleted!");
  };

  const changeTaskStatus = (taskId: string, newStatus: string) => {
    moveTask(taskId, newStatus);
    toast.success(language === "vi" ? "Đã di chuyển công việc!" : "Task moved!");
  };

  const getFilteredTasks = () => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results: { task: Task; columnId: string }[] = [];

    columns.forEach((col) => {
      col.tasks.forEach((task) => {
        const title = (language === "vi" ? task.title : task.titleEn).toLowerCase();
        const description = (language === "vi" ? task.description : task.descriptionEn)?.toLowerCase() || "";
        const tag = (language === "vi" ? task.tag : task.tagEn)?.toLowerCase() || "";

        if (title.includes(query) || description.includes(query) || tag.includes(query)) {
          results.push({ task, columnId: col.id });
        }
      });
    });

    return results;
  };

  const getTaskById = (taskId: string): { task: Task; columnId: string } | null => {
    for (const col of columns) {
      const task = col.tasks.find((t) => t.id === taskId);
      if (task) {
        return { task, columnId: col.id };
      }
    }
    return null;
  };

  const getTasksByColumn = (columnId: string): Task[] => {
    const column = columns.find((col) => col.id === columnId);
    return column?.tasks || [];
  };

  const getAllTasks = (): Task[] => {
    return columns.flatMap((col) => col.tasks);
  };

  const getTaskCount = (columnId?: string): number => {
    if (columnId) {
      const column = columns.find((col) => col.id === columnId);
      return column?.tasks.length || 0;
    }
    return getAllTasks().length;
  };

  const toggleFavorite = (taskId: string) => {
    const taskInfo = getTaskById(taskId);
    if (taskInfo) {
      updateTask(taskId, { isFavorite: !taskInfo.task.isFavorite });
      const message = !taskInfo.task.isFavorite
        ? language === "vi"
          ? "Đã thêm vào yêu thích!"
          : "Added to favorites!"
        : language === "vi"
        ? "Đã xóa khỏi yêu thích!"
        : "Removed from favorites!";
      toast.success(message);
    }
  };

  // Track when a task was viewed
  const viewTask = (taskId: string) => {
    updateTask(taskId, { lastViewedAt: new Date().toISOString() });
  };

  const getFavoriteTasks = () => {
    return getAllTasks().filter((task) => task.isFavorite);
  };

  const getRecentTasks = () => {
    const allTasks = getAllTasks();
    // Filter tasks that have been viewed and sort by lastViewedAt
    const viewedTasks = allTasks
      .filter((task) => task.lastViewedAt)
      .sort((a, b) => {
        const dateA = new Date(a.lastViewedAt!).getTime();
        const dateB = new Date(b.lastViewedAt!).getTime();
        return dateB - dateA; // Most recent first
      });
    // Return only the first 5
    return viewedTasks.slice(0, 5);
  };

  return {
    columns,
    setColumns,
    createTask,
    editTask,
    removeTask,
    changeTaskStatus,
    toggleFavorite,
    viewTask,
    getFavoriteTasks,
    getRecentTasks,
    getFilteredTasks,
    getTaskById,
    getTasksByColumn,
    getAllTasks,
    getTaskCount,
  };
};
