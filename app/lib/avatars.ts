"use client";

// Avatar management utilities for fake collaboration system

// Available avatar paths - these should be placed in /public/avatars/
export const AVATAR_PATHS = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
];

// Default avatar for fallback
export const DEFAULT_AVATAR = "/avatars/avatar1.png";

// LocalStorage key for storing avatar assignments
const AVATAR_ASSIGNMENTS_KEY = "taskmanager_avatar_assignments";

interface AvatarAssignment {
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

// Get a consistent avatar for an email
export function getAvatarForEmail(email: string): AvatarAssignment {
  const assignments = getAvatarAssignments();
  const normalizedEmail = email.toLowerCase();
  
  if (assignments[normalizedEmail]) {
    return assignments[normalizedEmail];
  }
  
  // Create new assignment
  const name = extractUsernameFromEmail(email);
  const avatar = getRandomAvatar();
  
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

// Get a random avatar
export function getRandomAvatar(): string {
  const randomIndex = Math.floor(Math.random() * AVATAR_PATHS.length);
  return AVATAR_PATHS[randomIndex];
}

// Get a deterministic avatar based on a string (for consistent hashing)
export function getDeterministicAvatar(seed: string): string {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  
  const index = Math.abs(hash) % AVATAR_PATHS.length;
  return AVATAR_PATHS[index];
}

// Avatar component props
export interface AvatarProps {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

// Avatar sizes
export const AVATAR_SIZES = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-10 h-10 text-base",
};

// Create a task creator info
export function createTaskCreator(email?: string): { name: string; avatar: string } {
  if (!email) {
    // Default current user
    return {
      name: "You",
      avatar: getDeterministicAvatar("currentuser"),
    };
  }
  
  const assignment = getAvatarForEmail(email);
  return {
    name: assignment.name,
    avatar: assignment.avatar,
  };
}
