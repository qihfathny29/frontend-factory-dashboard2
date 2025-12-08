import React, { useState } from "react";
import type { KaizenTableConfig } from "../config/componentTypes";

export interface KaizenData {
  date: string;
  shift: string;
  detail: string;
  category: string;
  item: string;
  mc: string;
  problemAnalysis: string;
  progress: "Open" | "Closed";
}

interface KaizenTableProps {
  config: KaizenTableConfig;
  data: KaizenData[];
  itemsPerPage?: number;
}

const KaizenTable: React.FC<KaizenTableProps> = ({
  config,
  data,
  itemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { title } = config;

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Title */}
      <h2 className="text-xs font-bold text-center mb-1">{title}</h2>

      {/* Table */}
      <div className="flex-1 overflow-auto min-h-0">
        <table className="w-full text-[8px] border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="border border-gray-300 px-0.5 py-0.5 text-left font-semibold">
                Date
              </th>
              <th className="border border-gray-300 px-0.5 py-0.5 text-left font-semibold">
                Shift
              </th>
              <th className="border border-gray-300 px-0.5 py-0.5 text-left font-semibold">
                Detail
              </th>
              <th className="border border-gray-300 px-0.5 py-0.5 text-left font-semibold">
                Category
              </th>
              <th className="border border-gray-300 px-0.5 py-0.5 text-left font-semibold">
                Item
              </th>
              <th className="border border-gray-300 px-0.5 py-0.5 text-left font-semibold">
                MC
              </th>
              <th className="border border-gray-300 px-0.5 py-0.5 text-left font-semibold">
                Problem & Analysis
              </th>
              <th className="border border-gray-300 px-0.5 py-0.5 text-center font-semibold">
                Progress
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="border border-gray-300 px-0.5 py-0.5 whitespace-nowrap">
                  {item.date}
                </td>
                <td className="border border-gray-300 px-0.5 py-0.5">
                  {item.shift}
                </td>
                <td className="border border-gray-300 px-0.5 py-0.5 text-[7px]">
                  {item.detail}
                </td>
                <td className="border border-gray-300 px-0.5 py-0.5">
                  {item.category}
                </td>
                <td className="border border-gray-300 px-0.5 py-0.5">
                  {item.item}
                </td>
                <td className="border border-gray-300 px-0.5 py-0.5 text-[7px]">
                  {item.mc}
                </td>
                <td className="border border-gray-300 px-0.5 py-0.5 text-[7px] max-w-[150px]">
                  {item.problemAnalysis}
                </td>
                <td className="border border-gray-300 px-0.5 py-0.5 text-center">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-medium ${
                      item.progress === "Open"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-200 text-gray-700 border border-gray-400"
                    }`}
                  >
                    {item.progress}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 mt-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-1.5 py-0.5 text-[8px] rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          // Show first page, last page, current page, and pages around current
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-1.5 py-0.5 text-[8px] rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="px-0.5 text-gray-500 text-[8px]">
                ...
              </span>
            );
          }
          return null;
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-1.5 py-0.5 text-[8px] rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KaizenTable;
