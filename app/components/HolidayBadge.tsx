"use client";

import { Language } from "../types";

// Static holiday data - can be extended with more countries
export interface Holiday {
  date: string; // YYYY-MM-DD format
  name: Record<Language, string>;
  type: "public" | "observance" | "national";
}

// Vietnamese holidays
export const VIETNAM_HOLIDAYS: Holiday[] = [
  {
    date: "2026-01-01",
    name: {
      en: "New Year's Day",
      vi: "Tết Dương lịch",
      zh: "元旦",
      hi: "नव वर्ष दिवस",
      ja: "元日",
      fr: "Nouvel An",
    },
    type: "public",
  },
  {
    date: "2026-02-01",
    name: {
      en: "Vietnamese New Year's Eve",
      vi: "Giao thừa Tết Nguyên đán",
      zh: "除夕",
      hi: "विआनमी पूर्व संध्या",
      ja: "大晦日",
      fr: "Réveillon du Nouvel An lunaire",
    },
    type: "public",
  },
  {
    date: "2026-02-02",
    name: {
      en: "Vietnamese New Year (Tet)",
      vi: "Tết Nguyên đán",
      zh: "春节",
      hi: "विआनमी",
      ja: "春節",
      fr: "Nouvel An lunaire vietnamien",
    },
    type: "public",
  },
  {
    date: "2026-02-03",
    name: {
      en: "Second day of Tet",
      vi: "Mùng 2 Tết",
      zh: "大年初二",
      hi: "विआनमी द्वितीय दिवस",
      ja: "春節2日目",
      fr: "Deuxième jour du Nouvel An lunaire",
    },
    type: "public",
  },
  {
    date: "2026-02-04",
    name: {
      en: "Third day of Tet",
      vi: "Mùng 3 Tết",
      zh: "大年初三",
      hi: "विआनमी तृतीय दिवस",
      ja: "春節3日目",
      fr: "Troisième jour du Nouvel An lunaire",
    },
    type: "public",
  },
  {
    date: "2026-04-14",
    name: {
      en: "Hung Kings Commemoration Day",
      vi: "Giỗ Tổ Hùng Vương",
      zh: "雄王祭",
      hi: "हंग किंग स्मृति दिवस",
      ja: "フン王記念日",
      fr: "Commemoration des Rois Hùng",
    },
    type: "public",
  },
  {
    date: "2026-04-21",
    name: {
      en: "Vietnam Liberation Day",
      vi: "Giải phóng miền Nam",
      zh: "越南南方解放日",
      hi: "विआतनम मुक्ति दिवस",
      ja: "越南解放記念日",
      fr: "Jour de la libération du Sud",
    },
    type: "public",
  },
  {
    date: "2026-04-30",
    name: {
      en: "Reunification Day",
      vi: "Ngày Thống nhất",
      zh: "统一日",
      hi: "एकीकरण दिवस",
      ja: "統一記念日",
      fr: "Jour de la réunification",
    },
    type: "public",
  },
  {
    date: "2026-05-01",
    name: {
      en: "International Labor Day",
      vi: "Ngày Quốc tế Lao động",
      zh: "劳动节",
      hi: "अंतर्राष्ट्रीय श्रमिक दिवस",
      ja: "労働者の日",
      fr: "Fête du Travail",
    },
    type: "public",
  },
  {
    date: "2026-09-02",
    name: {
      en: "National Day",
      vi: "Quốc khánh",
      zh: "国庆日",
      hi: "राष्ट्रीय दिवस",
      ja: "国庆日",
      fr: "Fête nationale",
    },
    type: "public",
  },
  {
    date: "2026-10-20",
    name: {
      en: "Vietnamese Women's Day",
      vi: "Ngày Phụ nữ Việt Nam",
      zh: "越南妇女节",
      hi: "विआतनम महिला दिवस",
      ja: "ベトナム女性の日",
      fr: "Fête des femmes vietnamiennes",
    },
    type: "observance",
  },
  {
    date: "2026-11-20",
    name: {
      en: "Teacher's Day",
      vi: "Ngày Nhà giáo Việt Nam",
      zh: "教师节",
      hi: "शिक्षक दिवस",
      ja: "先生の日",
      fr: "Fête des enseignants",
    },
    type: "observance",
  },
  {
    date: "2026-12-24",
    name: {
      en: "Christmas Eve",
      vi: "Đêm Giáng sinh",
      zh: "平安夜",
      hi: "क्रिसमस ईव",
      ja: "クリスマス・イブ",
      fr: "Réveillon de Noël",
    },
    type: "observance",
  },
  {
    date: "2026-12-25",
    name: {
      en: "Christmas Day",
      vi: "Giáng sinh",
      zh: "圣诞节",
      hi: "क्रिसमस",
      ja: "クリスマス",
      fr: "Noël",
    },
    type: "observance",
  },
];

