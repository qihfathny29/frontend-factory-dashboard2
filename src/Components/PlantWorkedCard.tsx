import React from "react";

interface PlantWorkedCardProps {
  lastAccidentDate: Date;
  contextText: string;
}

/**
 * Shared PlantWorkedCard Component
 * Displays the number of days a plant has worked without an incident
 * Used across Safety and Quality dashboards
 */
const PlantWorkedCard: React.FC<PlantWorkedCardProps> = ({ 
  lastAccidentDate, 
  contextText 
}) => {
  const today = new Date();

  // Calculate difference in days
  const diffTime = Math.abs(today.getTime() - lastAccidentDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const formattedDate = lastAccidentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-center text-center">
      {/* Header Text */}
      <div className="text-black text-xs font-bold mb-1">
        This Plant has Worked
      </div>

      {/* Main Number */}
      <div className="text-5xl font-black text-black leading-none mb-1">
        {diffDays}
      </div>

      {/* Subtitle */}
      <div className="text-black text-sm font-bold mb-1">Days</div>

      {/* Description */}
      <div className="text-black text-xs font-bold mb-2">
        Without {contextText}
      </div>

      {/* Footer Section */}
      <div className="space-y-0.5">
        {/* Text italic */}
        <div className="text-red-500 text-[10px] italic font-normal">
          Last accident occurred on
        </div>
        {/* Date box */}
        <div className="inline-block border border-red-500 text-red-500 px-2 py-0.5 rounded text-xs font-bold">
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default PlantWorkedCard;
