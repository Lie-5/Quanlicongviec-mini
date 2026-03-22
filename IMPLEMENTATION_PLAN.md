# Advanced Features Implementation Plan

## Overview
This document outlines the implementation plan for adding collaborative SaaS features to the task management application.

## Phase 1: Fix Theme Toggle ✅

### Issue
Theme toggle not updating UI properly

### Solution
1. Create dedicated `useTheme` hook
2. Use `useEffect` to apply theme class to `<html>` element
3. Sync with localStorage
4. Ensure instant UI updates

### Files to Update
- Create `app/hooks/useTheme.ts`
- Update `app/store/useStore.ts` - fix theme logic
- Update `app/layout.tsx` - add theme initialization script

## Phase 2: Enhanced Type Definitions

### New Fields for Task Interface
```typescript
interface Task {
  // Existing fields...
  isFavorite: boolean;
  isPrivate: boolean;
  progress: number; // 0-100
  creator: {
    username: string;
    avatar?: string;
  };
  lastEditor?: {
    username: string;
    avatar?: string;
    timestamp: string;
  };
  assignedUsers?: string[];
  viewCount: number;
  lastViewed?: string;
}
```

### New Interfaces
```typescript
interface RecentTask {
  taskId: string;
  viewedAt: string;
}

interface UserPreferences {
  language: Language;
  theme: 'light' | 'dark';
  recentTasks: RecentTask[];
}
```

## Phase 3: Multi-Language Support

### Supported Languages
- English (en)
- Vietnamese (vi)
- French (fr)
- Japanese (ja)
- Chinese (zh)
- Hindi (hi)

### Implementation
1. Expand `app/lib/translations.ts`
2. Add language selector in Settings
3. Update all UI strings to use translation function

## Phase 4: Favorites Feature

### Components
- `FavoriteButton.tsx` - Star icon toggle
- Update `TaskCard.tsx` - integrate favorite button
- Update `Sidebar.tsx` - show favorited tasks dynamically

### Logic
1. Click star → toggle `isFavorite` field
2. Update Zustand store
3. Sidebar filters tasks where `isFavorite === true`
4. No hardcoded favorites

## Phase 5: Recent Tasks

### Implementation
1. Track task views in `useStore`
2. When task opened → add to `recentTasks` array
3. Keep only last 5 items
4. Display in Sidebar dynamically
5. Clear old entries automatically

## Phase 6: Task Privacy

### Features
- Toggle button (lock/unlock icon)
- Private tasks only visible to creator
- Public tasks visible to all users
- Filter logic in task queries

### Components
- `PrivacyToggle.tsx`
- Update `TaskModal.tsx` - add privacy toggle
- Update `useTasks.ts` - filter by privacy

## Phase 7: Multi-User Simulation

### User Management
```typescript
interface User {
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
}
```

### Storage Strategy
- `users` - array of all users
- `currentUser` - logged-in user
- Each task stores creator username
- Filter tasks based on:
  - Creator === currentUser (show all)
  - isPrivate === false (show public only)

## Phase 8: Task Ownership & Activity

### Display
- Creator badge on task card
- Last editor info in task modal
- Activity timestamp

### Components
- `UserBadge.tsx` - show user avatar + name
- Update `TaskCard.tsx` - show creator
- Update `TaskModal.tsx` - show activity log

## Phase 9: Progress Bar

### Implementation
- `ProgressBar.tsx` component
- Input field in task modal (0-100)
- Visual progress bar on task card
- Color coding:
  - 0-33%: Red
  - 34-66%: Yellow
  - 67-100%: Green

## Phase 10: Code Refactoring

### Structure
```
app/
├── components/
│   ├── task/
│   │   ├── TaskCard.tsx
│   │   ├── TaskModal.tsx
│   │   ├── FavoriteButton.tsx
│   │   ├── PrivacyToggle.tsx
│   │   └── ProgressBar.tsx
│   ├── user/
│   │   └── UserBadge.tsx
│   └── common/
│       ├── EmptyState.tsx
│       └── LoadingSpinner.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useTasks.ts
│   ├── useTheme.ts
│   └── useFavorites.ts
├── lib/
│   ├── translations.ts
│   ├── storage.ts
│   └── utils.ts
└── store/
    └── useStore.ts
```

## Implementation Order

1. ✅ Fix theme toggle (critical)
2. ✅ Update type definitions
3. ✅ Expand translations
4. ✅ Add favorites feature
5. ✅ Implement recent tasks
6. ✅ Add privacy toggle
7. ✅ Multi-user simulation
8. ✅ Task ownership display
9. ✅ Progress bar
10. ✅ Code refactoring
11. ✅ Testing & polish

## Testing Checklist

- [ ] Theme toggle works instantly
- [ ] Favorites sync with sidebar
- [ ] Recent tasks update on view
- [ ] Privacy filtering works
- [ ] Multi-user login/logout
- [ ] Progress bar updates
- [ ] All languages work
- [ ] localStorage persistence
- [ ] No hardcoded data
- [ ] Smooth animations

## Notes

- All data must be dynamic
- No hardcoded tasks, favorites, or recent items
- State-driven UI
- Clean, modular code
- Production-ready quality
