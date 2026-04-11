"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "../../store/useStore";
import { useAuth } from "../../hooks/useAuth";
import { Language } from "../../types";

interface AuthPageProps {
  language?: Language;
}

export default function AuthPage({ language = "en" }: AuthPageProps) {
  const router = useRouter();
  const { language: storeLang } = useStore();
  const { signIn, signUp } = useAuth();
  
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activeLang = language || storeLang;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (activeTab === "login") {
        const success = signIn(formData.email, formData.password);
        if (success) {
          router.push("/tasks");
        }
      } else {
        if (!formData.name.trim()) {
          setError(activeLang === "vi" ? "Vui lòng nhập tên" : "Please enter your name");
          setIsLoading(false);
          return;
        }
        const success = signUp(formData.name, formData.email, formData.password);
        if (success) {
          router.push("/tasks");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(activeLang === "vi" ? "Đã xảy ra lỗi" : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">TaskFlow</span>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-500/20 border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "login"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {activeLang === "vi" ? "Đăng nhập" : "Sign In"}
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "register"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {activeLang === "vi" ? "Đăng ký" : "Sign Up"}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {activeTab === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {activeLang === "vi" ? "Họ và tên" : "Full Name"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={activeLang === "vi" ? "Nhập họ và tên..." : "Enter your name..."}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {activeLang === "vi" ? "Email" : "Email"}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={activeLang === "vi" ? "Nhập email..." : "Enter your email..."}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {activeLang === "vi" ? "Mật khẩu" : "Password"}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={activeLang === "vi" ? "Nhập mật khẩu..." : "Enter your password..."}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : activeTab === "login" ? (
                activeLang === "vi" ? "Đăng nhập" : "Sign In"
              ) : (
                activeLang === "vi" ? "Tạo tài khoản" : "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
            ← {activeLang === "vi" ? "Quay lại trang chủ" : "Back to home"}
          </Link>
        </div>
      </div>
    </div>
  );
}