// US holidays (common)
export const US_HOLIDAYS: Holiday[] = [
  {
    date: "2026-01-01",
    name: {
      en: "New Year's Day",
      vi: "Tết Dương lịch",
      zh: "元旦",
      hi: "नव वर्ष दिवस",
      ja: "元日",
      fr: "Nouvel An",
    },
    type: "public",
  },
  {
    date: "2026-01-19",
    name: {
      en: "Martin Luther King Jr. Day",
      vi: "Ngày Martin Luther King Jr.",
      zh: "马丁·路德·金纪念日",
      hi: "मार्टिन लूथर किंग जूनियर दिवस",
      ja: "马丁・ルーサー・キング・ジュニア・デー",
      fr: "Jour de Martin Luther King",
    },
    type: "public",
  },
  {
    date: "2026-02-16",
    name: {
      en: "Presidents' Day",
      vi: "Ngày Tổng thống",
      zh: "总统日",
      hi: "राष्ट्रपति दिवस",
      ja: "大統領の日",
      fr: "Jour des Présidents",
    },
    type: "public",
  },
  {
    date: "2026-05-25",
    name: {
      en: "Memorial Day",
      vi: "Ngày Tưởng niệm",
      zh: "阵亡将士纪念日",
      hi: "स्मृति दिवस",
      ja: "戦没将兵記念日",
      fr: "Jour du Souvenir",
    },
    type: "public",
  },
  {
    date: "2026-07-04",
    name: {
      en: "Independence Day",
      vi: "Ngày Độc lập",
      zh: "独立日",
      hi: "स्वतंत्रता दिवस",
      ja: "独立記念日",
      fr: "Fête nationale",
    },
    type: "public",
  },
  {
    date: "2026-09-07",
    name: {
      en: "Labor Day",
      vi: "Ngày Lao động",
      zh: "劳动节",
      hi: "श्रमिक दिवस",
      ja: "労働者の日",
      fr: "Fête du Travail",
    },
    type: "public",
  },
  {
    date: "2026-10-12",
    name: {
      en: "Columbus Day",
      vi: "Ngày Columbus",
      zh: "哥伦布日",
      hi: "कोलंबस दिवस",
      ja: "コロンブス・デー",
      fr: "Jour de Colomb",
    },
    type: "observance",
  },
  {
    date: "2026-11-11",
    name: {
      en: "Veterans Day",
      vi: "Ngày Cựu chiến binh",
      zh: "退伍军人节",
      hi: "वeterans दिवस",
      ja: "退役軍人の日",
      fr: "Jour des anciens combattants",
    },
    type: "public",
  },
  {
    date: "2026-11-26",
    name: {
      en: "Thanksgiving",
      vi: "Lễ Tạ ơn",
      zh: "感恩节",
      hi: "धन्यवाद दिवस",
      ja: "感謝祭",
      fr: "Action de grâce",
    },
    type: "public",
  },
  {
    date: "2026-12-25",
    name: {
      en: "Christmas Day",
      vi: "Giáng sinh",
      zh: "圣诞节",
      hi: "क्रिसमस",
      ja: "クリスマス",
      fr: "Noël",
    },
    type: "public",
  },
];

interface HolidayBadgeProps {
  holiday: Holiday;
  language: Language;
  variant?: "default" | "compact" | "inline";
  onClick?: () => void;
}

export function HolidayBadge({ holiday, language, variant = "default", onClick }: HolidayBadgeProps) {
  const name = holiday.name[language] || holiday.name.en;
  const isPublic = holiday.type === "public";

  if (variant === "compact") {
    return (
      <div
        onClick={onClick}
        className={`
          inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium
          cursor-pointer transition-all duration-200 hover:scale-105
          ${isPublic 
            ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400" 
            : "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400"
          }
          ${onClick ? "hover:shadow-sm" : ""}
        `}
      >
        <span className="w-1 h-1 rounded-full bg-current" />
        <span className="truncate max-w-[60px]">{name}</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span
        onClick={onClick}
        className={`
          inline-block px-1.5 py-0.5 rounded text-xs font-medium
          ${isPublic 
            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" 
            : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
          }
          ${onClick ? "cursor-pointer hover:shadow-sm" : ""}
        `}
      >
        {name}
      </span>
    );
  }

  // Default variant
  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col gap-0.5 p-1.5 rounded-lg border transition-all duration-200
        ${isPublic 
          ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20" 
          : "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20"
        }
        ${onClick ? "cursor-pointer hover:shadow-md hover:scale-[1.02]" : ""}
      `}
    >
      <div className="flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full ${isPublic ? "bg-red-500" : "bg-orange-500"}`} />
        <span className={`text-xs font-semibold truncate ${isPublic ? "text-red-700 dark:text-red-400" : "text-orange-700 dark:text-orange-400"}`}>
          {name}
        </span>
      </div>
    </div>
  );
}

// Hook to get holidays for a specific date
export function useHolidays(language: Language, country: "vn" | "us" = "vn") {
  const holidays = country === "vn" ? VIETNAM_HOLIDAYS : US_HOLIDAYS;

  const getHolidayForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return holidays.find(h => h.date === dateStr);
  };

  const getHolidaysForMonth = (year: number, month: number) => {
    return holidays.filter(h => {
      const [hYear, hMonth] = h.date.split("-").map(Number);
      return hYear === year && hMonth === month + 1;
    });
  };

  const isHoliday = (date: Date) => {
    return getHolidayForDate(date) !== undefined;
  };

  return {
    holidays,
    getHolidayForDate,
    getHolidaysForMonth,
    isHoliday,
  };
}

export default HolidayBadge;
