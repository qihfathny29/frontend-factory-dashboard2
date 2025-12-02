import React, { useState } from "react";

interface CalendarProps {
  problemDates?: string[]; // Format: "YYYY-MM-DD"
}

const Calender: React.FC<CalendarProps> = ({ problemDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const monthNames = [
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
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper function to check if a date has problems
  const hasProblems = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0];
    return problemDates.includes(dateString);
  };

  // Helper function to check if it's today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Helper function to check if date is selected
  const isSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Get calendar days for the current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearPicker(false);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Get background color for a date
  const getDateBgColor = (date: Date): string => {
    if (isSelected(date) || isToday(date)) {
      return "bg-gray-400";
    }
    if (hasProblems(date)) {
      return "bg-red-500";
    }
    return "bg-green-500";
  };

  const calendarDays = getCalendarDays();

  // Generate year options (current year ± 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: 21 },
    (_, i) => currentYear - 10 + i
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* Month and Year - PINDAH KE KIRI */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className="text-base font-semibold hover:bg-gray-100 px-2 py-1 rounded transition-colors"
          >
            {monthNames[currentDate.getMonth()]}
          </button>
          <button
            onClick={() => setShowYearPicker(!showYearPicker)}
            className="text-base font-semibold hover:bg-gray-100 px-2 py-1 rounded transition-colors"
          >
            {currentDate.getFullYear()}
          </button>
        </div>

        {/* Navigation Buttons - PINDAH KE KANAN & KASIH STYLING BUTTON */}
        <div className="flex items-center gap-1">
          <button
            onClick={goToPreviousMonth}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNextMonth}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Month Picker Popup */}
      {showMonthPicker && (
        <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2 left-1/2 transform -translate-x-1/2 w-64">
          <div className="grid grid-cols-3 gap-2">
            {monthNames.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthSelect(index)}
                className={`px-3 py-2 rounded hover:bg-blue-100 transition-colors text-sm ${
                  currentDate.getMonth() === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Year Picker Popup */}
      {showYearPicker && (
        <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2 left-1/2 transform -translate-x-1/2 w-64 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-3 gap-2">
            {yearOptions.map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`px-3 py-2 rounded hover:bg-blue-100 transition-colors text-sm ${
                  currentDate.getFullYear() === year
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-600 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => (
          <div
            key={date ? date.toISOString() : `empty-${index}`}
            className="aspect-square"
          >
            {date ? (
              <button
                onClick={() => handleDateClick(date)}
                className={`w-full h-full flex items-center justify-center rounded text-white text-xs font-medium transition-all hover:opacity-80 ${getDateBgColor(
                  date
                )}`}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;
