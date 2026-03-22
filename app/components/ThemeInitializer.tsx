"use client";

import { useEffect } from "react";
import { useStore } from "../store/useStore";

export default function ThemeInitializer() {
  const { isDarkMode, setTheme } = useStore();

  useEffect(() => {
    // Initialize theme from localStorage on mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = savedTheme === "dark" || 
        (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
      
      // Sync store with localStorage preference
      if (prefersDark !== isDarkMode) {
        setTheme(prefersDark);
      }
    }
  }, []); // Only run once on mount

  // Apply theme whenever isDarkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return null;
}
