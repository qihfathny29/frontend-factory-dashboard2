import React, { useState } from "react";

interface CalendarProps {
  accidentDates?: string[]; // Tanggal Merah (Accident)
  warningDates?: string[]; // Tanggal Kuning (Subcount, Near Miss, Smoke, Fire, Traffic)
}

const Calender: React.FC<CalendarProps> = ({
  accidentDates = [],
  warningDates = [],
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
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

  // Helper: Cek apakah tanggal ada di daftar Merah
  const isAccidentDate = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0];
    return accidentDates.includes(dateString);
  };

  // Helper: Cek apakah tanggal ada di daftar Kuning
  const isWarningDate = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0];
    return warningDates.includes(dateString);
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // TAMBAH FUNGSI INI:
  const isFutureDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset jam ke 00:00 biar perbandingan tanggal saja
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate > today;
  };

  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    const days: (Date | null)[] = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
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

  // LOGIKA WARNA BARU DISINI:
  const getDateStyles = (date: Date): { bg: string; text: string } => {
    // 1. Prioritas Utama: Hari Ini (Abu-abu)
    if (isToday(date)) {
      return { bg: "bg-gray-400", text: "text-white" };
    }

    // 2. BARU: Tanggal Masa Depan (Putih dengan text hitam)
    if (isFutureDate(date)) {
      return { bg: "bg-white border border-gray-200", text: "text-black" };
    }

    // 3. Prioritas Kedua: Accident (Merah) - hanya untuk tanggal yang sudah lewat
    if (isAccidentDate(date)) {
      return { bg: "bg-red-500", text: "text-white" };
    }

    // 4. Prioritas Ketiga: Warning/Other Incidents (Kuning)
    if (isWarningDate(date)) {
      return { bg: "bg-yellow-400", text: "text-black" };
    }

    // 5. Default: Aman (Hijau) - untuk tanggal yang sudah lewat dan aman
    return { bg: "bg-green-500", text: "text-white" };
  };

  const calendarDays = getCalendarDays();
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: 21 },
    (_, i) => currentYear - 10 + i
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-2 relative h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        {/* Month and Year - PINDAH KE KIRI */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className="text-sm font-semibold hover:bg-gray-100 px-1 py-0.5 rounded transition-colors"
          >
            {monthNames[currentDate.getMonth()]}
          </button>
          <button
            onClick={() => setShowYearPicker(!showYearPicker)}
            className="text-sm font-semibold hover:bg-gray-100 px-1 py-0.5 rounded transition-colors"
          >
            {currentDate.getFullYear()}
          </button>
        </div>

        {/* Navigation Buttons - PINDAH KE KANAN & KASIH STYLING BUTTON */}
        <div className="flex items-center gap-1">
          <button
            onClick={goToPreviousMonth}
            className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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
            className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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
        <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 mt-1 left-1/2 transform -translate-x-1/2 w-64">
          <div className="grid grid-cols-3 gap-2">
            {monthNames.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthSelect(index)}
                className={`px-1 py-1 rounded hover:bg-blue-100 transition-colors text-xs ${
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
        <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 mt-1 left-1/2 transform -translate-x-1/2 w-48 max-h-48 overflow-y-auto">
          <div className="grid grid-cols-3 gap-1">
            {yearOptions.map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`px-2 py-1 rounded hover:bg-blue-100 transition-colors text-xs ${
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
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-semibold text-gray-600 py-0.5"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5 flex-1 overflow-y-auto">
        {calendarDays.map((date, index) => {
          const isRedAccident = date && isAccidentDate(date) && !isToday(date);
          const dateStyles = date ? getDateStyles(date) : { bg: "", text: "" };

          return (
            <div
              key={date ? date.toISOString() : `empty-${index}`}
              className="aspect-square"
            >
              {date ? (
                <button
                  style={
                    isRedAccident
                      ? { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }
                      : {}
                  }
                  className={`w-full h-full flex justify-center text-[10px] font-medium transition-all hover:opacity-80 
                    ${dateStyles.bg} 
                    ${dateStyles.text}
                    ${
                      isRedAccident
                        ? "items-end pb-0.5"
                        : "items-center rounded"
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calender;
