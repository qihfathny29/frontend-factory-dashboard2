import React, { useState, useMemo } from "react";

export interface CalendarEvent {
  date: string; // Format: "YYYY-MM-DD"
  type: "critical" | "warning" | "info"; // red, yellow, blue
}

interface DashboardCalendarProps {
  events?: CalendarEvent[];
  colorScheme?: {
    critical: string;
    warning: string;
    safe: string;
    today: string;
    future: string;
  };
}

// Constants
const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const YEAR_RANGE = 10;

// Default color scheme
const DEFAULT_COLOR_SCHEME = {
  critical: "bg-red-500 text-white",
  warning: "bg-yellow-400 text-black",
  safe: "bg-green-500 text-white",
  today: "bg-gray-400 text-white",
  future: "bg-transparent text-black",
};

// Navigation Button Component
interface NavigationButtonProps {
  onClick: () => void;
  direction: "prev" | "next";
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  direction,
}) => (
  <button
    onClick={onClick}
    className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
    aria-label={`${direction === "prev" ? "Previous" : "Next"} month`}
  >
    <svg
      className="w-3 h-3 text-blue-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  </button>
);

// Picker Component
interface PickerProps {
  items: readonly string[] | number[];
  onSelect: (index: number) => void;
  selectedIndex: number;
  show: boolean;
  position: "left" | "center" | "right";
  gridCols?: number;
}

const Picker: React.FC<PickerProps> = ({
  items,
  onSelect,
  selectedIndex,
  show,
  position,
  gridCols = 3,
}) => {
  if (!show) return null;

  const positionClasses = {
    left: "left-0",
    center: "left-1/2 transform -translate-x-1/2",
    right: "right-0",
  };

  const gridColsClasses: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  return (
    <div
      className={`absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 mt-1 ${positionClasses[position]}`}
    >
      <div className={`grid ${gridColsClasses[gridCols] || "grid-cols-3"} gap-1`}>
        {items.map((item, index) => (
          <button
            key={item}
            onClick={() => onSelect(index)}
            className={`px-2 py-1 rounded hover:bg-blue-100 transition-colors text-xs ${
              selectedIndex === index ? "bg-blue-500 text-white" : "bg-gray-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const DashboardCalendar: React.FC<DashboardCalendarProps> = ({
  events = [],
  colorScheme = DEFAULT_COLOR_SCHEME,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getEventForDate = (date: Date): CalendarEvent | undefined => {
    const dateString = formatDate(date);
    return events.find((event) => event.date === dateString);
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const isFutureDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate > today;
  };

  const getDateStatus = (date: Date): { bgColor: string; event?: CalendarEvent } => {
    if (isToday(date)) return { bgColor: colorScheme.today };

    const event = getEventForDate(date);
    if (event) {
      let bgColor = colorScheme.safe;
      switch (event.type) {
        case "critical":
          bgColor = colorScheme.critical;
          break;
        case "warning":
          bgColor = colorScheme.warning;
          break;
        case "info":
          bgColor = "bg-blue-500 text-white";
          break;
      }
      return { bgColor, event };
    }

    if (isFutureDate(date)) return { bgColor: colorScheme.future };
    return { bgColor: colorScheme.safe };
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Add days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentDate]);

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - YEAR_RANGE;
    const endYear = currentYear + YEAR_RANGE;

    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }, []);

  // Handlers
  const navigateMonth = (direction: "prev" | "next") => {
    const monthChange = direction === "prev" ? -1 : 1;
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + monthChange, 1)
    );
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
  };

  const handleYearSelect = (yearIndex: number) => {
    const selectedYear = yearOptions[yearIndex];
    setCurrentDate(new Date(selectedYear, currentDate.getMonth(), 1));
    setShowYearPicker(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 relative h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        {/* Month and Year */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className="text-sm font-semibold hover:bg-gray-100 px-1 py-0.5 rounded transition-colors"
          >
            {MONTH_NAMES[currentDate.getMonth()]}
          </button>
          <button
            onClick={() => setShowYearPicker(!showYearPicker)}
            className="text-sm font-semibold hover:bg-gray-100 px-1 py-0.5 rounded transition-colors"
          >
            {currentDate.getFullYear()}
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <NavigationButton onClick={() => navigateMonth("prev")} direction="prev" />
          <NavigationButton onClick={() => navigateMonth("next")} direction="next" />
        </div>
      </div>

      {/* Month Picker */}
      <Picker
        items={MONTH_NAMES}
        onSelect={handleMonthSelect}
        selectedIndex={currentDate.getMonth()}
        show={showMonthPicker}
        position="center"
        gridCols={3}
      />

      {/* Year Picker */}
      <Picker
        items={yearOptions}
        onSelect={handleYearSelect}
        selectedIndex={yearOptions.indexOf(currentDate.getFullYear())}
        show={showYearPicker}
        position="center"
        gridCols={4}
      />

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5 flex-1">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square"></div>;
          }

          const { bgColor, event } = getDateStatus(date);
          const isCritical = event?.type === "critical";

          return (
            <div key={index} className="aspect-square flex items-center justify-center relative">
              {isCritical ? (
                // Triangle shape for critical events (red)
                <div className="w-full h-full relative flex items-center justify-center">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <polygon
                      points="50,10 90,90 10,90"
                      className="fill-red-500"
                    />
                  </svg>
                  <span className="relative z-10 text-[10px] font-medium text-white">
                    {date.getDate()}
                  </span>
                </div>
              ) : (
                // Regular rounded square for other dates
                <div
                  className={`w-full h-full flex items-center justify-center text-[10px] font-medium rounded ${bgColor}`}
                >
                  {date.getDate()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCalendar;
