"use client";

import { Task, Language } from "../types";
import { useState, useMemo, useEffect, useCallback } from "react";
import CalendarTaskBar from "./CalendarTaskBar";
import { HolidayBadge, useHolidays, VIETNAM_HOLIDAYS } from "./HolidayBadge";

interface CalendarGridProps {
  tasks: Task[];
  language: Language;
  onDateClick: (date: Date) => void;
  onTaskClick: (task: Task) => void;
  onRangeSelect?: (start: Date, end: Date) => void;
  enableRangeSelection?: boolean;
}

// Calendar translations - synced with app language
const WEEKDAYS: Record<Language, string[]> = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  vi: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  hi: ["सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "रवि"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
  fr: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
};

const MONTHS: Record<Language, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  vi: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
  zh: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  hi: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
};

// Helper to get current year range
const getYearRange = () => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }
  return years;
};

export default function CalendarGrid({
  tasks,
  language,
  onDateClick,
  onTaskClick,
  onRangeSelect,
  enableRangeSelection = false,
}: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  
  // Range selection state
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const weekdays = WEEKDAYS[language] || WEEKDAYS.en;
  const months = MONTHS[language] || MONTHS.en;
  const yearRange = useMemo(() => getYearRange(), []);

  // Holiday hook
  const { getHolidayForDate, isHoliday } = useHolidays(language, "vn");

  const today = useMemo(() => {
    const now = new Date();
    return {
      date: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMonthDropdownOpen(false);
      setIsYearDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Get calendar days for current month
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;
    
    const prevMonthDays = startDay;
    const totalDays = prevMonthDays + lastDay.getDate();
    const rows = Math.ceil(totalDays / 7);
    
    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];
    
    const prevMonth = new Date(year, month, 0);
    for (let i = prevMonthDays; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i + 1),
        isCurrentMonth: false,
      });
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    const remainingDays = rows * 7 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  }, [currentDate]);

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return tasks.filter((task) => {
      const start = task.startDate || task.dueDate;
      const end = task.endDate || task.dueDate;
      if (!start) return false;
      const startStr = start.split("T")[0];
      const endStr = end ? end.split("T")[0] : startStr;
      return dateStr >= startStr && dateStr <= endStr;
    });
  };

  // Check if task is multi-day
  const isMultiDayTask = (task: Task) => {
    const start = task.startDate || task.dueDate;
    const end = task.endDate || task.dueDate;
    if (!start || !end) return false;
    const startStr = start.split("T")[0];
    const endStr = end.split("T")[0];
    return startStr !== endStr;
  };

  // Check if task is on the first day of its span
  const isTaskStartDay = (task: Task, date: Date) => {
    const start = task.startDate || task.dueDate;
    if (!start) return true;
    const startStr = start.split("T")[0];
    const dateStr = date.toISOString().split("T")[0];
    return startStr === dateStr;
  };

  // Check if task is on the last day of its span
  const isTaskEndDay = (task: Task, date: Date) => {
    const end = task.endDate || task.dueDate;
    if (!end) return true;
    const endStr = end.split("T")[0];
    const dateStr = date.toISOString().split("T")[0];
    return endStr === dateStr;
  };

  // Check if task spans across this date (not start or end)
  const isTaskMiddleDay = (task: Task, date: Date) => {
    return isMultiDayTask(task) && !isTaskStartDay(task, date) && !isTaskEndDay(task, date);
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.date &&
      date.getMonth() === today.month &&
      date.getFullYear() === today.year
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return formatDateKey(date) === formatDateKey(selectedDate);
  };

  // Check if date is in selected range
  const isInRange = useCallback((date: Date) => {
    if (!rangeStart || !rangeEnd) return false;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const start = new Date(Math.min(rangeStart.getTime(), rangeEnd.getTime()));
    start.setHours(0, 0, 0, 0);
    const end = new Date(Math.max(rangeStart.getTime(), rangeEnd.getTime()));
    end.setHours(0, 0, 0, 0);
    return d >= start && d <= end;
  }, [rangeStart, rangeEnd]);

  // Check if date is start or end of range
  const isRangeStart = useCallback((date: Date) => {
    if (!rangeStart || !rangeEnd) return false;
    const start = rangeStart < rangeEnd ? rangeStart : rangeEnd;
    return formatDateKey(date) === formatDateKey(start);
  }, [rangeStart, rangeEnd]);

  const isRangeEnd = useCallback((date: Date) => {
    if (!rangeStart || !rangeEnd) return false;
    const end = rangeStart < rangeEnd ? rangeEnd : rangeStart;
    return formatDateKey(date) === formatDateKey(end);
  }, [rangeStart, rangeEnd]);

  const isDeadlineDay = (task: Task, date: Date) => {
    const dueDate = task.dueDate || task.endDate;
    if (!dueDate) return false;
    const dueDateStr = dueDate.split("T")[0];
    const dateStr = date.toISOString().split("T")[0];
    return dueDateStr === dateStr;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  };

  const handleMonthChange = (monthIndex: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setIsMonthDropdownOpen(false);
  };

  const handleYearChange = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  // Handle date click with range selection support
  const handleDateClick = (date: Date) => {
    if (enableRangeSelection) {
      if (!isSelectingRange) {
        // Start range selection
        setIsSelectingRange(true);
        setRangeStart(date);
        setRangeEnd(null);
      } else {
        // Complete range selection
        setRangeEnd(date);
        setIsSelectingRange(false);
        if (onRangeSelect && rangeStart) {
          const start = date < rangeStart ? date : rangeStart;
          const end = date < rangeStart ? rangeStart : date;
          onRangeSelect(start, end);
        }
      }
    } else {
      setSelectedDate(date);
      onDateClick(date);
    }
  };

  // Handle mouse enter for range preview
  const handleMouseEnter = (date: Date) => {
    if (isSelectingRange && rangeStart) {
      setHoverDate(date);
    }
  };

  // Clear range selection
  const clearRangeSelection = () => {
    setIsSelectingRange(false);
    setRangeStart(null);
    setRangeEnd(null);
    setHoverDate(null);
  };

  const handleTaskClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    onTaskClick(task);
  };

  // Get display title based on language
  const getTaskTitle = (task: Task) => {
    return language === "vi" && task.title ? task.title : task.titleEn;
  };

  // Format time for display
  const formatTime = (time?: string) => {
    if (!time) return null;
    return time;
  };

  // Calculate display range for hover preview
  const displayRangeStart = isSelectingRange && hoverDate && rangeStart
    ? (rangeStart < hoverDate ? rangeStart : hoverDate)
    : rangeStart;
  const displayRangeEnd = isSelectingRange && hoverDate && rangeStart
    ? (rangeStart < hoverDate ? hoverDate : rangeStart)
    : rangeEnd;

  const isInDisplayRange = useCallback((date: Date) => {
    if (!displayRangeStart || !displayRangeEnd) return false;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const start = new Date(Math.min(displayRangeStart.getTime(), displayRangeEnd.getTime()));
    start.setHours(0, 0, 0, 0);
    const end = new Date(Math.max(displayRangeStart.getTime(), displayRangeEnd.getTime()));
    end.setHours(0, 0, 0, 0);
    return d >= start && d <= end;
  }, [displayRangeStart, displayRangeEnd]);

  const isDisplayRangeStart = useCallback((date: Date) => {
    if (!displayRangeStart || !displayRangeEnd) return false;
    const start = displayRangeStart < displayRangeEnd ? displayRangeStart : displayRangeEnd;
    return formatDateKey(date) === formatDateKey(start);
  }, [displayRangeStart, displayRangeEnd]);

  const isDisplayRangeEnd = useCallback((date: Date) => {
    if (!displayRangeStart || !displayRangeEnd) return false;
    const end = displayRangeStart < displayRangeEnd ? displayRangeEnd : displayRangeStart;
    return formatDateKey(date) === formatDateKey(end);
  }, [displayRangeStart, displayRangeEnd]);

  return (
    <div className="flex flex-col h-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          {/* Month Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMonthDropdownOpen(!isMonthDropdownOpen);
                setIsYearDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-lg font-semibold text-slate-800 dark:text-slate-200"
            >
              {months[currentDate.getMonth()]}
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMonthDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 max-h-64 overflow-y-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
                {months.map((month, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMonthChange(index);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                      currentDate.getMonth() === index
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsYearDropdownOpen(!isYearDropdownOpen);
                setIsMonthDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-lg font-semibold text-slate-800 dark:text-slate-200"
            >
              {currentDate.getFullYear()}
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isYearDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-24 max-h-64 overflow-y-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50">
                {yearRange.map((year) => (
                  <button
                    key={year}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleYearChange(year);
                    }}
                    className={`w-full px-4 py-2 text-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                      currentDate.getFullYear() === year
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-1 ml-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Previous month"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Next month"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Range selection indicator */}
          {enableRangeSelection && (
            <button
              onClick={clearRangeSelection}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                isSelectingRange 
                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {isSelectingRange 
                ? (language === "vi" ? "Đang chọn..." : "Selecting...") 
                : (language === "vi" ? "Chọn khoảng" : "Select range")
              }
            </button>
          )}
          
          {/* Today Button */}
          <button
            onClick={handleToday}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
          >
            {language === "vi" ? "Hôm nay" : language === "zh" ? "今天" : language === "ja" ? "今日" : language === "hi" ? "आज" : language === "fr" ? "Aujourd'hui" : "Today"}
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-slate-500 dark:text-slate-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 flex-1">
        {calendarDays.map((day, index) => {
          const dayTasks = getTasksForDate(day.date);
          const dateKey = formatDateKey(day.date);
          const holiday = getHolidayForDate(day.date);
          const isTodayDate = isToday(day.date);
          const isSelectedDate = isSelected(day.date);
          
          // Range selection states
          const inRange = isInDisplayRange(day.date);
          const rangeStartDate = isDisplayRangeStart(day.date);
          const rangeEndDate = isDisplayRangeEnd(day.date);
          
          return (
            <div
              key={index}
              onClick={() => handleDateClick(day.date)}
              onMouseEnter={() => handleMouseEnter(day.date)}
              className={`
                min-h-[120px] p-2 border-b border-r border-slate-200 dark:border-slate-700 cursor-pointer
                transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50
                ${!day.isCurrentMonth ? "bg-slate-50/50 dark:bg-slate-900/30" : ""}
                ${isSelectedDate ? "bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 ring-inset" : ""}
                ${inRange && !rangeStartDate && !rangeEndDate ? "bg-yellow-100/50 dark:bg-yellow-900/20" : ""}
                ${holiday ? "bg-red-50/30 dark:bg-red-900/10" : ""}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`
                    text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                    transition-all duration-200
                    ${isTodayDate ? "bg-blue-500 text-white shadow-md" : ""}
                    ${day.isCurrentMonth ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-600"}
                    ${!isTodayDate && "hover:bg-slate-200 dark:hover:bg-slate-700"}
                    ${rangeStartDate || rangeEndDate ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" : ""}
                  `}
                >
                  {day.date.getDate()}
                </span>
                <div className="flex items-center gap-1">
                  {holiday && (
                    <span className="text-[10px] font-medium text-red-500 dark:text-red-400">
                      {holiday.name[language] || holiday.name.en}
                    </span>
                  )}
                  {dayTasks.length > 0 && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      {dayTasks.length}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Holiday badge */}
              {holiday && (
                <div className="mb-1">
                  <HolidayBadge 
                    holiday={holiday} 
                    language={language} 
                    variant="compact" 
                  />
                </div>
              )}
              
              {/* Task badges */}
              <div className="space-y-1.5 overflow-hidden">
                {dayTasks.slice(0, 4).map((task) => {
                  const isStart = isTaskStartDay(task, day.date);
                  const isEnd = isTaskEndDay(task, day.date);
                  const isMiddle = isTaskMiddleDay(task, day.date);
                  const isDeadline = isDeadlineDay(task, day.date);
                  
                  return (
                    <CalendarTaskBar
                      key={task.id}
                      task={task}
                      language={language}
                      isStart={isStart}
                      isEnd={isEnd}
                      isMiddle={isMiddle}
                      isDeadline={isDeadline}
                      onClick={onTaskClick}
                      showTime={true}
                    />
                  );
                })}
                {dayTasks.length > 4 && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 pl-2 cursor-pointer hover:text-blue-500 transition-colors">
                    +{dayTasks.length - 4} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
