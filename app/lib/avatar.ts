"use client";

// Avatar management utilities for fake collaboration system

// Available avatar paths - JPG format
export const AVATARS = [
  "/avatars/avatar1.jpg",
  "/avatars/avatar2.webp",
  "/avatars/avatar3.jpg",
  "/avatars/avatar4.jpg",
  "/avatars/avatar5",
  "/avatars/avatar6",
  "/avatars/avatar7",
  "/avatars/avatar8",
];

// Fallback avatar (use first one)
export const DEFAULT_AVATAR = AVATARS[0];

// LocalStorage keys
const AVATAR_ASSIGNMENTS_KEY = "taskmanager_avatar_assignments";
const CURRENT_USER_KEY = "taskmanager_current_user";

interface AvatarAssignment {
  email: string;
  name: string;
  avatar: string;
}

interface CurrentUser {
  email: string;
  name: string;
  avatar: string;
}

// Get all avatar assignments from localStorage
export function getAvatarAssignments(): Record<string, AvatarAssignment> {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem(AVATAR_ASSIGNMENTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load avatar assignments:", e);
  }
  return {};
}

// Save avatar assignments to localStorage
export function saveAvatarAssignments(assignments: Record<string, AvatarAssignment>): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(AVATAR_ASSIGNMENTS_KEY, JSON.stringify(assignments));
  } catch (e) {
    console.error("Failed to save avatar assignments:", e);
  }
}

// Get a consistent avatar for an email (same email = same avatar)
export function getAvatarForEmail(email: string): AvatarAssignment {
  const normalizedEmail = email.toLowerCase().trim();
  const assignments = getAvatarAssignments();
  
  if (assignments[normalizedEmail]) {
    return assignments[normalizedEmail];
  }
  
  // Create new assignment with random avatar (consistent for this email)
  const name = extractUsernameFromEmail(normalizedEmail);
  const avatar = getRandomAvatar(normalizedEmail);
  
  const assignment: AvatarAssignment = {
    email: normalizedEmail,
    name,
    avatar,
  };
  
  // Save the new assignment
  assignments[normalizedEmail] = assignment;
  saveAvatarAssignments(assignments);
  
  return assignment;
}

// Extract username from email (before @)
export function extractUsernameFromEmail(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex > 0) {
    return email.substring(0, atIndex);
  }
  return email;
}

// Get a random avatar - uses email as seed for consistency (excludes current user's avatar)
export function getRandomAvatar(seed: string = "", excludeCurrentUser: boolean = true): string {
  // Use seed for deterministic selection, otherwise random
  let index: number;
  
  // Get current user's avatar to exclude
  const currentUser = getCurrentUser();
  const currentUserAvatar = currentUser?.avatar || "/avatars/avatar1.jpg";
  
  // Filter out current user's avatar from available avatars
  const availableAvatars = excludeCurrentUser 
    ? AVATARS.filter(avatar => avatar !== currentUserAvatar)
    : AVATARS;
  
  if (seed) {
    // Simple hash function for deterministic result
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    index = Math.abs(hash) % availableAvatars.length;
  } else {
    index = Math.floor(Math.random() * availableAvatars.length);
  }
  
  return availableAvatars[index] || AVATARS[0];
}

// Get current user from localStorage
export function getCurrentUser(): CurrentUser | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load current user:", e);
  }
  return null;
}

// Set current user in localStorage
export function setCurrentUser(user: CurrentUser): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save current user:", e);
  }
}

// Initialize current user if not exists
export function initializeCurrentUser(email: string = "you@example.com"): CurrentUser {
  let user = getCurrentUser();
  
  if (!user) {
    // Create new user - ALWAYS use avatar1 for current user
    user = {
      email: email.toLowerCase().trim(),
      name: extractUsernameFromEmail(email),
      avatar: "/avatars/avatar1.jpg", // Always use avatar1 for current user
    };
    setCurrentUser(user);
  }
  
  return user;
}

// Get user display name - fallback to "You" if current user
export function getUserDisplayName(email: string): string {
  const currentUser = getCurrentUser();
  if (currentUser && email.toLowerCase() === currentUser.email.toLowerCase()) {
    return "You";
  }
  return extractUsernameFromEmail(email);
}

// Check if email is current user
export function isCurrentUser(email: string): boolean {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  return email.toLowerCase() === currentUser.email.toLowerCase();
}
