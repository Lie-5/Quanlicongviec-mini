"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpPage() {
  const router = useRouter();
  const { language } = useStore();
  const { user, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && user === null) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, router]);

  // Show loading while checking auth
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const faqs: FAQ[] = [
    {
      id: "getting-started",
      question: language === "vi" ? "Làm thế nào để bắt đầu?" : "How do I get started?",
      answer: language === "vi"
        ? "Chào mừng bạn đến với hệ thống quản lý công việc! Bắt đầu bằng cách tạo công việc đầu tiên của bạn từ trang Tổng quan hoặc trang Công việc. Bạn có thể thêm thành viên, đặt deadline và theo dõi tiến độ."
        : "Welcome to the task management system! Get started by creating your first task from the Overview or Tasks page. You can add team members, set deadlines, and track progress.",
      category: "getting-started",
    },
    {
      id: "create-task",
      question: language === "vi" ? "Làm thế nào để tạo công việc?" : "How do I create a task?",
      answer: language === "vi"
        ? "Nhấp vào nút 'Thêm công việc' trên trang Tổng quan hoặc trang Công việc. Điền thông tin cần thiết như tiêu đề, mô tả, thành viên được giao, và deadline. Công việc sẽ xuất hiện trong bảng Kanban."
        : "Click the 'Add Task' button on the Overview or Tasks page. Fill in the required information like title, description, assigned members, and deadline. The task will appear in the Kanban board.",
      category: "tasks",
    },
    {
      id: "manage-team",
      question: language === "vi" ? "Làm thế nào để quản lý đội ngũ?" : "How do I manage my team?",
      answer: language === "vi"
        ? "Truy cập trang 'Người của tôi' để xem tất cả thành viên đội ngũ. Bạn có thể xem tiến độ công việc, trạng thái trực tuyến và giao việc cho thành viên."
        : "Visit the 'My People' page to see all team members. You can view their task progress, online status, and assign tasks to them.",
      category: "team",
    },
    {
      id: "calendar-view",
      question: language === "vi" ? "Làm thế nào để sử dụng lịch?" : "How do I use the calendar?",
      answer: language === "vi"
        ? "Trang Công việc hiển thị lịch với tất cả công việc của bạn. Bạn có thể xem công việc theo ngày, tuần hoặc tháng. Nhấp vào một ngày để xem chi tiết công việc."
        : "The Tasks page shows a calendar with all your tasks. You can view tasks by day, week, or month. Click on a date to see task details.",
      category: "calendar",
    },
    {
      id: "rewards-system",
      question: language === "vi" ? "Hệ thống phần thưởng hoạt động như thế nào?" : "How does the rewards system work?",
      answer: language === "vi"
        ? "Bạn nhận điểm khi hoàn thành công việc và làm việc với đội ngũ. Điểm giúp bạn lên cấp và mở khóa phần thưởng. Xem tiến độ của bạn trên trang Phần thưởng."
        : "You earn points by completing tasks and working with your team. Points help you level up and unlock rewards. Check your progress on the Rewards page.",
      category: "rewards",
    },
    {
      id: "change-language",
      question: language === "vi" ? "Làm thế nào để thay đổi ngôn ngữ?" : "How do I change the language?",
      answer: language === "vi"
        ? "Nhấp vào biểu tượng ngôn ngữ ở cuối thanh bên để chọn ngôn ngữ ưa thích của bạn. Hệ thống hỗ trợ tiếng Việt, tiếng Anh, tiếng Trung, tiếng Hindi, tiếng Nhật và tiếng Pháp."
        : "Click the language icon at the bottom of the sidebar to select your preferred language. The system supports Vietnamese, English, Chinese, Hindi, Japanese, and French.",
      category: "settings",
    },
    {
      id: "task-status",
      question: language === "vi" ? "Các trạng thái công việc là gì?" : "What are the task statuses?",
      answer: language === "vi"
        ? "Công việc có thể ở trạng thái: Mới (chưa bắt đầu), Đang thực hiện (đang làm), Đang xem xét (chờ phê duyệt), và Hoàn thành (đã xong). Kéo thả công việc giữa các cột để thay đổi trạng thái."
        : "Tasks can be in statuses: New (not started), In Progress (being worked on), Review (awaiting approval), and Done (completed). Drag and drop tasks between columns to change their status.",
      category: "tasks",
    },
    {
      id: "notifications",
      question: language === "vi" ? "Làm thế nào để nhận thông báo?" : "How do I get notifications?",
      answer: language === "vi"
        ? "Hệ thống sẽ thông báo khi có deadline sắp đến, công việc mới được giao, hoặc thành viên đội ngũ cập nhật tiến độ. Kiểm tra thường xuyên trang tổng quan để theo dõi."
        : "The system will notify you when deadlines are approaching, new tasks are assigned, or team members update progress. Check the overview page regularly to stay updated.",
      category: "notifications",
    },
  ];

  const categories = [
    { id: "getting-started", name: language === "vi" ? "Bắt đầu" : "Getting Started", icon: "🚀" },
    { id: "tasks", name: language === "vi" ? "Công việc" : "Tasks", icon: "📋" },
    { id: "team", name: language === "vi" ? "Đội ngũ" : "Team", icon: "👥" },
    { id: "calendar", name: language === "vi" ? "Lịch" : "Calendar", icon: "📅" },
    { id: "rewards", name: language === "vi" ? "Phần thưởng" : "Rewards", icon: "🏆" },
    { id: "settings", name: language === "vi" ? "Cài đặt" : "Settings", icon: "⚙️" },
    { id: "notifications", name: language === "vi" ? "Thông báo" : "Notifications", icon: "🔔" },
  ];

  const translations = {
    title: {
      en: "Help Center",
      vi: "Trung tâm trợ giúp",
      zh: "帮助中心",
      hi: "सहायता केंद्र",
      ja: "ヘルプセンター",
      fr: "Centre d'aide",
    },
    subtitle: {
      en: "Find answers to common questions and learn how to use the platform",
      vi: "Tìm câu trả lời cho các câu hỏi thường gặp và học cách sử dụng nền tảng",
      zh: "查找常见问题的答案并学习如何使用平台",
      hi: "सामान्य प्रश्नों के उत्तर खोजें और प्लेटफॉर्म का उपयोग करना सीखें",
      ja: "一般的な質問への回答を見つけ、プラットフォームの使い方を学びましょう",
      fr: "Trouvez des réponses aux questions courantes et apprenez à utiliser la plateforme",
    },
    faq: {
      en: "Frequently Asked Questions",
      vi: "Câu hỏi thường gặp",
      zh: "常见问题",
      hi: "अक्सर पूछे जाने वाले प्रश्न",
      ja: "よくある質問",
      fr: "Questions fréquemment posées",
    },
    categories: {
      en: "Categories",
      vi: "Danh mục",
      zh: "类别",
      hi: "श्रेणियाँ",
      ja: "カテゴリ",
      fr: "Catégories",
    },
    contact: {
      en: "Need more help?",
      vi: "Cần thêm trợ giúp?",
      zh: "需要更多帮助？",
      hi: "और मदद चाहिए?",
      ja: "さらにヘルプが必要ですか？",
      fr: "Besoin d'aide supplémentaire ?",
    },
    contactDesc: {
      en: "Contact our support team for personalized assistance",
      vi: "Liên hệ đội ngũ hỗ trợ để được trợ giúp cá nhân hóa",
      zh: "联系我们的支持团队获取个性化帮助",
      hi: "व्यक्तिगत सहायता के लिए हमारी सहायता टीम से संपर्क करें",
      ja: "パーソナライズされたサポートのためにサポートチームに連絡してください",
      fr: "Contactez notre équipe de support pour une assistance personnalisée",
    },
    contactButton: {
      en: "Contact Support",
      vi: "Liên hệ hỗ trợ",
      zh: "联系支持",
      hi: "सहायता से संपर्क करें",
      ja: "サポートに連絡",
      fr: "Contacter le support",
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
            {getText("subtitle")}
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {getText("categories")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl border-2 border-gray-200 shadow-md p-4 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <p className="text-sm font-semibold text-gray-900">{category.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {getText("faq")}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl border-2 border-gray-200 shadow-md overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">
            {getText("contact")}
          </h3>
          <p className="text-purple-100 mb-6">
            {getText("contactDesc")}
          </p>
          <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg">
            {getText("contactButton")}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}