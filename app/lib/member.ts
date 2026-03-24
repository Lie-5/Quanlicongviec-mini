"use client";

// Member management utilities for task collaboration

import { AVATARS, getCurrentUser } from "./avatar";

export interface Member {
  email: string;
  name: string;
  avatar: string;
}

// LocalStorage key for member assignments (email -> avatar)
const MEMBER_AVATARS_KEY = "taskmanager_member_avatars";

// Get all member avatar assignments from localStorage
export function getMemberAvatarAssignments(): Record<string, string> {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem(MEMBER_AVATARS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load member avatar assignments:", e);
  }
  return {};
}

// Save member avatar assignments to localStorage
export function saveMemberAvatarAssignments(assignments: Record<string, string>): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(MEMBER_AVATARS_KEY, JSON.stringify(assignments));
  } catch (e) {
    console.error("Failed to save member avatar assignments:", e);
  }
}

// Get available avatars (excluding current user's avatar AND already assigned avatars)
export function getAvailableAvatars(usedAvatars: string[] = []): string[] {
  const currentUser = getCurrentUser();
  const currentAvatar = currentUser?.avatar || "/avatars/avatar1.jpg";
  
  // Filter out current user's avatar and any already used avatars
  return AVATARS.filter(avatar => 
    avatar !== currentAvatar && 
    !usedAvatars.includes(avatar)
  );
}

// Get or create avatar for a member email
export function getMemberAvatar(email: string, additionalUsedAvatars: string[] = []): string {
  const normalizedEmail = email.toLowerCase().trim();
  const assignments = getMemberAvatarAssignments();
  
  // Return existing assignment if available
  if (assignments[normalizedEmail]) {
    return assignments[normalizedEmail];
  }
  
  // Get current user avatar to exclude
  const currentUser = getCurrentUser();
  const currentAvatar = currentUser?.avatar || "/avatars/avatar1.jpg";
  
  // Get already used avatars in this task
  const usedInTask = [...additionalUsedAvatars, currentAvatar];
  
  // Get available avatars excluding current user's and task's used avatars
  const available = getAvailableAvatars(usedInTask);
  
  // Use email as seed for deterministic but varied avatar
  let index: number;
  if (available.length > 0) {
    // Hash the email for deterministic selection from available
    let hash = 0;
    for (let i = 0; i < normalizedEmail.length; i++) {
      hash = ((hash << 5) - hash) + normalizedEmail.charCodeAt(i);
      hash = hash & hash;
    }
    index = Math.abs(hash) % available.length;
  } else {
    index = 0;
  }
  
  const avatar = available[index] || AVATARS[1] || AVATARS[0];
  
  // Save the assignment
  assignments[normalizedEmail] = avatar;
  saveMemberAvatarAssignments(assignments);
  
  return avatar;
}

// Extract username from email (before @)
export function extractNameFromEmail(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex > 0) {
    return email.substring(0, atIndex);
  }
  return email;
}

// Create a member from email
export function createMemberFromEmail(email: string, existingMembers: Member[] = []): Member {
  const normalizedEmail = email.toLowerCase().trim();
  
  // Get avatars already used in this task
  const usedAvatars = existingMembers.map(m => m.avatar);
  
  return {
    email: normalizedEmail,
    name: extractNameFromEmail(normalizedEmail),
    avatar: getMemberAvatar(normalizedEmail, usedAvatars),
  };
}

// Check if email already exists in members array
export function isEmailExisting(email: string, members: Member[]): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  return members.some(m => m.email.toLowerCase() === normalizedEmail);
}

// Add member to array (with duplicate check)
export function addMemberToArray(members: Member[], newMember: Member): Member[] {
  // Check for duplicates
  if (isEmailExisting(newMember.email, members)) {
    return members;
  }
  
  return [...members, newMember];
}

// Remove member from array by index
export function removeMemberFromArray(members: Member[], index: number): Member[] {
  return members.filter((_, i) => i !== index);
}

// Remove member from array by email
export function removeMemberByEmail(members: Member[], email: string): Member[] {
  const normalizedEmail = email.toLowerCase().trim();
  return members.filter(m => m.email.toLowerCase() !== normalizedEmail);
}
