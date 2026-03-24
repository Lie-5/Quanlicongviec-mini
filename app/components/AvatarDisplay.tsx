"use client";

import { useState } from "react";

interface User {
  name: string;
  avatar: string;
}

interface AvatarDisplayProps {
  users: User[];
  maxDisplay?: number;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const SIZES = {
  sm: {
    container: "w-6 h-6 text-xs",
    stacked: "-ml-1",
    count: "text-[10px]",
  },
  md: {
    container: "w-8 h-8 text-sm",
    stacked: "-ml-1.5",
    count: "text-xs",
  },
  lg: {
    container: "w-10 h-10 text-base",
    stacked: "-ml-2",
    count: "text-sm",
  },
};

export default function AvatarDisplay({
  users,
  maxDisplay = 3,
  size = "md",
  showTooltip = true,
}: AvatarDisplayProps) {
  const [hoveredUser, setHoveredUser] = useState<{ name: string; x: number; y: number } | null>(null);
  const sizeClasses = SIZES[size];
  const displayedUsers = users.slice(0, maxDisplay);
  const remainingCount = users.length - maxDisplay;

  const handleMouseEnter = (user: User, index: number, event: React.MouseEvent) => {
    if (!showTooltip) return;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setHoveredUser({
      name: user.name,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center">
      {/* Avatar Stack */}
      <div className="flex items-center">
        {displayedUsers.map((user, index) => (
          <div
            key={`${user.name}-${index}`}
            className={`
              relative rounded-full overflow-hidden border-2 border-white dark:border-slate-800
              ${index > 0 ? sizeClasses.stacked : ""}
              ${sizeClasses.container}
              transition-all duration-200 cursor-pointer
              hover:scale-110 hover:z-10 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-slate-800
            `}
            style={{ zIndex: users.length - index }}
            onMouseEnter={(e) => handleMouseEnter(user, index, e)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Avatar Image - Show actual image */}
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient with initials only if image is completely missing
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const initials = document.createElement("div");
                  initials.className = `
                    w-full h-full flex items-center justify-center
                    bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-medium
                  `;
                  initials.textContent = user.name.charAt(0).toUpperCase();
                  parent.appendChild(initials);
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* +N indicator */}
      {remainingCount > 0 && (
        <div
          className={`
            ${sizeClasses.stacked}
            ${sizeClasses.container}
            rounded-full bg-slate-200 dark:bg-slate-700 
            flex items-center justify-center
            text-slate-600 dark:text-slate-300 font-medium
            border-2 border-white dark:border-slate-800
          `}
        >
          +{remainingCount}
        </div>
      )}

      {/* Tooltip */}
      {hoveredUser && (
        <div
          className="fixed z-50 px-2 py-1 text-xs text-white bg-slate-800 dark:bg-slate-700 rounded-md shadow-lg pointer-events-none"
          style={{
            left: `${hoveredUser.x}px`,
            top: `${hoveredUser.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          {hoveredUser.name}
          <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-slate-800 dark:border-t-slate-700" />
        </div>
      )}
    </div>
  );
}

// Single avatar component for smaller displays
export function SingleAvatar({
  src,
  name,
  size = "md",
  showTooltip = true,
}: {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const sizeClasses = SIZES[size];

  return (
    <div className="relative inline-block">
      <div
        className={`
          relative rounded-full overflow-hidden border-2 border-white dark:border-slate-800
          ${sizeClasses.container}
          transition-all duration-200 cursor-pointer
          hover:scale-110 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-slate-800
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Avatar Image */}
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              const initials = document.createElement("div");
              initials.className = `
                w-full h-full flex items-center justify-center
                bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-medium
              `;
              initials.textContent = name.charAt(0).toUpperCase();
              parent.appendChild(initials);
            }
          }}
        />
      </div>
      
      {showTooltip && isHovered && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-2 py-1 text-xs text-white bg-slate-800 dark:bg-slate-700 rounded-md shadow-lg whitespace-nowrap">
          {name}
          <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-slate-800 dark:border-t-slate-700" />
        </div>
      )}
    </div>
  );
}
