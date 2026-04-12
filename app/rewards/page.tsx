"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout";

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export default function RewardsPage() {
  const router = useRouter();
  const { language, columns } = useStore();
  const { user, isAuthenticated } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && user === null) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, router]);

  // Calculate rewards and achievements based on tasks
  useEffect(() => {
    if (columns && Array.isArray(columns)) {
      let completedTasks = 0;
      let totalTasks = 0;
      let streakDays = 0;
      let teamMembers = new Set<string>();

      columns.forEach((col) => {
        if (col.tasks && Array.isArray(col.tasks)) {
          totalTasks += col.tasks.length;
          if (col.id === "done") {
            completedTasks += col.tasks.length;
          }
          col.tasks.forEach((task) => {
            if (task.assignedTo && Array.isArray(task.assignedTo)) {
              task.assignedTo.forEach((assignee) => {
                teamMembers.add(assignee.email);
              });
            }
          });
        }
      });

      // Calculate points and level
      const points = completedTasks * 10 + teamMembers.size * 5;
      const calculatedLevel = Math.floor(points / 100) + 1;
      setTotalPoints(points);
      setLevel(calculatedLevel);

      // Define rewards
      const rewardList: Reward[] = [
        {
          id: "first-task",
          title: language === "vi" ? "Công việc đầu tiên" : "First Task",
          description: language === "vi" ? "Hoàn thành công việc đầu tiên của bạn" : "Complete your first task",
          points: 10,
          icon: "🎯",
          unlocked: completedTasks >= 1,
          progress: Math.min(completedTasks, 1),
          maxProgress: 1,
        },
        {
          id: "task-master",
          title: language === "vi" ? "Chuyên gia công việc" : "Task Master",
          description: language === "vi" ? "Hoàn thành 10 công việc" : "Complete 10 tasks",
          points: 100,
          icon: "🏆",
          unlocked: completedTasks >= 10,
          progress: Math.min(completedTasks, 10),
          maxProgress: 10,
        },
        {
          id: "team-player",
          title: language === "vi" ? "Người chơi đội" : "Team Player",
          description: language === "vi" ? "Làm việc với 3 thành viên đội" : "Work with 3 team members",
          points: 50,
          icon: "🤝",
          unlocked: teamMembers.size >= 3,
          progress: Math.min(teamMembers.size, 3),
          maxProgress: 3,
        },
        {
          id: "productivity-champion",
          title: language === "vi" ? "Vô địch năng suất" : "Productivity Champion",
          description: language === "vi" ? "Hoàn thành 25 công việc" : "Complete 25 tasks",
          points: 250,
          icon: "⭐",
          unlocked: completedTasks >= 25,
          progress: Math.min(completedTasks, 25),
          maxProgress: 25,
        },
        {
          id: "level-up",
          title: language === "vi" ? "Lên cấp" : "Level Up",
          description: language === "vi" ? "Đạt cấp 5" : "Reach level 5",
          points: 500,
          icon: "🚀",
          unlocked: calculatedLevel >= 5,
          progress: Math.min(calculatedLevel, 5),
          maxProgress: 5,
        },
      ];

      setRewards(rewardList);

      // Define achievements
      const achievementList: Achievement[] = [
        {
          id: "welcome",
          title: language === "vi" ? "Chào mừng!" : "Welcome!",
          description: language === "vi" ? "Bắt đầu hành trình quản lý công việc" : "Start your task management journey",
          icon: "👋",
          unlocked: true,
          unlockedAt: new Date(),
        },
        {
          id: "first-completion",
          title: language === "vi" ? "Hoàn thành đầu tiên" : "First Completion",
          description: language === "vi" ? "Hoàn thành công việc đầu tiên" : "Complete your first task",
          icon: "✅",
          unlocked: completedTasks >= 1,
          unlockedAt: completedTasks >= 1 ? new Date() : undefined,
        },
        {
          id: "team-builder",
          title: language === "vi" ? "Xây dựng đội ngũ" : "Team Builder",
          description: language === "vi" ? "Thêm thành viên vào đội ngũ" : "Add members to your team",
          icon: "👥",
          unlocked: teamMembers.size >= 1,
          unlockedAt: teamMembers.size >= 1 ? new Date() : undefined,
        },
        {
          id: "consistency",
          title: language === "vi" ? "Tính nhất quán" : "Consistency",
          description: language === "vi" ? "Hoàn thành công việc liên tục" : "Complete tasks consistently",
          icon: "📅",
          unlocked: completedTasks >= 5,
          unlockedAt: completedTasks >= 5 ? new Date() : undefined,
        },
        {
          id: "milestone",
          title: language === "vi" ? "Mốc quan trọng" : "Milestone",
          description: language === "vi" ? "Đạt 100 điểm" : "Reach 100 points",
          icon: "🎖️",
          unlocked: points >= 100,
          unlockedAt: points >= 100 ? new Date() : undefined,
        },
      ];

      setAchievements(achievementList);
    }
  }, [columns, language]);

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
      en: "Rewards & Achievements",
      vi: "Phần thưởng & Thành tựu",
      zh: "奖励与成就",
      hi: "पुरस्कार और उपलब्धियां",
      ja: "報酬と実績",
      fr: "Récompenses et réalisations",
    },
    points: {
      en: "Points",
      vi: "Điểm",
      zh: "积分",
      hi: "अंक",
      ja: "ポイント",
      fr: "Points",
    },
    level: {
      en: "Level",
      vi: "Cấp",
      zh: "等级",
      hi: "स्तर",
      ja: "レベル",
      fr: "Niveau",
    },
    rewards: {
      en: "Rewards",
      vi: "Phần thưởng",
      zh: "奖励",
      hi: "पुरस्कार",
      ja: "報酬",
      fr: "Récompenses",
    },
    achievements: {
      en: "Achievements",
      vi: "Thành tựu",
      zh: "成就",
      hi: "उपलब्धियां",
      ja: "実績",
      fr: "Réalisations",
    },
    progress: {
      en: "Progress",
      vi: "Tiến độ",
      zh: "进度",
      hi: "प्रगति",
      ja: "進捗",
      fr: "Progrès",
    },
    unlocked: {
      en: "Unlocked",
      vi: "Đã mở khóa",
      zh: "已解锁",
      hi: "अनलॉक किया गया",
      ja: "解除済み",
      fr: "Débloqué",
    },
    locked: {
      en: "Locked",
      vi: "Đã khóa",
      zh: "锁定",
      hi: "लॉक किया गया",
      ja: "ロック中",
      fr: "Verrouillé",
    },
    nextLevel: {
      en: "Next Level",
      vi: "Cấp tiếp theo",
      zh: "下一级",
      hi: "अगला स्तर",
      ja: "次のレベル",
      fr: "Niveau suivant",
    },
  };

  const getText = (key: keyof typeof translations): string => {
    const langKey = language as keyof typeof translations[keyof typeof translations];
    return (translations[key as keyof typeof translations] as any)[langKey] || (translations[key as keyof typeof translations] as any).en;
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
            {language === "vi" ? "Theo dõi tiến độ và nhận phần thưởng" : "Track your progress and earn rewards"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">{getText("points")}</p>
                <p className="text-3xl font-bold">{totalPoints}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">{getText("level")}</p>
                <p className="text-3xl font-bold">{level}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">{getText("nextLevel")}</p>
                <p className="text-3xl font-bold">{Math.max(0, (level * 100) - totalPoints)}</p>
                <p className="text-xs text-orange-100">
                  {language === "vi" ? "điểm còn lại" : "points remaining"}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {getText("rewards")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`rounded-xl border-2 shadow-md p-6 transition-all duration-300 ${
                  reward.unlocked
                    ? "bg-white border-green-200 shadow-green-100"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    reward.unlocked ? "bg-green-100" : "bg-gray-200"
                  }`}>
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{reward.title}</h3>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{getText("progress")}</span>
                    <span className="font-semibold">
                      {reward.progress}/{reward.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        reward.unlocked ? "bg-green-500" : "bg-purple-500"
                      }`}
                      style={{ width: `${(reward.progress / reward.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    reward.unlocked
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {reward.unlocked ? getText("unlocked") : getText("locked")}
                  </span>
                  <span className="font-bold text-purple-600">
                    +{reward.points} {getText("points")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {getText("achievements")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-xl border-2 shadow-md p-6 transition-all duration-300 ${
                  achievement.unlocked
                    ? "bg-white border-yellow-200 shadow-yellow-100"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    achievement.unlocked ? "bg-yellow-100" : "bg-gray-200"
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        {language === "vi" ? "Mở khóa vào" : "Unlocked on"} {achievement.unlockedAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}