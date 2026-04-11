"use client";

import Link from "next/link";
import { Language } from "../../types";

interface LandingPageProps {
  language?: Language;
}

export default function LandingPage({ language = "en" }: LandingPageProps) {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: language === "vi" ? "Quản lý công việc" : "Task Management",
      description: language === "vi" 
        ? "Tổ chức và theo dõi công việc một cách hiệu quả" 
        : "Organize and track your tasks efficiently",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H8m8 0v-2c0-.656-.126-1.283-.356-1.857M8 20H3v2c0 .656.126 1.283.356 1.857m8 0a3 3 0 015.356-1.857M8 20c.23.574.356 1.2.356 1.857v2a3 3 0 01-5.356 1.857M8 20c-.23-.574-.356-1.2-.356-1.857V14a3 3 0 015.356-1.857m0 0a3 3 0 015.356 1.857" />
        </svg>
      ),
      title: language === "vi" ? "Cộng tác đội nhóm" : "Team Collaboration",
      description: language === "vi"
        ? "Làm việc cùng nhóm một cách liền mạch"
        : "Work seamlessly with your team",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: language === "vi" ? "Lên kế hoạch thông minh" : "Smart Scheduling",
      description: language === "vi"
        ? "Lên kế hoạch và quản lý thời gian thông minh"
        : "Plan and manage your time smartly",
    },
  ];

  const stats = [
    { value: "10K+", label: language === "vi" ? "Người dùng" : "Users" },
    { value: "50K+", label: language === "vi" ? "Công việc" : "Tasks" },
    { value: "99%", label: language === "vi" ? "Hài lòng" : "Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              {language === "vi" ? "Đăng nhập" : "Sign In"}
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
            >
              {language === "vi" ? "Bắt đầu" : "Get Started"}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {language === "vi" 
                ? "Quản Lý Công Việc" 
                : "Manage Your Tasks"}
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {language === "vi" ? "Thông Minh Hơn" : "Smarter"}
              </span>
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              {language === "vi"
                ? "Nền tảng quản lý công việc hiện đại giúp bạn tổ chức, theo dõi và hoàn thành công việc một cách hiệu quả nhất."
                : "A modern task management platform that helps you organize, track, and complete your tasks more efficiently."
              }
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all hover:-translate-y-0.5"
              >
                {language === "vi" ? "Bắt đầu ngay" : "Get Started"}
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full text-lg border border-gray-200 hover:bg-gray-50 transition-all hover:-translate-y-0.5"
              >
                {language === "vi" ? "Xem demo" : "See Demo"}
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-16 animate-fade-in-up delay-400">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 animate-fade-in-up">
            {language === "vi" ? "Tính năng" : "Features"}
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            {language === "vi"
              ? "Tất cả những gì bạn cần để quản lý công việc hiệu quả"
              : "Everything you need to manage your tasks effectively"
            }
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "vi" 
                ? "Sẵn sàng để bắt đầu?" 
                : "Ready to get started?"}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {language === "vi"
                ? "Tham gia ngay hôm nay và bắt đầu quản lý công việc của bạn một cách hiệu quả."
                : "Join today and start managing your tasks more effectively."
              }
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-full text-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              {language === "vi" ? "Đăng ký miễn phí" : "Sign Up for Free"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="text-gray-900 font-medium">TaskFlow</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}