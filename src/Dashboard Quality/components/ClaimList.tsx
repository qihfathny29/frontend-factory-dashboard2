import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SafetyPatrolData {
  id: number;
  occur_date: string;
  bu_group: string;
  product: string;
  part_number: string;
  customer: string;
  problem: string;
  accident_name: string;
  place: string;
  accident_category: string;
  injured_person: string;
  damage: string;
  circumstance: string;
  fact_finding: string;
  temporary_action: string;
  permanent_action: string;
  image_id: string;
}

const SafetyPatrolList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSafetyPatrol, setSelectedSafetyPatrol] = useState<SafetyPatrolData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref untuk mengukur tinggi tbody
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10); // nilai sementara, akan dihitung otomatis

  // Dummy data
  const allData: SafetyPatrolData[] = [
    {
      id: 1,
      occur_date: "2 April 2025",
      bu_group: "Radiator",
      product: "Radiator Assy",
      part_number: "17801-0Y060",
      customer: "Toyota",
      problem: "Leakage at joint due to improper torque",
      accident_name: "Leakage Issue",
      place: "Final Inspection",
      accident_category: "Quality Defect",
      injured_person: "None",
      damage: "Part rejected",
      circumstance: "Bolt torque below specification during assembly",
      fact_finding: "Worker skipped torque verification step",
      temporary_action: "100% re-inspection of batch",
      permanent_action: "Implement torque monitoring system + retraining",
      image_id: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    },
    {
      id: 2,
      occur_date: "15 May 2025",
      bu_group: "Engine",
      product: "Oil Pan",
      part_number: "12101-0D040",
      customer: "Daihatsu",
      problem: "Crack on oil pan body",
      accident_name: "Crack Defect",
      place: "Casting Area",
      accident_category: "Manufacturing Defect",
      injured_person: "None",
      damage: "Part scrapped",
      circumstance: "Excessive internal stress from rapid cooling",
      fact_finding: "Cooling process parameter out of control limit",
      temporary_action: "Hold all related lots",
      permanent_action: "Revise cooling parameter + add X-ray inspection",
      image_id: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
    },
    {
      id: 3,
      occur_date: "3 June 2025",
      bu_group: "Welding",
      product: "Bracket Assy",
      part_number: "57001-0K120",
      customer: "Hino",
      problem: "Weld burn-through",
      accident_name: "Welding Defect",
      place: "Welding Line 3",
      accident_category: "Process Issue",
      injured_person: "None",
      damage: "Part rework required",
      circumstance: "Excessive welding current setting",
      fact_finding: "New worker used wrong parameter",
      temporary_action: "Stop line, recheck all units",
      permanent_action: "Add parameter lock + daily audit",
      image_id: "https://images.unsplash.com/photo-1565022531102-1bb67d40d74e?w=400",
    },
    {
      id: 4,
      occur_date: "20 July 2025",
      bu_group: "Logistics",
      product: "Fan Shroud",
      part_number: "16711-0L030",
      customer: "Isuzu",
      problem: "Dent during handling",
      accident_name: "Handling Damage",
      place: "Packing Area",
      accident_category: "Logistics Issue",
      injured_person: "None",
      damage: "Cosmetic dent",
      circumstance: "Dropped during packing process",
      fact_finding: "No proper handling jig used",
      temporary_action: "Re-inspect all packed units",
      permanent_action: "Introduce handling jig + training",
      image_id: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
    },
    {
      id: 5,
      occur_date: "10 August 2025",
      bu_group: "Production",
      product: "Condenser",
      part_number: "88460-0K450",
      customer: "Mitsubishi",
      problem: "Fin damage",
      accident_name: "Fin Damage",
      place: "Assembly Line",
      accident_category: "Assembly Issue",
      injured_person: "None",
      damage: "Fin bent",
      circumstance: "Tool misaligned during insertion",
      fact_finding: "Jig wear not detected",
      temporary_action: "Full inspection of in-process units",
      permanent_action: "Jig replacement cycle + daily check sheet",
      image_id: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
    },
  ];

  // Filter data
  const filteredData = useMemo(() => {
    return allData.filter(
      (item) =>
        item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.part_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bu_group.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Hitung berapa baris yang muat di tinggi tabel
  useEffect(() => {
    const calculateItemsPerPage = () => {
      if (!tableBodyRef.current) return;

      // Tinggi rata-rata 1 baris tabel (px) — bisa disesuaikan kalau kurang pas
      const rowHeight = 42; // 42px sangat pas untuk text-xs + padding
      const containerHeight = tableBodyRef.current.clientHeight || 300;
      const availableHeight = containerHeight - 10; // margin kecil

      const calculated = Math.floor(availableHeight / rowHeight);
      const minRows = 5; // minimal 5 baris biar gak kosong
      setItemsPerPage(Math.max(minRows, calculated));
    };

    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);

    // Hitung ulang saat search berubah (karena tinggi bisa berubah)
    const timeout = setTimeout(calculateItemsPerPage, 100);

    return () => {
      window.removeEventListener("resize", calculateItemsPerPage);
      clearTimeout(timeout);
    };
  }, [searchQuery, filteredData.length]);

  // Pagination dinamis
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const openModal = (item: SafetyPatrolData) => {
    setSelectedSafetyPatrol(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSafetyPatrol(null);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationNumbers = () => {
    const numbers: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) numbers.push(i);
    } else {
      numbers.push(1);
      if (currentPage > 3) numbers.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!numbers.includes(i)) numbers.push(i);
      }
      if (currentPage < totalPages - 2) numbers.push("...");
      numbers.push(totalPages);
    }
    return numbers;
  };

  const getRowClass = (index: number) => {
    const base = "border-b border-gray-200 hover:bg-gray-100 transition-colors";
    return index % 2 === 0 ? `${base} bg-white` : `${base} bg-gray-50`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold">0KM Claim (Count & No Count) List</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search 0KM Claim"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setCurrentPage(1)}
            className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-xs"
          >
            Search
          </button>
        </div>
      </div>

      {/* Tabel dengan tinggi otomatis */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
              <tr>
                <th className="px-2 py-2 text-left font-semibold">No</th>
                <th className="px-2 py-2 text-left font-semibold">Occur Date</th>
                <th className="px-2 py-2 text-left font-semibold">BU Group</th>
                <th className="px-2 py-2 text-left font-semibold">Product</th>
                <th className="px-2 py-2 text-left font-semibold">Part Number</th>
                <th className="px-2 py-2 text-left font-semibold">Customer</th>
                <th className="px-2 py-2 text-left font-semibold">Problem</th>
              </tr>
            </thead>
            <tbody ref={tableBodyRef}>
              {currentData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${getRowClass(index)} cursor-pointer`}
                  onClick={() => openModal(item)}
                >
                  <td className="px-2 py-2">{startIndex + index + 1}</td>
                  <td className="px-2 py-2">{item.occur_date}</td>
                  <td className="px-2 py-2">{item.bu_group}</td>
                  <td className="px-2 py-2">{item.product}</td>
                  <td className="px-2 py-2">{item.part_number}</td>
                  <td className="px-2 py-2">{item.customer}</td>
                  <td className="px-2 py-2">{item.problem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-200 mt-auto">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {getPaginationNumbers().map((num, idx) => {
          const isCurrent = num === currentPage;
          const isEllipsis = num === "...";
          let cls = "px-3 py-1 text-xs rounded ";
          if (isCurrent) cls += "bg-blue-600 text-white font-semibold";
          else if (isEllipsis) cls += "text-gray-400 cursor-default";
          else cls += "text-gray-600 hover:bg-gray-200";

          return (
            <button
              key={`page-${idx}-${num}`}
              onClick={() => typeof num === "number" && goToPage(num)}
              disabled={isEllipsis}
              className={cls}
            >
              {num}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Modal Detail - tetap sama */}
      {isModalOpen && selectedSafetyPatrol && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">0KM Claim Detail</h3>
              <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              <img
                src={selectedSafetyPatrol.image_id}
                alt="Claim Photo"
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs font-semibold text-gray-500 block">Occur Date</span><p className="text-sm">{selectedSafetyPatrol.occur_date}</p></div>
                <div><span className="text-xs font-semibold text-gray-500 block">BU Group</span><p className="text-sm">{selectedSafetyPatrol.bu_group}</p></div>
                <div><span className="text-xs font-semibold text-gray-500 block">Product</span><p className="text-sm">{selectedSafetyPatrol.product}</p></div>
                <div><span className="text-xs font-semibold text-gray-500 block">Part Number</span><p className="text-sm">{selectedSafetyPatrol.part_number}</p></div>
                <div><span className="text-xs font-semibold text-gray-500 block">Customer</span><p className="text-sm">{selectedSafetyPatrol.customer}</p></div>
                <div><span className="text-xs font-semibold text-gray-500 block">Problem</span><p className="text-sm">{selectedSafetyPatrol.problem}</p></div>
              </div>

              <div className="space-y-3">
                <div><span className="text-xs font-semibold text-gray-500 block">Circumstance</span><p className="text-sm bg-gray-50 p-3 rounded">{selectedSafetyPatrol.circumstance}</p></div>
                <div><span className="text-xs font-semibold text-gray-500 block">Fact Finding</span><p className="text-sm bg-gray-50 p-3 rounded">{selectedSafetyPatrol.fact_finding}</p></div>
                <div><span className="text-xs font-semibold text-gray-500 block">Temporary Action</span><p className="text-sm bg-gray-50 p-3 rounded">{selectedSafetyPatrol.temporary_action}</p></div>
                <div><span className="text-xs font-semibold text-gray-500 block">Permanent Action</span><p className="text-sm bg-gray-50 p-3 rounded">{selectedSafetyPatrol.permanent_action}</p></div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyPatrolList;