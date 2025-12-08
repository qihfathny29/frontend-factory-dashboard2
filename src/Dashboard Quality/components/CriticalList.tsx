import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

interface CriticalProblemData {
  id: number;
  date: string;
  part_name: string;
  dnia_pn: string;
  customer: string;
  cust_pn: string;
  car_model: string;
  country: string;
  mis: string;
  problem_description: string;
  severity: string;
  status: string;
  countermeasure: string;
  root_cause: string;
  image_id: string;
}

const CRITICAL_PROBLEM_DATA: CriticalProblemData[] = [
  {
    id: 1,
    date: "5 January 2025",
    part_name: "Al. Radiator",
    dnia_pn: "JK422136-9610",
    customer: "Hino",
    cust_pn: "JK422112-9610",
    car_model: "Truck",
    country: "Indonesia",
    mis: "11223-445566",
    problem_description: "Core leakage detected during pressure test",
    severity: "Critical",
    status: "Under Investigation",
    countermeasure: "Increase welding inspection frequency",
    root_cause: "Insufficient brazing temperature control",
    image_id: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
  },
  {
    id: 2,
    date: "12 February 2025",
    part_name: "Oil Cooler",
    dnia_pn: "OC-8845-2310",
    customer: "Toyota",
    cust_pn: "TO-9988-4521",
    car_model: "Sedan",
    country: "Thailand",
    mis: "22334-556677",
    problem_description: "Fin deformation during assembly process",
    severity: "Near-Miss",
    status: "Closed",
    countermeasure: "Add protective jig during handling",
    root_cause: "Improper handling procedure",
    image_id: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
  },
  {
    id: 3,
    date: "20 March 2025",
    part_name: "Condenser Assy",
    dnia_pn: "CD-7721-5540",
    customer: "Daihatsu",
    cust_pn: "DH-3344-8899",
    car_model: "SUV",
    country: "Malaysia",
    mis: "33445-667788",
    problem_description: "Refrigerant leakage at pipe joint",
    severity: "Critical",
    status: "In Progress",
    countermeasure: "Revise torque specification and add sealant",
    root_cause: "Inadequate joint sealing method",
    image_id: "https://images.unsplash.com/photo-1565022531102-1bb67d40d74e?w=400",
  },
  {
    id: 4,
    date: "8 April 2025",
    part_name: "Heater Core",
    dnia_pn: "HC-5566-3321",
    customer: "Isuzu",
    cust_pn: "IS-7788-9900",
    car_model: "Van",
    country: "Philippines",
    mis: "44556-778899",
    problem_description: "Tube blockage causing reduced coolant flow",
    severity: "Near-Miss",
    status: "Closed",
    countermeasure: "Implement flushing procedure before assembly",
    root_cause: "Foreign material contamination",
    image_id: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
  },
  {
    id: 5,
    date: "15 May 2025",
    part_name: "Intercooler",
    dnia_pn: "IC-9988-7654",
    customer: "Mitsubishi",
    cust_pn: "MT-1122-3344",
    car_model: "Pickup",
    country: "Vietnam",
    mis: "55667-889900",
    problem_description: "Bracket mounting hole misalignment",
    severity: "Critical",
    status: "Under Investigation",
    countermeasure: "Update fixture and add dimension check",
    root_cause: "Fixture wear beyond tolerance",
    image_id: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
  },
  {
    id: 6,
    date: "15 May 2025",
    part_name: "Intercooler",
    dnia_pn: "IC-9988-7654",
    customer: "Mitsubishi",
    cust_pn: "MT-1122-3344",
    car_model: "Pickup",
    country: "Vietnam",
    mis: "55667-889900",
    problem_description: "Bracket mounting hole misalignment",
    severity: "Critical",
    status: "Under Investigation",
    countermeasure: "Update fixture and add dimension check",
    root_cause: "Fixture wear beyond tolerance",
    image_id: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
  },
  {
    id: 7,
    date: "15 May 2025",
    part_name: "Intercooler",
    dnia_pn: "IC-9988-7654",
    customer: "Mitsubishi",
    cust_pn: "MT-1122-3344",
    car_model: "Pickup",
    country: "Vietnam",
    mis: "55667-889900",
    problem_description: "Bracket mounting hole misalignment",
    severity: "Critical",
    status: "Under Investigation",
    countermeasure: "Update fixture and add dimension check",
    root_cause: "Fixture wear beyond tolerance",
    image_id: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
  },
];

