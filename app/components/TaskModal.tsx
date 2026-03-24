"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Task, Language } from "../types";
import { getTranslation } from "../lib/translations";
import { getCurrentUser, getRandomAvatar, initializeCurrentUser } from "../lib/avatar";
import { Member, createMemberFromEmail, isEmailExisting, addMemberToArray, removeMemberFromArray } from "../lib/member";
import VisibilityToggle from "./VisibilityToggle";
import AvatarDisplay from "./AvatarDisplay";
import AddMemberModal from "./AddMemberModal";
import toast from "react-hot-toast";

interface TaskModalProps {
  task: Task | null;
  columnId: string;
  language: Language;
  onSave: (taskData: Partial<Task>) => void;
  onDelete?: (taskId: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function TaskModal({
  task,
  columnId,
  language,
  onSave,
  onDelete,
  onClose,
  isOpen,
}: TaskModalProps) {
  const t = getTranslation(language);
  const [showAddMember, setShowAddMember] = useState(false);
  // Track task ID to force re-render when task changes
  const currentTaskId = task?.id || null;
  const [formKey, setFormKey] = useState(0);
  
  // Reset form key when task changes
  useEffect(() => {
    setFormKey(prev => prev + 1);
  }, [currentTaskId]);
  
  // Initialize current user on first render
  useEffect(() => {
    initializeCurrentUser("you@example.com");
  }, []);
  
  // When modal opens with a task, regenerate form data from task
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const derivedFormData = useMemo(() => {
    const user = getCurrentUser() || { 
      email: "you@example.com", 
      name: "You", 
      avatar: "/avatars/avatar1.jpg" 
    };
    
    // Handle task.assignedTo - ensure it's always an array
    const assignedMembers = task?.assignedTo || [];
    
    if (task) {
      return {
        title: task.title,
        titleEn: task.titleEn,
        description: task.description || "",
        descriptionEn: task.descriptionEn || "",
        priority: task.priority,
        status: task.status as string,
        dueDate: task.dueDate || "",
        startDate: task.startDate || "",
        endDate: task.endDate || "",
        tag: task.tag || "",
        tagEn: task.tagEn || "",
        isPublic: task.isPublic || false,
        progress: task.progress || 0,
        createdBy: task.createdBy || { email: user.email, name: user.name, avatar: user.avatar },
        assignedTo: assignedMembers as Member[],
      };
    }
    
    return {
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      priority: "medium" as Task["priority"],
      status: columnId,
      dueDate: "",
      startDate: "",
      endDate: "",
      tag: "",
      tagEn: "",
      isPublic: false,
      progress: 0,
      createdBy: { email: user.email, name: user.name, avatar: user.avatar },
      assignedTo: [] as Member[],
    };
  }, [task, columnId]);

  const [formData, setFormData] = useState(derivedFormData);

  // Update form data when task changes - use effect without dependency on formData
  useEffect(() => {
    setFormData(derivedFormData);
  }, [derivedFormData]);

  // Handle adding a member
  const handleAddMember = useCallback((newMember: Member) => {
    // Check for duplicates
    if (isEmailExisting(newMember.email, formData.assignedTo)) {
      toast.error(language === "vi" ? "Thành viên đã tồn tại" : "Member already exists");
      return;
    }
    
    // Add member to array
    const updatedMembers = addMemberToArray(formData.assignedTo, newMember);
    
    setFormData(prev => ({
      ...prev,
      assignedTo: updatedMembers,
    }));
    
    // Success feedback
    toast.success(language === "vi" 
      ? `Đã thêm ${newMember.name}` 
      : `Added ${newMember.name}`
    );
    
    // Close add member modal
    setShowAddMember(false);
  }, [formData.assignedTo, language]);

  // Handle removing a member
  const handleRemoveMember = useCallback((index: number) => {
    const updatedMembers = removeMemberFromArray(formData.assignedTo, index);
    
    setFormData(prev => ({
      ...prev,
      assignedTo: updatedMembers,
    }));
  }, [formData.assignedTo]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...formData,
      status: formData.status as Task["status"],
      titleEn: formData.titleEn || formData.title,
      descriptionEn: formData.descriptionEn || formData.description,
      tagEn: formData.tagEn || formData.tag,
    });
    onClose();
  };

