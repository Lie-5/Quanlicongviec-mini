"use client";

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({ 
  progress, 
  showLabel = false, 
  label = "Progress",
  size = "sm" 
}: ProgressBarProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  // Determine color based on progress value
  const getProgressColor = (value: number) => {
    if (value < 33) return "from-red-400 to-orange-400";
    if (value < 66) return "from-orange-400 to-yellow-400";
    return "from-emerald-400 to-teal-400";
  };

  // Size classes
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span className="font-medium">{label}</span>
          <span className="font-semibold">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full ${sizeClasses[size]} bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(clampedProgress)} transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Shimmer effect */}
          <div className="h-full w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
