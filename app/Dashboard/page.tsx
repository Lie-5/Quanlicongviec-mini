"use client";

import { useStore } from "../store/useStore";
import { useTasks } from "../hooks/useTasks";
import { getTranslation } from "../lib/translations";

export default function DashboardPage() {
  const { language } = useStore();
  const { columns, getAllTasks } = useTasks();
  const t = getTranslation(language);

  const allTasks = getAllTasks();
  const todoCount = columns.find((c) => c.id === "todo")?.tasks.length || 0;
  const inProgressCount = columns.find((c) => c.id === "in-progress")?.tasks.length || 0;
  const reviewCount = columns.find((c) => c.id === "review")?.tasks.length || 0;
  const doneCount = columns.find((c) => c.id === "done")?.tasks.length || 0;

  const highPriorityCount = allTasks.filter((t) => t.priority === "high").length;
  const mediumPriorityCount = allTasks.filter((t) => t.priority === "medium").length;
  const lowPriorityCount = allTasks.filter((t) => t.priority === "low").length;

  const stats = [
    {
      title: language === "vi" ? "Tổng công việc" : "Total Tasks",
      value: allTasks.length,
      icon: "📊",
      color: "#2383E2",
    },
    {
      title: t.statusTodo,
      value: todoCount,
      icon: "📝",
      color: "#9b9a97",
    },
    {
      title: t.statusInProgress,
      value: inProgressCount,
      icon: "⚡",
      color: "#E16737",
    },
    {
      title: t.statusDone,
      value: doneCount,
      icon: "✅",
      color: "#0F7B6D",
    },
  ];

  const priorityStats = [
    {
      title: t.priorityHigh,
      value: highPriorityCount,
      color: "#FF4618",
    },
    {
      title: t.priorityMedium,
      value: mediumPriorityCount,
      color: "#F5A623",
    },
    {
      title: t.priorityLow,
      value: lowPriorityCount,
      color: "#9b9a97",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-[28px] font-bold text-[#37352f] dark:text-[#e0e0e0] mb-6">
        {t.dashboard}
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#2f2f2f] rounded-[8px] p-6 border border-[#e0e0e0] dark:border-[#3f3f3f] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[24px]">{stat.icon}</span>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <span className="text-[20px] font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </span>
              </div>
            </div>
            <h3 className="text-[14px] text-[#9b9a97] font-medium">{stat.title}</h3>
          </div>
        ))}
      </div>

      {/* Priority Distribution */}
      <div className="bg-white dark:bg-[#2f2f2f] rounded-[8px] p-6 border border-[#e0e0e0] dark:border-[#3f3f3f] mb-8">
        <h2 className="text-[18px] font-bold text-[#37352f] dark:text-[#e0e0e0] mb-4">
          {language === "vi" ? "Phân bố mức độ ưu tiên" : "Priority Distribution"}
        </h2>
        <div className="space-y-4">
          {priorityStats.map((stat, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] text-[#37352f] dark:text-[#e0e0e0]">{stat.title}</span>
                <span className="text-[14px] font-medium text-[#37352f] dark:text-[#e0e0e0]">
                  {stat.value} {language === "vi" ? "công việc" : "tasks"}
                </span>
              </div>
              <div className="w-full bg-[#f7f6f3] dark:bg-[#3f3f3f] rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${allTasks.length > 0 ? (stat.value / allTasks.length) * 100 : 0}%`,
                    backgroundColor: stat.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white dark:bg-[#2f2f2f] rounded-[8px] p-6 border border-[#e0e0e0] dark:border-[#3f3f3f]">
        <h2 className="text-[18px] font-bold text-[#37352f] dark:text-[#e0e0e0] mb-4">
          {language === "vi" ? "Công việc gần đây" : "Recent Tasks"}
        </h2>
        <div className="space-y-3">
          {allTasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-[#f7f6f3] dark:bg-[#3f3f3f] rounded-[6px] hover:bg-[#efefed] dark:hover:bg-[#4f4f4f] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      task.priority === "high" ? "#FF4618" : task.priority === "medium" ? "#F5A623" : "#9b9a97",
                  }}
                />
                <span className="text-[14px] text-[#37352f] dark:text-[#e0e0e0]">
                  {language === "vi" ? task.title : task.titleEn}
                </span>
              </div>
              <span className="text-[12px] text-[#9b9a97]">
                {columns.find((c) => c.tasks.some((t) => t.id === task.id))
                  ? language === "vi"
                    ? columns.find((c) => c.tasks.some((t) => t.id === task.id))!.title
                    : columns.find((c) => c.tasks.some((t) => t.id === task.id))!.titleEn
                  : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
