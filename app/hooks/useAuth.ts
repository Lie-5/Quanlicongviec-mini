"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { User } from "../types";
import toast from "react-hot-toast";

export const useAuth = () => {
  const { user: storeUser, setUser, language } = useStore();
  const [isHydrated] = useState(() => {
    // Initialize state synchronously during construction
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser && !storeUser) {
        try {
          // Set user during initial state creation (no re-render)
          return JSON.parse(storedUser);
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }
    }
    return null;
  });
  
  // Check for user on mount (only if not already set)
  useEffect(() => {
    if (typeof window !== "undefined" && !storeUser) {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }
    }
  }, [setUser, storeUser]);

  const user = storeUser;
  const isAuthenticated = !!user;
  const isLoading = !isHydrated && !storeUser;

  const signIn = (email: string, password: string): boolean => {
    if (typeof window === "undefined") return false;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setUser(user);
        toast.success(language === "vi" ? "Đăng nhập thành công!" : "Login successful!");
        return true;
      }
    }

    // Demo: allow any email/password for testing
    const demoUser: User = {
      name: email.split("@")[0],
      email: email,
    };
    localStorage.setItem("currentUser", JSON.stringify(demoUser));
    setUser(demoUser);
    toast.success(language === "vi" ? "Đăng nhập thành công!" : "Login successful!");
    return true;
  };

  const signUp = (name: string, email: string, password: string): boolean => {
    if (typeof window === "undefined") return false;

    const newUser: User = {
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    toast.success(language === "vi" ? "Đăng ký thành công!" : "Sign up successful!");
    return true;
  };

  const signOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
    setUser(null);
    toast.success(language === "vi" ? "Đăng xuất thành công!" : "Logout successful!");
  };

  const updateAvatar = (avatar: string) => {
    if (!user) return;

    const updatedUser = { ...user, avatar };
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    setUser(updatedUser);
    toast.success(language === "vi" ? "Đã cập nhật ảnh đại diện!" : "Avatar updated!");
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    updateAvatar,
    isAuthenticated,
    isLoading,
  };
};
