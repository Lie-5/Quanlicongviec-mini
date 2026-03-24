"use client";

import { useState, useEffect, useCallback } from "react";
import { Language } from "../types";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onRangeChange: (start: Date | null, end: Date | null) => void;
  language?: Language;
  minDate?: Date;
  maxDate?: Date;
}

interface HoveredRange {
  start: Date;
  end: Date;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onRangeChange,
  language = "en",
  minDate,
  maxDate,
}: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelecting, setIsSelecting] = useState(false);
  const [hoveredRange, setHoveredRange] = useState<HoveredRange | null>(null);
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get month name based on language
  const getMonthName = (month: number) => {
    const months: Record<Language, string[]> = {
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      vi: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
      zh: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      hi: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
      ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    };
    return months[language]?.[month] || months.en[month];
  };

  // Get weekday names
  const getWeekdays = () => {
    const days: Record<Language, string[]> = {
      en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      vi: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      hi: ["सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "रवि"],
      ja: ["月", "火", "水", "木", "金", "土", "日"],
      fr: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    };
    return days[language] || days.en;
  };

  // Generate calendar days
  const getCalendarDays = useCallback(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    const prevMonth = new Date(year, month, 0);
    for (let i = startDay; i > 0; i--) {
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

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentMonth]);

  // Check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Check if date is in range
  const isInRange = (date: Date, start: Date, end: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const s = new Date(Math.min(start.getTime(), end.getTime()));
    s.setHours(0, 0, 0, 0);
    const e = new Date(Math.max(start.getTime(), end.getTime()));
    e.setHours(0, 0, 0, 0);
    return d >= s && d <= e;
  };

  // Check if date is start or end of range
  const isRangeStart = (date: Date, start: Date | null) => {
    return startDate && isSameDay(date, startDate);
  };

  const isRangeEnd = (date: Date) => {
    return endDate && isSameDay(date, endDate);
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;

    if (!isSelecting) {
      // Start new selection
      setSelectionStart(date);
      setIsSelecting(true);
      onRangeChange(date, null);
    } else {
      // Complete selection
      if (selectionStart) {
        const start = date < selectionStart ? date : selectionStart;
        const end = date < selectionStart ? selectionStart : date;
        onRangeChange(start, end);
      } else {
        onRangeChange(date, date);
      }
      setIsSelecting(false);
      setSelectionStart(null);
      setHoveredRange(null);
    }
  };

  // Handle mouse enter during selection
  const handleMouseEnter = (date: Date) => {
    if (isSelecting && selectionStart) {
      setHoveredRange({
        start: selectionStart,
        end: date,
      });
    }
  };

  // Clear selection
  const clearSelection = () => {
    setIsSelecting(false);
    setSelectionStart(null);
    setHoveredRange(null);
    onRangeChange(null, null);
  };

  // Navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSelecting) {
        clearSelection();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSelecting]);

  const weekdays = getWeekdays();
  const calendarDays = getCalendarDays();

  // Calculate display range for hover/preview
  const displayStart = hoveredRange ? 
    (hoveredRange.start < hoveredRange.end ? hoveredRange.start : hoveredRange.end) :
    (startDate || null);
  const displayEnd = hoveredRange ?
    (hoveredRange.start < hoveredRange.end ? hoveredRange.end : hoveredRange.start) :
    (endDate || (startDate && !isSelecting ? startDate : null));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
          >
            {language === "vi" ? "Hôm nay" : language === "zh" ? "今天" : language === "ja" ? "今日" : "Today"}
          </button>
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {getMonthName(currentMonth.getMonth())} {currentMonth.getFullYear()}
          </span>
        </div>

        {(startDate || isSelecting) && (
          <button
            onClick={clearSelection}
            className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
          >
            {language === "vi" ? "Xóa" : language === "zh" ? "清除" : "Clear"}
          </button>
        )}
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700">
        {weekdays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div 
        className="grid grid-cols-7 select-none"
        onMouseLeave={() => {
          if (isSelecting) {
            // Keep hover until mouse up
          }
        }}
      >
        {calendarDays.map((day, index) => {
          const dateStr = day.date.toISOString().split("T")[0];
          const isTodayDate = isSameDay(day.date, today);
          
          // Determine if this date is in the selection range
          let isInSelectionRange = false;
          let isStartOfRange = false;
          let isEndOfRange = false;

          if (hoveredRange) {
            isInSelectionRange = isInRange(day.date, hoveredRange.start, hoveredRange.end);
            isStartOfRange = isSameDay(day.date, hoveredRange.start < hoveredRange.end ? hoveredRange.start : hoveredRange.end);
            isEndOfRange = isSameDay(day.date, hoveredRange.start < hoveredRange.end ? hoveredRange.end : hoveredRange.start);
          } else if (startDate && endDate) {
            isInSelectionRange = isInRange(day.date, startDate, endDate);
            isStartOfRange = isSameDay(day.date, startDate);
            isEndOfRange = isSameDay(day.date, endDate);
          } else if (startDate && isSelecting) {
            isInSelectionRange = isInRange(day.date, startDate, startDate);
            isStartOfRange = isSameDay(day.date, startDate);
            isEndOfRange = isSameDay(day.date, startDate);
          } else if (startDate) {
            isInSelectionRange = isSameDay(day.date, startDate);
            isStartOfRange = isSameDay(day.date, startDate);
            isEndOfRange = isSameDay(day.date, startDate);
          }

          const isPast = day.date < today && !isTodayDate;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day.date)}
              onMouseEnter={() => handleMouseEnter(day.date)}
              className={`
                relative h-14 p-1 cursor-pointer transition-all duration-150
                border-r border-b border-slate-100 dark:border-slate-700
                ${!day.isCurrentMonth ? "bg-slate-50 dark:bg-slate-900/50" : ""}
                ${isTodayDate ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                ${isInSelectionRange && !isStartOfRange && !isEndOfRange ? "bg-yellow-100 dark:bg-yellow-900/30" : ""}
                hover:bg-slate-50 dark:hover:bg-slate-700/50
              `}
            >
              {/* Day number */}
              <div
                className={`
                  w-7 h-7 flex items-center justify-center text-sm font-medium rounded-full
                  transition-all duration-200
                  ${isTodayDate 
                    ? "bg-blue-500 text-white shadow-md ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-800" 
                    : isTodayDate ? "" : ""
                  }
                  ${isStartOfRange || isEndOfRange 
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md" 
                    : ""
                  }
                  ${!day.isCurrentMonth ? "text-slate-400 dark:text-slate-600" : "text-slate-700 dark:text-slate-300"}
                  ${isPast && !isTodayDate ? "text-slate-400 dark:text-slate-600" : ""}
                  ${!isStartOfRange && !isEndOfRange && !isTodayDate && "hover:bg-slate-200 dark:hover:bg-slate-600"}
                `}
              >
                {day.date.getDate()}
              </div>

              {/* Selection indicator */}
              {(isStartOfRange || isEndOfRange) && (
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500" />
              )}
            </div>
          );
        })}
      </div>

      {/* Selection info */}
      {(startDate || isSelecting) && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {language === "vi" ? "Chọn ngày: " : "Select: "}
            {displayStart && (
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {displayStart.toLocaleDateString(language === "vi" ? "vi-VN" : language === "zh" ? "zh-CN" : "en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
            {displayEnd && !isSameDay(displayStart as Date, displayEnd) && (
              <>
                <span className="mx-2 text-slate-400">→</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {displayEnd.toLocaleDateString(language === "vi" ? "vi-VN" : language === "zh" ? "zh-CN" : "en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
            {!isSelecting && startDate && !endDate && (
              <span className="text-blue-500 ml-2">
                ({language === "vi" ? "Nhấp ngày kết thúc" : "Click end date"})
              </span>
            )}
            {isSelecting && (
              <span className="text-blue-500 ml-2">
                ({language === "vi" ? "Đang chọn..." : "Selecting..."})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
