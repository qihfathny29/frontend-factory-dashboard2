import React, { useState, useMemo } from "react";

interface CalendarProps {
  claimDates?: string[];
}

// Constants
const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
] as const;

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const YEAR_RANGE = 10;

// Navigation Button Component (Moved outside)
interface NavigationButtonProps {
  onClick: () => void;
  direction: 'prev' | 'next';
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
    aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} month`}
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
        d={direction === 'prev' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  </button>
);

// Picker Component (Moved outside)
interface PickerProps {
  items: readonly string[] | number[];
  onSelect: (index: number) => void;
  selectedIndex: number;
  show: boolean;
  position: 'left' | 'center' | 'right';
  gridCols?: number;
}

const Picker: React.FC<PickerProps> = ({ 
  items, 
  onSelect, 
  selectedIndex, 
  show, 
  position, 
  gridCols = 3 
}) => {
  if (!show) return null;

  const positionClasses = {
    left: "left-0",
    center: "left-1/2 transform -translate-x-1/2",
    right: "right-0"
  };

  const gridColsClasses: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div className={`absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 mt-1 ${positionClasses[position]}`}>
      <div className={`grid ${gridColsClasses[gridCols] || 'grid-cols-3'} gap-1`}>
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

const Calendar: React.FC<CalendarProps> = ({ claimDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  /**
   * Format tanggal ke string YYYY-MM-DD
   */
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * Cek apakah tanggal ada klaim
   */
  const isClaimDate = (date: Date): boolean => {
    return claimDates.includes(formatDate(date));
  };

  /**
   * Cek apakah tanggal adalah hari ini
   */
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  /**
   * Cek apakah tanggal di masa depan
   */
  const isFutureDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate > today;
  };

  /**
   * Dapatkan warna background berdasarkan kondisi tanggal
   */
  const getDateBgColor = (date: Date): string => {
    if (isToday(date)) return "bg-gray-400 text-white";
    if (isClaimDate(date)) return "bg-red-500 text-white";
    if (isFutureDate(date)) return "bg-transparent text-black";
    return "bg-green-500 text-white";
  };

  /**
   * Generate array hari dalam bulan saat ini
   */
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    // Tambah hari kosong untuk awal bulan
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    
    // Tambah hari dalam bulan
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  }, [currentDate]);

  /**
   * Generate pilihan tahun
   */
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - YEAR_RANGE;
    const endYear = currentYear + YEAR_RANGE;
    
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
  }, []);

  // Handlers
  const navigateMonth = (direction: 'prev' | 'next') => {
    const monthChange = direction === 'prev' ? -1 : 1;
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + monthChange, 1)
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

  return (
    <div className="bg-white rounded-lg shadow-md p-2 relative h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        {/* Month and Year Selectors */}
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
          <NavigationButton onClick={() => navigateMonth('prev')} direction="prev" />
          <NavigationButton onClick={() => navigateMonth('next')} direction="next" />
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
        onSelect={(index) => handleYearSelect(yearOptions[index])}
        selectedIndex={yearOptions.indexOf(currentDate.getFullYear())}
        show={showYearPicker}
        position="center"
        gridCols={3}
      />

      {/* Day Names Header */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAY_NAMES.map((day) => (
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
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const isRedClaim = isClaimDate(date) && !isToday(date);
          const bgColor = getDateBgColor(date);

          return (
            <div key={formatDate(date)} className="aspect-square">
              <button
                style={isRedClaim ? { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" } : {}}
                className={`w-full h-full flex justify-center text-[10px] font-medium transition-all hover:opacity-80 
                  ${bgColor} 
                  ${isRedClaim ? "items-end pb-0.5" : "items-center rounded"}
                `}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
