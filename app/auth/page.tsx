"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { language } = useStore();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
          setError(language === "vi" ? "Vui lòng điền đầy đủ thông tin" : "Please fill in all fields");
          setIsLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError(language === "vi" ? "Mật khẩu không khớp" : "Passwords do not match");
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError(language === "vi" ? "Mật khẩu phải có ít nhất 6 ký tự" : "Password must be at least 6 characters");
          setIsLoading(false);
          return;
        }

        const success = signUp(formData.name, formData.email, formData.password);
        if (success) {
          setTimeout(() => {
            router.push("/");
          }, 500);
        }
      } else {
        if (!formData.email || !formData.password) {
          setError(language === "vi" ? "Vui lòng điền đầy đủ thông tin" : "Please fill in all fields");
          setIsLoading(false);
          return;
        }

        const success = signIn(formData.email, formData.password);
        if (success) {
          setTimeout(() => {
            router.push("/");
          }, 500);
        }
      }
    } catch (err) {
      setError(language === "vi" ? "Đã xảy ra lỗi" : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2383E2]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E16737]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-[#1a1a1a]/80 backdrop-blur-xl p-8 rounded-[16px] shadow-2xl border border-[#2f2f2f] w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2383E2] to-[#1a6fc4] rounded-[8px] flex items-center justify-center shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 9h6v6H9V9z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-[22px] bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Task Manager
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-center text-white mb-2">
          {isSignUp ? (language === "vi" ? "Đăng ký" : "Sign Up") : (language === "vi" ? "Đăng nhập" : "Sign In")}
        </h1>
        <p className="text-[14px] text-center text-gray-400 mb-6">
          {isSignUp
            ? language === "vi"
              ? "Tạo tài khoản mới để bắt đầu"
              : "Create a new account to get started"
            : language === "vi"
            ? "Chào mừng trở lại!"
            : "Welcome back!"}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-[8px] mb-4 text-[13px] backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[13px] font-medium text-gray-300 mb-2">
                {language === "vi" ? "Họ và tên" : "Full Name"}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={language === "vi" ? "Nhập họ và tên" : "Enter your name"}
                className="w-full px-4 py-3 bg-[#0f0f0f]/50 border border-[#2f2f2f] rounded-[8px] text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#2383E2] focus:ring-1 focus:ring-[#2383E2] transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-[13px] font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={language === "vi" ? "Nhập email" : "Enter your email"}
              className="w-full px-4 py-3 bg-[#0f0f0f]/50 border border-[#2f2f2f] rounded-[8px] text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#2383E2] focus:ring-1 focus:ring-[#2383E2] transition-all"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-300 mb-2">
              {language === "vi" ? "Mật khẩu" : "Password"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={language === "vi" ? "Nhập mật khẩu" : "Enter your password"}
              className="w-full px-4 py-3 bg-[#0f0f0f]/50 border border-[#2f2f2f] rounded-[8px] text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#2383E2] focus:ring-1 focus:ring-[#2383E2] transition-all"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-[13px] font-medium text-gray-300 mb-2">
                {language === "vi" ? "Xác nhận mật khẩu" : "Confirm Password"}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={language === "vi" ? "Nhập lại mật khẩu" : "Confirm your password"}
                className="w-full px-4 py-3 bg-[#0f0f0f]/50 border border-[#2f2f2f] rounded-[8px] text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#2383E2] focus:ring-1 focus:ring-[#2383E2] transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-[#2383E2] to-[#1a6fc4] text-white rounded-[8px] hover:shadow-lg hover:shadow-[#2383E2]/30 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? language === "vi"
                ? "Đang xử lý..."
                : "Processing..."
              : isSignUp
              ? language === "vi"
                ? "Đăng ký"
                : "Sign Up"
              : language === "vi"
              ? "Đăng nhập"
              : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
              setFormData({ email: "", password: "", confirmPassword: "", name: "" });
            }}
            className="text-[14px] text-[#2383E2] hover:text-[#1a6fc4] transition-colors"
          >
            {isSignUp
              ? language === "vi"
                ? "Đã có tài khoản? Đăng nhập"
                : "Already have an account? Sign In"
              : language === "vi"
              ? "Chưa có tài khoản? Đăng ký"
              : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-[#2f2f2f]">
          <button
            type="button"
            className="w-full py-3 border border-[#2f2f2f] rounded-[8px] hover:bg-[#0f0f0f]/50 transition-all flex items-center justify-center gap-2 group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-[14px] text-gray-300 group-hover:text-white transition-colors">
              {language === "vi" ? "Tiếp tục với Google" : "Continue with Google"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