const ITEMS_PER_PAGE = 5;
const SEARCH_FIELDS = ['part_name', 'dnia_pn', 'customer', 'cust_pn', 'car_model', 'country'] as const;

const getRowClass = (index: number): string =>
  `border-b border-gray-200 hover:bg-gray-100 transition-colors ${
    index % 2 === 0 ? "bg-white" : "bg-gray-50"
  }`;

const getPaginationNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];
  
  if (currentPage > 3) pages.push("...");
  
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  
  if (currentPage < totalPages - 2) pages.push("...");
  if (!pages.includes(totalPages)) pages.push(totalPages);
  
  return pages;
};

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

interface DetailModalProps {
  data: CriticalProblemData;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold">Critical & Near-Miss Problem Detail</h3>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 py-4 space-y-5">
        <img
          src={data.image_id}
          alt="Problem evidence"
          className="w-full h-64 object-cover rounded-lg border"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <DetailField label="Date" value={data.date} />
          <DetailField label="Part Name" value={data.part_name} />
          <DetailField label="DNIA P/N" value={data.dnia_pn} />
          <DetailField label="Customer" value={data.customer} />
          <DetailField label="Customer P/N" value={data.cust_pn} />
          <DetailField label="Car Model" value={data.car_model} />
          <DetailField label="Country" value={data.country} />
          <DetailField label="MIS" value={data.mis} />
          <DetailField label="Severity" value={data.severity} />
          <DetailField label="Status" value={data.status} />
        </div>

        <DetailSection label="Problem Description" value={data.problem_description} />
        <DetailSection label="Root Cause" value={data.root_cause} />
        <DetailSection label="Countermeasure" value={data.countermeasure} />
      </div>

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

const TableRow: React.FC<{ 
  item: CriticalProblemData; 
  index: number; 
  rowIndex: number;
  onClick: () => void;
}> = ({ item, index, rowIndex, onClick }) => (
  <tr
    className={`${getRowClass(index)} cursor-pointer`}
    onClick={onClick}
  >
    <td className="px-2 py-2">{rowIndex + 1}</td>
    <td className="px-2 py-2">{item.date}</td>
    <td className="px-2 py-2">{item.part_name}</td>
    <td className="px-2 py-2">{item.dnia_pn}</td>
    <td className="px-2 py-2">{item.customer}</td>
    <td className="px-2 py-2">{item.cust_pn}</td>
    <td className="px-2 py-2">{item.car_model}</td>
    <td className="px-2 py-2">{item.country}</td>
    <td className="px-2 py-2">{item.mis}</td>
  </tr>
);

const TableHeader: React.FC = () => (
  <thead className="bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
    <tr>
      <th className="px-2 py-2 text-left font-semibold">No</th>
      <th className="px-2 py-2 text-left font-semibold">Date</th>
      <th className="px-2 py-2 text-left font-semibold">Part Name</th>
      <th className="px-2 py-2 text-left font-semibold">DNIA P/N</th>
      <th className="px-2 py-2 text-left font-semibold">Customer</th>
      <th className="px-2 py-2 text-left font-semibold">Cust. P/N</th>
      <th className="px-2 py-2 text-left font-semibold">Car Model</th>
      <th className="px-2 py-2 text-left font-semibold">Country</th>
      <th className="px-2 py-2 text-left font-semibold">MIS</th>
    </tr>
  </thead>
);

const CriticalList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<CriticalProblemData | null>(null);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return CRITICAL_PROBLEM_DATA;
    
    const query = searchQuery.toLowerCase();
    return CRITICAL_PROBLEM_DATA.filter((item) =>
      SEARCH_FIELDS.some((field) => 
        item[field].toLowerCase().includes(query)
      )
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openModal = (item: CriticalProblemData) => {
    setSelectedProblem(item);
  };

  const closeModal = () => {
    setSelectedProblem(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold">Critical & Near-Miss Problems List</h2>
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Critical Problems..."
        />
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs border-collapse">
          <TableHeader />
          <tbody>
            {currentData.map((item, idx) => (
              <TableRow
                key={item.id}
                item={item}
                index={idx}
                rowIndex={(currentPage - 1) * ITEMS_PER_PAGE + idx}
                onClick={() => openModal(item)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {selectedProblem && (
        <DetailModal
          data={selectedProblem}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CriticalList;