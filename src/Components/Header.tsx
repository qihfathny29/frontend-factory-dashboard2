import { useState, useEffect } from "react";
import image from "./../assets/Live.png";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  activeTab?: string;
}

export const Header = ({ activeTab }: HeaderProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const dateStr = date.toLocaleDateString("en-US", options);
    const timeStr = date.toLocaleTimeString("en-US", { hour12: false });
    return `${dateStr}, ${timeStr}`;
  };

  return (
    <div className="w-full min-h-[50px] sm:min-h-[60px] px-3 sm:px-6 py-2 bg-[#EEE9E5]">
      <div className="flex items-center justify-between gap-2 sm:gap-3 w-full h-full">
        {/* Live Button with Icon */}
        <button className="flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 bg-[var(--colors-accents-red)] rounded hover:opacity-90 transition-opacity flex-shrink-0">
          <div className="relative w-4 h-4 sm:w-5 sm:h-5">
            <img
              className="w-full h-full object-contain"
              alt="Live indicator"
              src={image}
            />
          </div>
          <span className="font-semibold text-white text-xs sm:text-sm whitespace-nowrap">
            Live
          </span>
        </button>

        {activeTab === "Mfg.Capability" && (
          <div className="flex items-center gap-1 ml-2">
            <div className="p-1.5 rounded-md bg-gray-200 text-gray-500">
              <Sun className="w-5 h-5" />
            </div>
            <div className="p-1.5 rounded-md bg-[#1864ab] text-white">
              <Moon className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Asaichi Title */}
        <div className="font-bold text-[#1864ab] text-lg sm:text-xl whitespace-nowrap flex-shrink-0">
          Asaichi
        </div>

        {/* Divider Line */}
        <div className="flex-1 h-0.5 bg-[#1864ab] min-w-[20px]" />

        {/* Date and Time */}
        <p className="font-bold text-[#1864ab] text-xs sm:text-sm lg:text-base whitespace-nowrap">
          {formatDateTime(currentDateTime)}
        </p>
      </div>
    </div>
  );
};
