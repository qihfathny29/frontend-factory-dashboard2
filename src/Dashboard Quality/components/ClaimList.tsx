import React, { useState, useMemo } from "react";
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

// Dummy data (moved outside component)
const SAFETY_PATROL_DATA: SafetyPatrolData[] = [
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

// Constants
const ITEMS_PER_PAGE = 5;
const SEARCH_FIELDS = ['problem', 'part_number', 'customer', 'product', 'bu_group'] as const;

// Helper functions
const getRowClass = (index: number): string =>
  `border-b border-gray-200 hover:bg-gray-100 transition-colors ${
    index % 2 === 0 ? "bg-white" : "bg-gray-50"
  }`;

const getPaginationNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    
    if (currentPage < totalPages - 2) pages.push("...");
    if (!pages.includes(totalPages)) pages.push(totalPages);
  }
  
  return pages;
};

// Modal Component
interface ModalProps {
  data: SafetyPatrolData;
  onClose: () => void;
}

const DetailModal: React.FC<ModalProps> = ({ data, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      {/* Modal Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold">0KM Claim Detail</h3>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Body */}
      <div className="px-6 py-4 space-y-5">
        <img
          src={data.image_id}
          alt="Claim evidence"
          className="w-full h-64 object-cover rounded-lg border"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <DetailField label="Occur Date" value={data.occur_date} />
          <DetailField label="BU Group" value={data.bu_group} />
          <DetailField label="Product" value={data.product} />
          <DetailField label="Part Number" value={data.part_number} />
          <DetailField label="Customer" value={data.customer} />
          <DetailField label="Problem" value={data.problem} />
        </div>

        <DetailSection label="Circumstance" value={data.circumstance} />
        <DetailSection label="Fact Finding" value={data.fact_finding} />
        <DetailSection label="Temporary Action" value={data.temporary_action} />
        <DetailSection label="Permanent Action" value={data.permanent_action} />
      </div>

      {/* Modal Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

// Reusable Detail Field Component
interface DetailFieldProps {
  label: string;
  value: string;
}

const DetailField: React.FC<DetailFieldProps> = ({ label, value }) => (
  <div>
    <span className="text-xs font-semibold text-gray-500">{label}</span>
    <p>{value}</p>
  </div>
);

// Reusable Detail Section Component
interface DetailSectionProps {
  label: string;
  value: string;
}

const DetailSection: React.FC<DetailSectionProps> = ({ label, value }) => (
  <div>
    <span className="text-xs font-semibold text-gray-500 block mb-1">{label}</span>
    <p className="bg-gray-50 p-3 rounded">{value}</p>
  </div>
);

// Search Input Component
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
    />
  </div>
);

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const paginationNumbers = getPaginationNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-1 pt-3 border-t border-gray-200">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {paginationNumbers.map((num, i) => (
        <button
          key={`${num}-${i}`}
          onClick={() => typeof num === "number" && onPageChange(num)}
          disabled={num === "..."}
          className={`px-3 py-1 text-xs rounded ${
            num === currentPage
              ? "bg-blue-600 text-white font-semibold"
              : num === "..."
              ? "text-gray-400 cursor-default"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

// Main Component
const SafetyPatrolList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSafetyPatrol, setSelectedSafetyPatrol] = useState<SafetyPatrolData | null>(null);

  // Filter data berdasarkan search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return SAFETY_PATROL_DATA;
    
    const query = searchQuery.toLowerCase();
    return SAFETY_PATROL_DATA.filter((item) =>
      SEARCH_FIELDS.some((field) => 
        item[field].toLowerCase().includes(query)
      )
    );
  }, [searchQuery]);

  // Pagination data
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset ke halaman 1 saat search
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openModal = (item: SafetyPatrolData) => {
    setSelectedSafetyPatrol(item);
  };

  const closeModal = () => {
    setSelectedSafetyPatrol(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold">0KM Claim (Count & No Count) List</h2>
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search 0KM Claim..."
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
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
          <tbody>
            {currentData.map((item, idx) => {
              const rowIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx;
              
              return (
                <tr
                  key={item.id}
                  className={`${getRowClass(idx)} cursor-pointer`}
                  onClick={() => openModal(item)}
                >
                  <td className="px-2 py-2">{rowIndex + 1}</td>
                  <td className="px-2 py-2">{item.occur_date}</td>
                  <td className="px-2 py-2">{item.bu_group}</td>
                  <td className="px-2 py-2">{item.product}</td>
                  <td className="px-2 py-2">{item.part_number}</td>
                  <td className="px-2 py-2">{item.customer}</td>
                  <td className="px-2 py-2">{item.problem}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal */}
      {selectedSafetyPatrol && (
        <DetailModal
          data={selectedSafetyPatrol}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default SafetyPatrolList;
