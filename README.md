# Task Manager - Modern Task Management Application

A professional, production-ready task management web application built with Next.js 16, TypeScript, and Tailwind CSS. Inspired by Trello and Notion, featuring a clean, modern UI with dark mode support and multi-language capabilities.

## ✨ Features

### Core Functionality
- **Task Management**: Create, edit, delete, and organize tasks
- **Drag & Drop**: Intuitive drag-and-drop interface using @dnd-kit
- **Task Properties**: 
  - Title (Vietnamese & English)
  - Description (Vietnamese & English)
  - Priority levels (High, Medium, Low)
  - Status tracking (To Do, In Progress, In Review, Done)
  - Due dates
  - Tags/Labels
- **Search & Filter**: Real-time search across all tasks
- **Empty State**: Beautiful empty state UI when no tasks exist

### User Experience
- **Authentication**: Simple localStorage-based authentication
  - Sign up / Sign in
  - User profile with avatar support
  - Instant UI updates (no page refresh needed)
- **Dark Mode**: Elegant dark theme with smooth transitions
- **Multi-language**: Vietnamese and English support
- **Toast Notifications**: Real-time feedback for all actions
- **Responsive Design**: Works seamlessly on desktop and mobile

### Pages
- **Home/Tasks**: Main Kanban board with drag-and-drop
- **Dashboard**: Statistics and overview of all tasks
- **Settings**: Theme toggle, language switcher, profile management
- **Auth**: Modern authentication page with gradient design

## 🏗️ Architecture

### Clean Code Structure
```
app/
├── components/          # Reusable UI components
│   ├── NavbarNew.tsx
│   ├── SidebarNew.tsx
│   ├── TaskBoardNew.tsx
│   ├── TaskCard.tsx
│   ├── TaskModal.tsx
│   ├── EmptyState.tsx
│   └── ToastProvider.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   └── useTasks.ts
├── lib/                # Utility functions
│   └── translations.ts
├── store/              # State management
│   └── useStore.ts
├── types/              # TypeScript definitions
│   └── index.ts
├── auth/               # Authentication page
├── dashboard/          # Dashboard page
├── settings/           # Settings page
└── tasks/              # Tasks page
```

### State Management
- **Zustand**: Global state management with persistence
- **localStorage**: Automatic data persistence
- **React Hooks**: Local component state

### Key Technologies
- **Next.js 16**: App Router with TypeScript
- **Tailwind CSS 4**: Utility-first styling
- **@dnd-kit**: Modern drag-and-drop
- **react-hot-toast**: Toast notifications
- **Zustand**: State management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Quanlicongviec-mini
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production
```bash
npm run build
npm start
```

## 📖 Usage Guide

### Authentication
1. Navigate to `/auth` or click "Sign In" in the navbar
2. Create an account or sign in
3. User data is stored in localStorage
4. UI updates immediately after login (no refresh needed)

### Creating Tasks
1. Click the "+" button on any column header
2. Or use the "Create your first task" button in empty state
3. Fill in task details (title, description, priority, etc.)
4. Tasks are automatically saved to localStorage

### Managing Tasks
- **Edit**: Click on any task card to open the edit modal
- **Delete**: Use the delete button in the task menu or modal
- **Move**: Drag and drop tasks between columns
- **Search**: Use the search bar in the navbar

### Settings
- **Theme**: Toggle between light and dark mode
- **Language**: Switch between Vietnamese and English
- **Profile**: View and update your profile information

## 🎨 Design System

### Color Palette
- **Primary**: `#2383E2` (Blue)
- **Secondary**: `#E16737` (Orange)
- **Success**: `#0F7B6D` (Green)
- **Warning**: `#F5A623` (Yellow)
- **Danger**: `#FF4618` (Red)

### Dark Mode
- Background: `#191919` (Deep black)
- Surface: `#2f2f2f` (Platinum gray)
- Borders: `#3f3f3f`

### Light Mode
- Background: `#ffffff` (White)
- Surface: `#f7f6f3` (Soft white)
- Borders: `#e0e0e0`

## 🔧 Configuration

### LocalStorage Keys
- `task-manager-storage`: Main app state (tasks, user, theme, language)
- `currentUser`: Current logged-in user
- `user`: User credentials
- `theme`: Theme preference

### Customization
- Edit `app/lib/translations.ts` for language strings
- Modify `app/store/useStore.ts` for initial state
- Update `app/globals.css` for global styles

## 📝 Key Features Explained

### 1. Instant UI Updates After Login
- Uses Zustand store for global state
- `useAuth` hook updates store immediately
- No page refresh required
- Router navigation after successful auth

### 2. Empty State UI
- Shows when no tasks exist
- Provides clear call-to-action
- Guides users to create first task
- Beautiful, engaging design

### 3. Drag & Drop
- Powered by @dnd-kit
- Smooth animations
- Works across all columns
- Updates state and localStorage automatically

### 4. Toast Notifications
- Success, error, and info messages
- Automatic dismissal
- Customizable styling
- Positioned top-right

### 5. Multi-language Support
- Vietnamese and English
- Centralized translation system
- Easy to add more languages
- Persists user preference

## 🐛 Troubleshooting

### Tasks not persisting
- Check browser localStorage is enabled
- Clear localStorage and try again: `localStorage.clear()`

### Dark mode not working
- Check `theme` value in localStorage
- Ensure `dark` class is on `<html>` element

### Drag & drop not working
- Ensure tasks have unique IDs
- Check console for errors
- Try refreshing the page

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
