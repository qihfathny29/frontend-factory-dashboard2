import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

interface DeliveryIssueData {
  id: number;
  occur_date: string;
  plant: string;
  customer: string;
  problem: string[];
  counter_measure: string;
}

const DELIVERY_ISSUES_DATA: DeliveryIssueData[] = [
  {
    id: 1,
    occur_date: "5 April 2025",
    plant: "Fajar",
    customer: "Hino",
    problem: ["Late delivery due to production delay", "Incomplete documentation"],
    counter_measure: "Expedite production schedule and complete all required documents before shipment"
  },
  {
    id: 2,
    occur_date: "12 April 2025",
    plant: "Bekasi",
    customer: "Toyota",
    problem: ["Wrong part delivered", "Packaging damage during transit"],
    counter_measure: "Implement double-check system and improve packaging material quality"
  },
  {
    id: 3,
    occur_date: "18 April 2025",
    plant: "Fajar",
    customer: "Daihatsu",
    problem: ["Quantity mismatch in delivery order"],
    counter_measure: "Add barcode scanning system for accurate quantity verification"
  },
  {
    id: 4,
    occur_date: "25 April 2025",
    plant: "Bekasi",
    customer: "Isuzu",
    problem: ["Delayed customs clearance", "Missing shipping documents"],
    counter_measure: "Prepare all customs documents 2 days before shipment deadline"
  },
  {
    id: 5,
    occur_date: "2 May 2025",
    plant: "Fajar",
    customer: "Mitsubishi",
    problem: ["Quality inspection failed at customer site"],
    counter_measure: "Strengthen final inspection process and add customer quality checklist"
  },
  {
    id: 6,
    occur_date: "10 May 2025",
    plant: "Bekasi",
    customer: "Hino",
    problem: ["Truck breakdown during delivery", "No backup transportation available"],
    counter_measure: "Establish partnership with backup logistics provider for emergency situations"
  },
  {
    id: 7,
    occur_date: "10 May 2025",
    plant: "Bekasi",
    customer: "Hino",
    problem: ["Truck breakdown during delivery", "No backup transportation available"],
    counter_measure: "Establish partnership with backup logistics provider for emergency situations"
  },
  {
    id: 8,
    occur_date: "10 May 2025",
    plant: "Bekasi",
    customer: "Hino",
    problem: ["Truck breakdown during delivery", "No backup transportation available"],
    counter_measure: "Establish partnership with backup logistics provider for emergency situations"
  },
];

const ITEMS_PER_PAGE = 3;
const SEARCH_FIELDS = ['plant', 'customer'] as const;

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
  data: DeliveryIssueData;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold">Delivery Issue Detail</h3>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 py-4 space-y-5">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <DetailField label="Occur Date" value={data.occur_date} />
          <DetailField label="Plant" value={data.plant} />
          <DetailField label="Customer" value={data.customer} />
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-500 block mb-1">Problem</span>
          <div className="bg-gray-50 p-3 rounded">
            <ol className="list-decimal list-inside space-y-1">
              {data.problem.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </div>

        <DetailSection label="Counter Measure" value={data.counter_measure} />
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

const TableHeader: React.FC = () => (
  <thead className="bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
    <tr>
      <th className="px-2 py-2 text-left font-semibold w-12">No</th>
      <th className="px-2 py-2 text-left font-semibold">Occur Date</th>
      <th className="px-2 py-2 text-left font-semibold">Plant</th>
      <th className="px-2 py-2 text-left font-semibold">Customer</th>
      <th className="px-2 py-2 text-left font-semibold">Problem</th>
      <th className="px-2 py-2 text-left font-semibold">Counter Measure</th>
    </tr>
  </thead>
);

interface TableRowProps {
  item: DeliveryIssueData;
  index: number;
  rowIndex: number;
  onClick: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ item, index, rowIndex, onClick }) => (
  <tr
    className={`${getRowClass(index)} cursor-pointer`}
    onClick={onClick}
  >
    <td className="px-2 py-2">{rowIndex + 1}</td>
    <td className="px-2 py-2">{item.occur_date}</td>
    <td className="px-2 py-2">{item.plant}</td>
    <td className="px-2 py-2">{item.customer}</td>
    <td className="px-2 py-2">
      <ol className="list-decimal list-inside">
        {item.problem.map((prob, pIdx) => (
          <li key={pIdx}>{prob}</li>
        ))}
      </ol>
    </td>
    <td className="px-2 py-2">{item.counter_measure}</td>
  </tr>
);

const DeliveryIssueList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<DeliveryIssueData | null>(null);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return DELIVERY_ISSUES_DATA;
    
    const query = searchQuery.toLowerCase();
    return DELIVERY_ISSUES_DATA.filter((item) =>
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

  const openModal = (item: DeliveryIssueData) => {
    setSelectedIssue(item);
  };

  const closeModal = () => {
    setSelectedIssue(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold">Delivery Issues List</h2>
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Plant or Customer..."
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

      {selectedIssue && (
        <DetailModal
          data={selectedIssue}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default DeliveryIssueList;