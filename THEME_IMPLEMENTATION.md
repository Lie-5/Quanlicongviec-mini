# Theme Toggle Implementation Guide

## Overview
This document explains the complete theme toggle implementation that ensures instant dark/light mode switching without page refresh.

## Architecture

### 1. useTheme Hook (`app/hooks/useTheme.ts`)

**Purpose**: Centralized theme management with localStorage persistence

**Key Features**:
- Initializes theme on mount from localStorage or system preference
- Applies theme to `<html>` element via `dark` class and `data-theme` attribute
- Provides `toggleTheme()` and `setTheme()` functions
- Uses `useCallback` for performance optimization
- Syncs with Zustand store

**API**:
```typescript
const { theme, isDarkMode, toggleTheme, setTheme } = useTheme();

// theme: "light" | "dark"
// isDarkMode: boolean
// toggleTheme: () => void
// setTheme: (theme: "light" | "dark") => void
```

### 2. Layout Script (`app/layout.tsx`)

**Purpose**: Prevent flash of unstyled content (FOUC)

**How it works**:
- Inline `<script>` runs **before** React hydration
- Reads theme from localStorage
- Applies theme class immediately to `<html>`
- Ensures correct theme on initial page load

**Why it's needed**:
- React components load after HTML
- Without this script, users see a brief flash of wrong theme
- This script runs synchronously before any rendering

### 3. Zustand Store Integration

**Purpose**: Global state management

**Theme-related state**:
```typescript
interface AppState {
  isDarkMode: boolean;
  setTheme: (isDark: boolean) => void;
  toggleTheme: () => void; // Deprecated - use useTheme hook instead
}
```

**Note**: The store's `toggleTheme` is kept for backward compatibility but `useTheme` hook is the recommended approach.

## Usage Examples

### In Components

```typescript
import { useTheme } from "../hooks/useTheme";

export default function MyComponent() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
```

### In Navbar

```typescript
// NavbarNew.tsx
import { useTheme } from "../hooks/useTheme";

export default function NavbarNew() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

### In Settings Page

```typescript
// settings/page.tsx
import { useTheme } from "../hooks/useTheme";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}
```

## How It Works

### 1. Initial Page Load

```
1. Browser loads HTML
2. Inline script in <head> runs
   - Reads localStorage.getItem('theme')
   - Checks system preference if no saved theme
   - Applies 'dark' class to <html> if needed
3. React hydrates
4. useTheme hook initializes
   - Syncs with current theme
   - Sets up event listeners
```

### 2. Theme Toggle

```
1. User clicks toggle button
2. toggleTheme() called
3. useTheme hook:
   - Updates Zustand store (isDarkMode)
   - Calls applyTheme()
   - Adds/removes 'dark' class on <html>
   - Saves to localStorage
4. UI updates instantly (CSS responds to .dark class)
```

### 3. Persistence

```
localStorage.setItem('theme', 'dark' | 'light')
```

Theme is saved on every change and restored on next visit.

## CSS Integration

### Tailwind Dark Mode

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Dark mode styles automatically apply when .dark class is on <html> */
```

### Usage in Components

```tsx
<div className="bg-white dark:bg-[#191919]">
  <p className="text-black dark:text-white">
    This text changes color based on theme
  </p>
</div>
```

## Troubleshooting

### Theme not persisting
**Solution**: Check if localStorage is enabled in browser

### Flash of wrong theme on load
**Solution**: Ensure inline script in layout.tsx is present and runs before React

### Theme toggle not working
**Solution**: 
1. Check if `useTheme` hook is imported correctly
2. Verify `dark` class is being added to `<html>`
3. Check browser console for errors

### Dark mode styles not applying
**Solution**:
1. Ensure Tailwind config has `darkMode: 'class'`
2. Check if CSS classes use `dark:` prefix
3. Verify `dark` class is on `<html>` element

## Performance Considerations

### useCallback Usage
All theme functions use `useCallback` to prevent unnecessary re-renders:

```typescript
const toggleTheme = useCallback(() => {
  // ...
}, [isDarkMode, setTheme, applyTheme]);
```

### Minimal Re-renders
- Only components using `useTheme` re-render on theme change
- CSS handles visual updates (no JS re-render needed for styling)

## Best Practices

1. **Always use `useTheme` hook** instead of accessing store directly
2. **Don't manipulate DOM directly** - let the hook handle it
3. **Use Tailwind's `dark:` prefix** for theme-aware styles
4. **Test both themes** during development
5. **Consider system preference** as default

## Migration Guide

### From Old Implementation

**Before**:
```typescript
const { isDarkMode, toggleTheme } = useStore();
```

**After**:
```typescript
const { isDarkMode, toggleTheme } = useTheme();
```

### Benefits of New Implementation

- ✅ Centralized theme logic
- ✅ No FOUC (flash of unstyled content)
- ✅ Better performance
- ✅ Easier to maintain
- ✅ Type-safe
- ✅ Follows React best practices

## Testing

### Manual Testing Checklist

- [ ] Toggle theme in Navbar - updates instantly
- [ ] Toggle theme in Settings - updates instantly
- [ ] Refresh page - theme persists
- [ ] Open in new tab - correct theme loads
- [ ] Clear localStorage - falls back to system preference
- [ ] Change system preference - app respects it (if no saved theme)
- [ ] No flash of wrong theme on load
- [ ] All UI elements respond to theme change

### Browser Testing

Test in:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## Future Enhancements

Potential improvements:
- Add more themes (e.g., "auto", "high-contrast")
- Sync theme across tabs using `storage` event
- Add theme transition animations
- Support custom color schemes
- Add theme preview in settings

## Summary

The theme toggle implementation provides:
- **Instant updates** - No page refresh needed
- **Persistence** - Theme saved in localStorage
- **No FOUC** - Inline script prevents flash
- **Clean API** - Simple `useTheme` hook
- **Performance** - Optimized with useCallback
- **Maintainable** - Centralized logic

All components should use the `useTheme` hook for theme-related functionality.
