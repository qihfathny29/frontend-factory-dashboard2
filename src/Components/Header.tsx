import { useState, useEffect } from "react";
import image from "./../assets/Live.png";

export const Header = () => {
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
    <div className="w-full h-[60px] px-6 py-2 bg-[#EEE9E5]">
      <div className="flex items-center justify-between gap-3 w-full h-full">
        {/* Live Button with Icon */}
        <button className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-[var(--colors-accents-red)] rounded-lg hover:opacity-90 transition-opacity flex-shrink-0">
          <div className="relative w-5 h-5">
            <img
              className="w-full h-full object-contain"
              alt="Live indicator"
              src={image}
            />
          </div>
          <span className="font-semibold text-white text-sm whitespace-nowrap">
            Live
          </span>
        </button>

        {/* Asaichi Title */}
        <div className="font-bold text-[#1864ab] text-xl whitespace-nowrap flex-shrink-0">
          Asaichi
        </div>

        {/* Divider Line */}
        <div className="flex-1 h-0.5 bg-[#1864ab]" />

        {/* Date and Time */}
        <p className="font-bold text-[#1864ab] text-sm lg:text-base whitespace-nowrap">
          {formatDateTime(currentDateTime)}
        </p>
      </div>
    </div>
  );
};
