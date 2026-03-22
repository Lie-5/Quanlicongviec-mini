export type Language = "vi" | "en" | "zh" | "hi" | "ja" | "fr";

export type Priority = "high" | "medium" | "low";

export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export interface User {
  name: string;
  email: string;
  avatar?: string;
  password?: string;
}

export interface Task {
  id: string;
  title: string;
  titleEn: string;
  description?: string;
  descriptionEn?: string;
  tag?: string;
  tagEn?: string;
  priority: Priority;
  status: TaskStatus;
  dueDate?: string;
  assignee?: string;
  isFavorite: boolean;
  isPublic: boolean;
  progress: number;
  lastViewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  titleEn: string;
  color: string;
  tasks: Task[];
}

export interface Translation {
  // Common
  workspace: string;
  board: string;
  search: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  close: string;
  add: string;
  
  // Auth
  signIn: string;
  signUp: string;
  signOut: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  
  // Navigation
  dashboard: string;
  tasks: string;
  settings: string;
  profile: string;
  
  // Task Management
  title: string;
  taskBoard: string;
  addTask: string;
  addTaskPlaceholder: string;
  addColumn: string;
  taskDetails: string;
  taskName: string;
  taskDescription: string;
  priority: string;
  status: string;
  dueDate: string;
  tag: string;
  searchPlaceholder: string;
  noResults: string;
  searchResults: string;
  
  // Priority Labels
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
  
  // Status Labels
  statusTodo: string;
  statusInProgress: string;
  statusReview: string;
  statusDone: string;
  
  // Settings
  appearance: string;
  language: string;
  theme: string;
  lightMode: string;
  darkMode: string;
  changeAvatar: string;
  
  // Sidebar
  quickFind: string;
  favorites: string;
  recent: string;
  private: string;
  newPage: string;
  myTasks: string;
  
  // Notifications
  taskCreated: string;
  taskUpdated: string;
  taskDeleted: string;
  loginSuccess: string;
  logoutSuccess: string;
  errorOccurred: string;
}
