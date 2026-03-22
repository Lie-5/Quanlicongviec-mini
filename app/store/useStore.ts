import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, Column, User, Language } from "../types";

interface AppState {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Theme state
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
  
  // Language state
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  
  // Sidebar state
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  
  // Tasks state
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  addTask: (columnId: string, task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newStatus: string) => void;
  
  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "Cần làm",
    titleEn: "To Do",
    color: "#9b9a97",
    tasks: [],
  },
  {
    id: "in-progress",
    title: "Đang làm",
    titleEn: "In Progress",
    color: "#E16737",
    tasks: [],
  },
  {
    id: "review",
    title: "Đang xem xét",
    titleEn: "In Review",
    color: "#6988FF",
    tasks: [],
  },
  {
    id: "done",
    title: "Hoàn thành",
    titleEn: "Done",
    color: "#0F7B6D",
    tasks: [],
  },
];

// Helper to get initial theme from localStorage
const getInitialTheme = (): boolean => {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem("theme");
  if (saved) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Theme state
      isDarkMode: getInitialTheme(),
      toggleTheme: () => {
        const newMode = !get().isDarkMode;
        set({ isDarkMode: newMode });
      },
      setTheme: (isDark) => {
        set({ isDarkMode: isDark });
      },
      
      // Language state
      language: "en",
      setLanguage: (lang) => {
        set({ language: lang });
        if (typeof window !== "undefined") {
          localStorage.setItem("language", lang);
        }
      },
      toggleLanguage: () => {
        // Cycle through languages: en -> vi -> zh -> hi -> ja -> fr -> en
        const languages: Language[] = ["en", "vi", "zh", "hi", "ja", "fr"];
        const currentIndex = languages.indexOf(get().language);
        const nextIndex = (currentIndex + 1) % languages.length;
        const newLang = languages[nextIndex];
        set({ language: newLang });
        if (typeof window !== "undefined") {
          localStorage.setItem("language", newLang);
        }
      },
      
      // Sidebar state
      sidebarCollapsed: false,
      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),
      
      // Tasks state
      columns: initialColumns,
      setColumns: (columns) => set({ columns }),
      
      addTask: (columnId, task) => {
        const columns = get().columns;
        const newColumns = columns.map((col) => {
          if (col.id === columnId) {
            return {
              ...col,
              tasks: [...col.tasks, task],
            };
          }
          return col;
        });
        set({ columns: newColumns });
      },
      
      updateTask: (taskId, updates) => {
        const columns = get().columns;
        const newColumns = columns.map((col) => ({
          ...col,
          tasks: col.tasks.map((task) =>
            task.id === taskId
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
        set({ columns: newColumns });
      },
      
      deleteTask: (taskId) => {
        const columns = get().columns;
        const newColumns = columns.map((col) => ({
          ...col,
          tasks: col.tasks.filter((task) => task.id !== taskId),
        }));
        set({ columns: newColumns });
      },
      
      moveTask: (taskId, newStatus) => {
        const columns = get().columns;
        let taskToMove: Task | null = null;
        
        // Find and remove task from current column
        const columnsWithoutTask = columns.map((col) => {
          const task = col.tasks.find((t) => t.id === taskId);
          if (task) {
            taskToMove = { ...task, status: newStatus as Task["status"], updatedAt: new Date().toISOString() };
            return {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== taskId),
            };
          }
          return col;
        });
        
        // Add task to new column
        if (taskToMove) {
          const newColumns = columnsWithoutTask.map((col) => {
            if (col.id === newStatus) {
              return {
                ...col,
                tasks: [...col.tasks, taskToMove!],
              };
            }
            return col;
          });
          set({ columns: newColumns });
        }
      },
      
      // Search state
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: "task-manager-storage",
      partialize: (state) => ({
        user: state.user,
        isDarkMode: state.isDarkMode,
        language: state.language,
        columns: state.columns,
      }),
    }
  )
);
