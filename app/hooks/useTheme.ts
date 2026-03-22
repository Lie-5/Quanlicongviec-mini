"use client";

import { useCallback } from "react";
import { useStore } from "../store/useStore";

export type Theme = "light" | "dark";

export const useTheme = () => {
  const { isDarkMode, setTheme } = useStore();

  const toggleTheme = useCallback(() => {
    setTheme(!isDarkMode);
  }, [isDarkMode, setTheme]);

  const setThemeMode = useCallback((theme: Theme) => {
    const isDark = theme === "dark";
    setTheme(isDark);
  }, [setTheme]);

  return {
    theme: isDarkMode ? ("dark" as Theme) : ("light" as Theme),
    isDarkMode,
    toggleTheme,
    setTheme: setThemeMode,
  };
};
