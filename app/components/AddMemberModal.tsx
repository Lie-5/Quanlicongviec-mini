"use client";

import { useState } from "react";
import { Language } from "../types";
import { getTranslation } from "../lib/translations";
import { createMemberFromEmail, isEmailExisting, Member } from "../lib/member";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: Member) => void;
  language?: Language;
  existingMembers?: Member[];
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onAdd,
  language = "en",
  existingMembers = [],
}: AddMemberModalProps) {
  const t = getTranslation(language);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [preview, setPreview] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValid(true);
    setIsDuplicate(false);
    
    const normalizedEmail = value.toLowerCase().trim();
    
    if (validateEmail(normalizedEmail)) {
      // Check if already a member
      if (isEmailExisting(normalizedEmail, existingMembers)) {
        setIsDuplicate(true);
        setPreview(null);
      } else {
        // Create member preview - pass existing members to avoid duplicate avatars
        const member = createMemberFromEmail(normalizedEmail, existingMembers);
        setPreview(member);
      }
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizedEmail = email.toLowerCase().trim();
    
    if (!validateEmail(normalizedEmail)) {
      setIsValid(false);
      return;
    }

    // Check if already a member
    if (isEmailExisting(normalizedEmail, existingMembers)) {
      setIsDuplicate(true);
      return;
    }

    if (!preview) return;

    setIsLoading(true);
    
    // Small delay for UX, then add and close
    setTimeout(() => {
      onAdd(preview);
      setEmail("");
      setPreview(null);
      setIsLoading(false);
      onClose();
    }, 200);
  };

  const handleClose = () => {
    // Reset state when closing
    setEmail("");
    setPreview(null);
    setIsValid(true);
    setIsDuplicate(false);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm"
      onClick={(e) => {
        // Only close if clicking on the overlay itself, not inside modal
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      onKeyDown={handleKeyDown}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-scaleIn"
        onClick={(e) => {
          // Prevent clicks inside modal from closing it
          e.stopPropagation();
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {language === "vi" ? "Thêm thành viên" : "Add Member"}
          </h3>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 hover:rotate-90"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Email input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {language === "vi" ? "Email" : "Email"}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="john@gmail.com"
              className={`
                w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-900 
                text-slate-800 dark:text-slate-200 
                focus:outline-none focus:ring-2 transition-all
                ${!isValid || isDuplicate
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                  : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
                }
              `}
              autoFocus
            />
            {!isValid && (
              <p className="mt-1 text-xs text-red-500">
                {language === "vi" ? "Vui lòng nhập email hợp lệ" : "Please enter a valid email"}
              </p>
            )}
            {isDuplicate && (
              <p className="mt-1 text-xs text-red-500">
                {language === "vi" ? "Thành viên đã tồn tại" : "Member already exists"}
              </p>
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {language === "vi" ? "Preview:" : "Preview:"}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-md">
                  <img
                    src={preview.avatar}
                    alt={preview.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        const initials = document.createElement("div");
                        initials.className = "w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-medium";
                        initials.textContent = preview.name.charAt(0).toUpperCase();
                        parent.appendChild(initials);
                      }
                    }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {preview.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {preview.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 text-sm font-medium"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={!preview || isLoading}
              className={`
                flex-1 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium
                ${preview && isValid && !isDuplicate
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-blue-500/30"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                }
              `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </span>
              ) : (
                language === "vi" ? "Thêm" : "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
