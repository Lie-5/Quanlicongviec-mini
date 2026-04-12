"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  taskCount: number;
  progress: number;
  status: "online" | "offline" | "busy";
}

export default function MyPeoplePage() {
  const router = useRouter();
  const { language, columns } = useStore();
  const { user, isAuthenticated } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && user === null) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, router]);

  // Calculate member data from tasks
  useEffect(() => {
    if (columns && Array.isArray(columns)) {
      const memberMap = new Map<string, Member>();

      columns.forEach((col) => {
        if (col.tasks && Array.isArray(col.tasks)) {
          col.tasks.forEach((task) => {
            if (task.assignedTo && Array.isArray(task.assignedTo)) {
              task.assignedTo.forEach((assignee) => {
                const key = assignee.email;
                if (!memberMap.has(key)) {
                  memberMap.set(key, {
                    id: key,
                    name: assignee.name,
                    email: assignee.email,
                    avatar: assignee.avatar || `avatar${Math.floor(Math.random() * 8) + 1}`,
                    taskCount: 0,
                    progress: 0,
                    status: Math.random() > 0.7 ? "busy" : Math.random() > 0.3 ? "online" : "offline",
                  });
                }
                const member = memberMap.get(key)!;
                member.taskCount++;
                // Calculate progress based on task status
                if (col.id === "done") {
                  member.progress += 100;
                } else if (col.id === "in-progress") {
                  member.progress += 50;
                } else if (col.id === "review") {
                  member.progress += 75;
                }
              });
            }
          });
        }
      });

      // Calculate average progress
      memberMap.forEach((member) => {
        if (member.taskCount > 0) {
          member.progress = Math.round(member.progress / member.taskCount);
        }
      });

      setMembers(Array.from(memberMap.values()));
    }
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
      en: "My People",
      vi: "Người của tôi",
      zh: "我的人",
      hi: "मेरे लोग",
      ja: "私のチーム",
      fr: "Mon équipe",
    },
    members: {
      en: "Team Members",
      vi: "Thành viên đội",
      zh: "团队成员",
      hi: "टीम सदस्य",
      ja: "チームメンバー",
      fr: "Membres de l'équipe",
    },
    tasks: {
      en: "Tasks",
      vi: "Công việc",
      zh: "任务",
      hi: "कार्य",
      ja: "タスク",
      fr: "Tâches",
    },
    progress: {
      en: "Progress",
      vi: "Tiến độ",
      zh: "进度",
      hi: "प्रगति",
      ja: "進捗",
      fr: "Progrès",
    },
    assignTask: {
      en: "Assign Task",
      vi: "Giao việc",
      zh: "分配任务",
      hi: "कार्य सौंपें",
      ja: "タスクを割り当てる",
      fr: "Assigner une tâche",
    },
    taskReminders: {
      en: "Task Reminders",
      vi: "Nhắc nhở công việc",
      zh: "任务提醒",
      hi: "कार्य अनुस्मारक",
      ja: "タスクリマインダー",
      fr: "Rappels de tâches",
    },
    noMembers: {
      en: "No team members yet",
      vi: "Chưa có thành viên nào",
      zh: "还没有团队成员",
      hi: "अभी तक कोई टीम सदस्य नहीं",
      ja: "まだチームメンバーがいません",
      fr: "Aucun membre d'équipe pour le moment",
    },
    online: {
      en: "Online",
      vi: "Trực tuyến",
      zh: "在线",
      hi: "ऑनलाइन",
      ja: "オンライン",
      fr: "En ligne",
    },
    offline: {
      en: "Offline",
      vi: "Ngoại tuyến",
      zh: "离线",
      hi: "ऑफलाइन",
      ja: "オフライン",
      fr: "Hors ligne",
    },
    busy: {
      en: "Busy",
      vi: "Bận",
      zh: "忙碌",
      hi: "व्यस्त",
      ja: "忙しい",
      fr: "Occupé",
    },
  };

  const getText = (key: keyof typeof translations): string => {
    const langKey = language as keyof typeof translations[keyof typeof translations];
    return (translations[key as keyof typeof translations] as any)[langKey] || (translations[key as keyof typeof translations] as any).en;
  };

  const getStatusColor = (status: Member["status"]) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "busy": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getStatusText = (status: Member["status"]) => {
    return getText(status as keyof typeof translations);
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
            {getText("members")}
          </p>
        </div>

        {/* Members Grid */}
        {members.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {getText("noMembers")}
            </h3>
            <p className="text-gray-500">
              {language === "vi" ? "Thành viên sẽ xuất hiện khi có công việc được giao" : "Members will appear when tasks are assigned"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-xl border-2 border-gray-200 shadow-md p-6 hover:shadow-lg transition-shadow">
                {/* Member Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    <p className="text-xs text-gray-400">{getStatusText(member.status)}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{member.taskCount}</p>
                    <p className="text-sm text-gray-600">{getText("tasks")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{member.progress}%</p>
                    <p className="text-sm text-gray-600">{getText("progress")}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${member.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold rounded-xl border border-purple-200 transition-all duration-200 hover:scale-105">
                    {getText("assignTask")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Task Reminders Section */}
        {members.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {getText("taskReminders")}
            </h2>
            <div className="bg-white rounded-xl border-2 border-gray-200 shadow-md p-6">
              <div className="space-y-3">
                {members.filter(m => m.taskCount > 0).map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">
                          {member.taskCount} {language === "vi" ? "công việc đang thực hiện" : "tasks in progress"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-purple-600">
                        {member.progress}% {getText("progress")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}