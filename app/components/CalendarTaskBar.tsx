"use client";

import { useState, MouseEvent } from "react";
import { Task, Language } from "../types";

interface CalendarTaskBarProps {
  task: Task;
  language: Language;
  isStart: boolean;
  isEnd: boolean;
  isMiddle: boolean;
  isDeadline: boolean;
  onClick: (task: Task) => void;
  showTime?: boolean;
}

// Priority to color mapping
const getPriorityColors = (priority: string) => {
  switch (priority) {
    case "high":
      return {
        gradientBg: "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
        shadow: "shadow-red-500/30",
      };
    case "medium":
      return {
        gradientBg: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
        shadow: "shadow-yellow-500/30",
      };
    case "low":
      return {
        gradientBg: "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
        shadow: "shadow-green-500/30",
      };
    default:
      return {
        gradientBg: "bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600",
        shadow: "shadow-indigo-500/30",
      };
  }
};

// Deadline color
const getDeadlineColors = () => ({
  gradientBg: "bg-gradient-to-r from-orange-400 via-red-500 to-red-600",
  shadow: "shadow-red-500/40",
});

export default function CalendarTaskBar({
  task,
  language,
  isStart,
  isEnd,
  isMiddle,
  isDeadline,
  onClick,
  showTime = true,
}: CalendarTaskBarProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get task title based on language
  const getTitle = () => {
    if (language === "vi" && task.title) {
      return task.title;
    }
    return task.titleEn || task.title;
  };

  // Get color scheme
  const colors = getPriorityColors(task.priority);
  const deadlineColors = getDeadlineColors();
  
  const colorScheme = isDeadline ? deadlineColors.gradientBg : colors.gradientBg;
  const shadowColor = isDeadline ? deadlineColors.shadow : colors.shadow;

  const hasTime = showTime && (task.startTime || task.endTime);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick(task);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden cursor-pointer group
        ${isStart ? "rounded-l-lg" : "rounded-none"}
        ${isEnd ? "rounded-r-lg" : "rounded-none"}
        ${!isStart && !isEnd ? "rounded-none" : ""}
        text-white
        transition-all duration-200 ease-out
        ${isHovered ? "scale-[1.02] shadow-lg z-10" : "shadow-md"}
        ${shadowColor}
        ${isDeadline ? "ring-2 ring-white ring-offset-1 dark:ring-offset-slate-800" : ""}
      `}
      style={{
        marginLeft: isMiddle ? "-1px" : 0,
        marginRight: isMiddle ? "-1px" : 0,
      }}
    >
      {/* Animated gradient background */}
      <div 
        className={`
          absolute inset-0 opacity-90
          bg-gradient-to-r from-white/20 via-transparent to-white/10
          ${isHovered ? "animate-pulse" : ""}
        `}
      />

      {/* Left accent bar for tasks with time */}
      {hasTime && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/40" />
      )}

      {/* Content */}
      <div className="relative px-2 py-1.5">
        <div className="flex items-start justify-between gap-1">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div className="flex items-center gap-1">
              {task.isFavorite && (
                <svg 
                  className="w-3 h-3 text-yellow-300 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )}
              <span className="text-xs font-semibold truncate leading-tight">
                {getTitle()}
              </span>
            </div>

            {/* Time display */}
            {hasTime && (
              <div className="flex items-center gap-1 mt-0.5 text-[10px] opacity-90">
                <svg 
                  className="w-2.5 h-2.5 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span className="truncate">
                  {task.startTime && task.startTime}
                  {task.startTime && task.endTime && " - "}
                  {task.endTime && !task.startTime && task.endTime}
                </span>
              </div>
            )}
          </div>

          {/* Expand indicator */}
          {isEnd && (
            <svg 
              className={`
                w-3 h-3 flex-shrink-0 opacity-60 group-hover:opacity-100
                transition-transform duration-200
                ${isHovered ? "translate-x-0.5" : ""}
              `}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-white/10 rounded-lg pointer-events-none" />
      )}
    </div>
  );
}

// Compact version for smaller cells
export function CompactTaskBar({
  task,
  language,
  onClick,
}: {
  task: Task;
  language: Language;
  onClick: (task: Task) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const getTitle = () => {
    if (language === "vi" && task.title) {
      return task.title;
    }
    return task.titleEn || task.title;
  };

  const colors = getPriorityColors(task.priority);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick(task);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        px-2 py-1 text-xs font-medium text-white rounded-md truncate
        cursor-pointer transition-all duration-200
        ${colors.gradientBg}
        ${isHovered ? "shadow-md scale-[1.02]" : ""}
      `}
    >
      {getTitle()}
    </div>
  );
}
