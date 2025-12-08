import React, { useState, useMemo } from "react";

interface InventoryData {
  id: number;
  product: string;
  plan: number;
  actual: number;
}

interface InventoryCardProps {
  title: string;
  data: InventoryData[];
}

interface TableRowProps {
  item: InventoryData;
  index: number;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 3;

const TableHeader: React.FC = () => (
  <thead className="bg-gray-100 border-b border-gray-300 sticky top-0">
    <tr>
      <th className="px-2 py-2 text-left font-semibold text-gray-700">Product</th>
      <th className="px-2 py-2 text-center font-semibold text-gray-700">Plan</th>
      <th className="px-2 py-2 text-center font-semibold text-gray-700">Actual</th>
    </tr>
  </thead>
);

const TableRow: React.FC<TableRowProps> = ({ item, index }) => {
  const isBelowPlan = item.actual < item.plan;
  
  return (
    <tr className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
      <td className="px-2 py-2 text-gray-700 font-medium">{item.product}</td>
      <td className="px-2 py-2 text-center text-gray-700 font-semibold">{item.plan}</td>
      <td className={`px-2 py-2 text-center font-semibold ${isBelowPlan ? "bg-red-100 text-red-600" : "text-gray-700"}`}>
        {item.actual}
      </td>
    </tr>
  );
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 pt-3 border-t border-gray-200">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 text-xs rounded ${
            currentPage === page
              ? "bg-blue-600 text-white font-semibold"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {page}
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

const InventoryCard: React.FC<InventoryCardProps> = ({ title, data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const averageActual = useMemo(() => {
    const sum = data.reduce((acc, item) => acc + item.actual, 0);
    return (sum / data.length).toFixed(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 h-full flex flex-col">
      <div className="text-center mb-1">
        <h2 className="text-sm font-bold text-gray-800">{title}</h2>
      </div>

      <div className="text-center mb-2">
        <div className="text-4xl font-bold text-gray-800">{averageActual}</div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs border-collapse">
          <TableHeader />
          <tbody>
            {currentData.map((item, index) => (
              <TableRow key={item.id} item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const INVENTORY_PARTS_DATA: InventoryData[] = [
  { id: 1, product: "Spark Plug", plan: 4, actual: 4 },
  { id: 2, product: "Air Filter", plan: 5, actual: 3 },
  { id: 3, product: "Oil Filter", plan: 3, actual: 3 },
  { id: 4, product: "Brake Pad", plan: 6, actual: 6 },
  { id: 5, product: "Fuel Pump", plan: 2, actual: 2 },
  { id: 6, product: "Battery", plan: 4, actual: 5 },
];

const INVENTORY_FG_DATA: InventoryData[] = [
  { id: 1, product: "Engine", plan: 10, actual: 10 },
  { id: 2, product: "Transmission", plan: 8, actual: 7 },
  { id: 3, product: "Radiator", plan: 5, actual: 5 },
  { id: 4, product: "Alternator", plan: 7, actual: 7 },
  { id: 5, product: "Starter", plan: 6, actual: 6 },
  { id: 6, product: "Compressor", plan: 4, actual: 4 },
];

export const InventoryPartsCard: React.FC = () => (
  <InventoryCard title="Inventory Parts (DoH)" data={INVENTORY_PARTS_DATA} />
);

export const InventoryFGCard: React.FC = () => (
  <InventoryCard title="Inventory F/G (DoH)" data={INVENTORY_FG_DATA} />
);