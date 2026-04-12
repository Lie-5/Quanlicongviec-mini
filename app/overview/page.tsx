"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import { Task } from "../types";
import DashboardLayout from "../components/DashboardLayout";
import TaskFormModal from "../components/TaskFormModal";

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

export default function OverviewPage() {
  const router = useRouter();
  const { language, columns, addTask } = useStore();
  const { user, isAuthenticated } = useAuth();
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && user === null) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, router]);

  // Calculate task statistics
  const stats: TaskStats = useMemo(() => {
    if (!columns || !Array.isArray(columns)) {
      return { total: 0, completed: 0, inProgress: 0, overdue: 0 };
    }

    let total = 0;
    let completed = 0;
    let inProgress = 0;
    let overdue = 0;

    const now = new Date();

    columns.forEach((col) => {
      if (col.tasks && Array.isArray(col.tasks)) {
        total += col.tasks.length;

        if (col.id === "done") {
          completed += col.tasks.length;
        } else if (col.id === "in-progress") {
          inProgress += col.tasks.length;
        }

        // Check for overdue tasks
        col.tasks.forEach((task) => {
          if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            if (dueDate < now && col.id !== "done") {
              overdue++;
            }
          }
        });
      }
    });

    return { total, completed, inProgress, overdue };
  }, [columns]);

  // Show loading while checking auth
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const translations = {
    title: {
      en: "Overview",
      vi: "Tổng quan",
      zh: "概览",
      hi: "अवलोकन",
      ja: "概要",
      fr: "Aperçu",
    },
    welcome: {
      en: "Welcome back",
      vi: "Chào mừng trở lại",
      zh: "欢迎回来",
      hi: "वापसी पर स्वागत है",
      ja: "おかえりなさい",
      fr: "Bienvenue",
    },
    stats: {
      en: "Task Statistics",
      vi: "Thống kê công việc",
      zh: "任务统计",
      hi: "कार्य आंकड़े",
      ja: "タスク統計",
      fr: "Statistiques des tâches",
    },
    totalTasks: {
      en: "Total Tasks",
      vi: "Tổng công việc",
      zh: "总任务",
      hi: "कुल कार्य",
      ja: "総タスク",
      fr: "Tâches totales",
    },
    completed: {
      en: "Completed",
      vi: "Hoàn thành",
      zh: "已完成",
      hi: "पूर्ण",
      ja: "完了",
      fr: "Terminé",
    },
    inProgress: {
      en: "In Progress",
      vi: "Đang thực hiện",
      zh: "进行中",
      hi: "प्रगति में",
      ja: "進行中",
      fr: "En cours",
    },
    overdue: {
      en: "Overdue",
      vi: "Quá hạn",
      zh: "逾期",
      hi: "अतिदेय",
      ja: "期限切れ",
      fr: "En retard",
    },
    recentTasks: {
      en: "Recent Tasks",
      vi: "Công việc gần đây",
      zh: "最近任务",
      hi: "हाल के कार्य",
      ja: "最近のタスク",
      fr: "Tâches récentes",
    },
    addTask: {
      en: "Add Task",
      vi: "Thêm công việc",
      zh: "添加任务",
      hi: "कार्य जोड़ें",
      ja: "タスクを追加",
      fr: "Ajouter une tâche",
    },
    noTasks: {
      en: "No tasks yet",
      vi: "Chưa có công việc nào",
      zh: "还没有任务",
      hi: "अभी तक कोई कार्य नहीं",
      ja: "まだタスクがありません",
      fr: "Aucune tâche pour le moment",
    },
    createFirst: {
      en: "Create your first task to get started",
      vi: "Tạo công việc đầu tiên để bắt đầu",
      zh: "创建您的第一个任务开始使用",
      hi: "शुरू करने के लिए अपना पहला कार्य बनाएं",
      ja: "最初のタスクを作成して始めましょう",
      fr: "Créez votre première tâche pour commencer",
    },
    delete: {
      en: "Delete",
      vi: "Xóa",
      zh: "删除",
      hi: "मिटाएं",
      ja: "削除",
      fr: "Supprimer",
    },
    status: {
      en: "Status",
      vi: "Trạng thái",
      zh: "状态",
      hi: "स्थिति",
      ja: "ステータス",
      fr: "Statut",
    },
    priority: {
      en: "Priority",
      vi: "Ưu tiên",
      zh: "优先级",
      hi: "प्राथमिकता",
      ja: "優先度",
      fr: "Priorité",
    },
    dueDate: {
      en: "Due Date",
      vi: "Ngày hết hạn",
      zh: "截止日期",
      hi: "नियत तारीख",
      ja: "期限",
      fr: "Date d'échéance",
    },
    high: {
      en: "High",
      vi: "Cao",
      zh: "高",
      hi: "उच्च",
      ja: "高",
      fr: "Élevé",
    },
    medium: {
      en: "Medium",
      vi: "Trung bình",
      zh: "中",
      hi: "मध्यम",
      ja: "中",
      fr: "Moyen",
    },
    low: {
      en: "Low",
      vi: "Thấp",
      zh: "低",
      hi: "कम",
      ja: "低",
      fr: "Faible",
    },
    todo: {
      en: "To Do",
      vi: "Cần làm",
      zh: "待办",
      hi: "करना है",
      ja: "未着手",
      fr: "À faire",
    },
    review: {
      en: "Review",
      vi: "Xem xét",
      zh: "审核",
      hi: "समीक्षा",
      ja: "レビュー",
      fr: "Révision",
    },
    done: {
      en: "Done",
      vi: "Hoàn thành",
      zh: "完成",
      hi: "पूर्ण",
      ja: "完了",
      fr: "Terminé",
    },
  };

  const getText = (key: keyof typeof translations): string => {
    const langKey = language as keyof typeof translations[keyof typeof translations];
    return (translations[key as keyof typeof translations] as any)[langKey] || (translations[key as keyof typeof translations] as any).en;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo": return "bg-gray-500";
      case "in-progress": return "bg-blue-500";
      case "review": return "bg-purple-500";
      case "done": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    return getText(status as keyof typeof translations);
  };

  const getPriorityText = (priority: string) => {
    return getText(priority as keyof typeof translations);
  };

  // Get all tasks for display
  const allTasks = useMemo(() => {
    if (!columns || !Array.isArray(columns)) return [];
    const tasks: any[] = [];
    columns.forEach((col) => {
      if (col.tasks && Array.isArray(col.tasks)) {
        col.tasks.forEach((task) => {
          tasks.push({
            ...task,
            columnId: col.id,
            columnTitle: col.title,
            columnTitleEn: col.titleEn,
          });
        });
      }
    });
    // Sort by creation date (newest first), limit to 10
    return tasks.slice(0, 10);
  }, [columns]);

  const handleDeleteTask = (taskId: string, columnId: string) => {
    // This would normally update the store, but for now we'll just show the functionality
    console.log("Delete task:", taskId, "from column:", columnId);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {getText("title")}
          </h1>
          <p className="text-gray-600 text-lg">
            {getText("welcome")}, {user?.name || "User"}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border-2 border-gray-200 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{getText("totalTasks")}</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{getText("completed")}</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{getText("inProgress")}</p>
                <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{getText("overdue")}</p>
                <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {getText("recentTasks")}
            </h2>
            <button
              onClick={() => setShowTaskForm(true)}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {getText("addTask")}
            </button>
          </div>

          {allTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {getText("noTasks")}
              </h3>
              <p className="text-gray-500 mb-4">
                {getText("createFirst")}
              </p>
              <button
                onClick={() => setShowTaskForm(true)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                {getText("addTask")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {allTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-xl border-2 border-gray-200 shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {language === "vi" ? task.title : task.titleEn || task.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor(task.priority)}`}>
                            {getPriorityText(task.priority)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(task.status)}`}>
                            {getStatusText(task.status)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{getText("status")}:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(task.status)}`}>
                            {getStatusText(task.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{getText("priority")}:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor(task.priority)}`}>
                            {getPriorityText(task.priority)}
                          </span>
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{getText("dueDate")}:</span>
                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTask(task.id, task.columnId)}
                      className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title={getText("delete")}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Task Form Modal */}
        <TaskFormModal
          isOpen={showTaskForm}
          onClose={() => setShowTaskForm(false)}
          onSubmit={(taskData) => {
            const newTask: Task = {
              ...taskData,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isFavorite: false,
              isPublic: false,
              progress: 0,
              lastViewedAt: new Date().toISOString(),
            };
            addTask("todo", newTask);
            setShowTaskForm(false);
          }}
        />
      </div>
    </DashboardLayout>
  );
}
