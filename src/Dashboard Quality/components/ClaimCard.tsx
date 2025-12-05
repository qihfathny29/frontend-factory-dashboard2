import React from "react";

interface Props {
  value: number;
  // TAMBAHKAN PROP INI NANTI:
  // change?: number; // <- selisih dibanding periode sebelumnya (positif = naik, negatif = turun, 0 atau tidak ada = sama)
}

const SeriousAccident: React.FC<Props> = ({ value }) => {
  // === LOGIC DINAMIS YANG BISA DIAKTIFKAN NANTI ===
  // Hapus komentar di bawah ini kalau sudah siap pakai fitur naik/turun
  
  // const change = props.change ?? 0; // default 0 kalau tidak dikirim
  // const isIncrease = change > 0;
  // const isDecrease = change < 0;
  // const arrow = isIncrease ? "▲" : isDecrease ? "▼" : "";
  // const textLabel = isIncrease ? "Increased vs." : isDecrease ? "Decreased vs." : "Same as";
  // const colorClass = isIncrease ? "text-red-500" : isDecrease ? "text-[#34C759]" : "text-blue-500";
  // const displayValue = change === 0 ? "0" : Math.abs(change);

  return (
    <div className="bg-white rounded-lg shadow-md p-2 w-full h-full flex flex-col items-center justify-between text-center">
      <div className="text-black text-xs font-bold">0KM Claim (Official Count)</div>
      <div className="text-4xl font-black text-black leading-none">{value}</div>

      {/* BAGIAN INI YANG AKAN JADI DINAMIS */}
      <div className="flex items-center justify-center space-x-2 w-full">
        <div className="flex flex-col items-center">
          {/* HAPUS KOMENTAR DI BAWAH & GANTI BAGIAN INI KALAU SUDAH SIAP */}
          <span className="text-red-500 text-xs font-bold">▲ 2</span>
          <span className="text-[8px] text-red-500">Increased vs.</span>

          {/* UNCOMMENT INI KALAU SUDAH SIAP FITUR DINAMIS */}
          {/* <span className={`${colorClass} text-xs font-bold`}>
            {arrow} {displayValue}
          </span>
          <span className={`text-[8px] ${colorClass}`}>
            {textLabel}
          </span> */}
        </div>

        <div className="h-6 w-px bg-gray-300"></div>

        {/* Bagian FY'24 biarkan tetap hardcode dulu atau bisa juga dibikin props nanti */}
        <div className="flex flex-col items-center">
          <span className="text-blue-500 text-xs font-bold">0</span>
          <span className="text-[8px] text-blue-500">Fiscal Year '24</span>
        </div>
      </div>
    </div>
  );
};

export default SeriousAccident;