  // Handle closing - reset all states
  const handleModalClose = () => {
    setShowAddMember(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm"
      onClick={(e) => {
        // Only close if clicking on the overlay (not on modal content)
        if (e.target === e.currentTarget) {
          handleModalClose();
        }
      }}
    >
      <div 
        className="glass-light rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => {
          // Prevent clicks inside modal from closing it
          e.stopPropagation();
        }}
        key={formKey}
      >
        <div className="p-4 border-b border-[#e0e0e0] dark:border-[#3f3f3f] flex items-center justify-between sticky top-0 bg-white dark:bg-[#2f2f2f]">
          <h3 className="font-medium text-[#37352f] dark:text-[#e0e0e0]">
            {task ? t.edit : t.addTask}
          </h3>
          <div className="flex items-center gap-3">
            <VisibilityToggle
              isPublic={formData.isPublic}
              onChange={(isPublic) => setFormData({ ...formData, isPublic })}
              language={language}
            />
            <button
              onClick={handleModalClose}
              className="text-[#9b9a97] hover:text-[#37352f] dark:hover:text-[#e0e0e0] transition-all duration-200 hover:rotate-90"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
              {t.taskName}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              placeholder={language === "vi" ? "Nhập tên công việc..." : "Enter task name..."}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
              {t.taskDescription}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2] min-h-[100px]"
              placeholder={language === "vi" ? "Nhập mô tả công việc..." : "Enter task description..."}
            />
          </div>

          {/* Collaboration Section */}
          <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            {/* Created By */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#9b9a97] dark:text-slate-400">
                  {language === "vi" ? "Tạo bởi" : "Created by"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-white dark:border-slate-700 shadow-sm">
                  <img
                    src={formData.createdBy?.avatar || getRandomAvatar("default")}
                    alt={formData.createdBy?.name || "You"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[13px] text-[#37352f] dark:text-[#e0e0e0] font-medium">
                  {formData.createdBy?.name || "You"}
                </span>
              </div>
            </div>

            {/* Assigned To */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#9b9a97] dark:text-slate-400">
                  {language === "vi" ? "Giao cho" : "Assigned to"}
                </span>
                <span className="text-[11px] text-slate-400">
                  ({formData.assignedTo?.length || 0})
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAddMember(true);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {language === "vi" ? "Thêm" : "Add"}
              </button>
            </div>

            {/* Assigned Members Display */}
            {formData.assignedTo && formData.assignedTo.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.assignedTo.map((member, index) => (
                  <div
                    key={`${member.email}-${index}`}
                    className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600"
                  >
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-slate-700 dark:text-slate-300">{member.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {(!formData.assignedTo || formData.assignedTo.length === 0) && (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                {language === "vi" 
                  ? "Chưa có thành viên nào được giao" 
                  : "No members assigned yet"
                }
              </p>
            )}
          </div>
          

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                {t.priority}
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as Task["priority"] })
                }
                className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              >
                <option value="high">{t.priorityHigh}</option>
                <option value="medium">{t.priorityMedium}</option>
                <option value="low">{t.priorityLow}</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                {t.status}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              >
                <option value="todo">{t.statusTodo}</option>
                <option value="in-progress">{t.statusInProgress}</option>
                <option value="review">{t.statusReview}</option>
                <option value="done">{t.statusDone}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Due Date */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                {t.dueDate}
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              />
            </div>

            {/* Date Range - Start */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                {language === "vi" ? "Ngày bắt đầu" : "Start Date"}
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date Range - End */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                {language === "vi" ? "Ngày kết thúc" : "End Date"}
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              />
            </div>

            {/* Progress */}
            <div>
              <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
                Progress ({formData.progress}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                className="w-full h-2 bg-[#e0e0e0] dark:bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer accent-[#2383E2]"
              />
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="block text-[13px] font-medium text-[#37352f] dark:text-[#e0e0e0] mb-1">
              {t.tag}
            </label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full px-3 py-2 border border-[#e0e0e0] dark:border-[#3f3f3f] dark:bg-[#3f3f3f] dark:text-[#e0e0e0] rounded-[4px] text-[14px] focus:outline-none focus:border-[#2383E2]"
              placeholder={language === "vi" ? "Nhãn..." : "Tag..."}
            />
          </div>

          <div className="flex justify-between pt-4 border-t border-[#e0e0e0] dark:border-[#3f3f3f]">
            {task && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(task.id);
                  handleModalClose();
                }}
                className="px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-[4px] transition-all duration-200 active:scale-95"
              >
                {t.delete}
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 text-[14px] text-[#9b9a97] hover:bg-[#f7f6f3] dark:hover:bg-[#3f3f3f] rounded-[4px] transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-[14px] bg-[#2383E2] text-white rounded-[4px] hover:bg-[#1a6fc4] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              >
                {t.save}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Add Member Modal - with proper event handling */}
      <div onClick={(e) => e.stopPropagation()}>
        <AddMemberModal
          isOpen={showAddMember}
          onClose={() => setShowAddMember(false)}
          onAdd={handleAddMember}
          language={language}
          existingMembers={formData.assignedTo}
        />
      </div>
    </div>
  );
}
