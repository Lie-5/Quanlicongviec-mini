"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Vui lòng điền đầy đủ thông tin / Please fill in all fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu không khớp / Passwords do not match");
        return;
      }
      if (formData.password.length < 6) {
        setError("Mật khẩu phải có ít nhất 6 ký tự / Password must be at least 6 characters");
        return;
      }
      
      // Create user object
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: undefined as string | undefined,
      };
      
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      alert("Đăng ký thành công! / Sign up successful!");
      window.opener?.postMessage({ type: "userLoggedIn" }, "*");
      window.close();
    } else {
      if (!formData.email || !formData.password) {
        setError("Vui lòng điền đầy đủ thông tin / Please fill in all fields");
        return;
      }
      
      // Check stored user
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === formData.email && user.password === formData.password) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          alert("Đăng nhập thành công! / Sign in successful!");
          window.opener?.postMessage({ type: "userLoggedIn" }, "*");
          window.close();
          return;
        }
      }
      // Demo: allow any email/password for testing (create new session)
      const demoUser = {
        name: formData.email.split('@')[0],
        email: formData.email,
        avatar: undefined as string | undefined,
      };
      localStorage.setItem("currentUser", JSON.stringify(demoUser));
      alert("Đăng nhập thành công! / Sign in successful!");
      window.opener?.postMessage({ type: "userLoggedIn" }, "*");
      window.close();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center">
      <div className="bg-white p-8 rounded-[8px] shadow-sm border border-[#e0e0e0] w-[400px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16v16H4V4z" fill="#FF4618"/>
            <path d="M9 9h6v6H9V9z" fill="white"/>
          </svg>
          <span className="font-bold text-[20px] text-[#37352f]">Task Manager</span>
        </div>

        <h1 className="text-[24px] font-bold text-center text-[#37352f] mb-2">
          {isSignUp ? "Đăng ký / Sign Up" : "Đăng nhập / Sign In"}
        </h1>
        <p className="text-[14px] text-center text-[#9b9a97] mb-6">
          {isSignUp 
            ? "Tạo tài khoản mới / Create a new account"
            : "Chào mừng trở lại! / Welcome back!"
          }
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-[4px] mb-4 text-[13px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] mb-1">
                Họ và tên / Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên / Enter your name"
                className="w-full px-3 py-2 border border-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              />
            </div>
          )}

          <div>
            <label className="block text-[13px] font-medium text-[#37352f] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email / Enter your email"
              className="w-full px-3 py-2 border border-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#37352f] mb-1">
              Mật khẩu / Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu / Enter your password"
              className="w-full px-3 py-2 border border-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] mb-1">
                Xác nhận mật khẩu / Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu / Confirm your password"
                className="w-full px-3 py-2 border border-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-[#2383E2] text-white rounded-[4px] hover:bg-[#1a6fc4] transition-colors font-medium"
          >
            {isSignUp ? "Đăng ký / Sign Up" : "Đăng nhập / Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
              setFormData({ email: "", password: "", confirmPassword: "", name: "" });
            }}
            className="text-[14px] text-[#2383E2] hover:underline"
          >
            {isSignUp 
              ? "Đã có tài khoản? Đăng nhập / Already have an account? Sign In"
              : "Chưa có tài khoản? Đăng ký / Don't have an account? Sign Up"
            }
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-[#e0e0e0]">
          <button
            type="button"
            className="w-full py-2.5 border border-[#e0e0e0] rounded-[4px] hover:bg-[#f7f6f3] transition-colors flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-[14px] text-[#37352f]">
              Tiếp tục với Google / Continue with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
