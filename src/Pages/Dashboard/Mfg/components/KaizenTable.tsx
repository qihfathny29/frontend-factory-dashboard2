import React, { useState } from "react";
import type { KaizenTableConfig } from "../config/componentTypes";
import { 
  getPaginationNumbers, 
  getPaginatedData, 
  getTotalPages 
} from "../../../../Base/Utils/tableHelpers";

export interface KaizenData extends Record<string, unknown> {
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

  // Pagination logic using shared utilities
  const totalPages = getTotalPages(data.length, itemsPerPage);
  const currentData = getPaginatedData(data, currentPage, itemsPerPage);
  const pageNumbers = getPaginationNumbers(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Title - TETAP SAMA */}
      <h2 className="text-xs font-bold text-center mb-1">{title}</h2>

      {/* Table - DIGEDEIN */}
      <div className="flex-1 overflow-auto min-h-0">
        <table className="w-full text-[10px] border-collapse">
          {/* ↑ UBAH dari text-[8px] jadi text-[10px] */}
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="border border-gray-300 px-1.5 py-1 text-left font-semibold">
                {/* ↑ UBAH dari px-0.5 py-0.5 jadi px-1.5 py-1 */}
                Date
              </th>
              <th className="border border-gray-300 px-1.5 py-1 text-left font-semibold">
                Shift
              </th>
              <th className="border border-gray-300 px-1.5 py-1 text-left font-semibold">
                Detail
              </th>
              <th className="border border-gray-300 px-1.5 py-1 text-left font-semibold">
                Category
              </th>
              <th className="border border-gray-300 px-1.5 py-1 text-left font-semibold">
                Item
              </th>
              <th className="border border-gray-300 px-1.5 py-1 text-left font-semibold">
                MC
              </th>
              <th className="border border-gray-300 px-1.5 py-1 text-left font-semibold">
                Problem & Analysis
              </th>
              <th className="border border-gray-300 px-1.5 py-1 text-center font-semibold">
                Progress
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="border border-gray-300 px-1.5 py-1 whitespace-nowrap">
                  {/* ↑ UBAH dari px-0.5 py-0.5 jadi px-1.5 py-1 */}
                  {item.date}
                </td>
                <td className="border border-gray-300 px-1.5 py-1">
                  {item.shift}
                </td>
                <td className="border border-gray-300 px-1.5 py-1 text-[9px]">
                  {/* ↑ UBAH dari text-[7px] jadi text-[9px] */}
                  {item.detail}
                </td>
                <td className="border border-gray-300 px-1.5 py-1">
                  {item.category}
                </td>
                <td className="border border-gray-300 px-1.5 py-1">
                  {item.item}
                </td>
                <td className="border border-gray-300 px-1.5 py-1 text-[9px]">
                  {item.mc}
                </td>
                <td className="border border-gray-300 px-1.5 py-1 text-[9px] max-w-[150px]">
                  {item.problemAnalysis}
                </td>
                <td className="border border-gray-300 px-1.5 py-1 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-[9px] font-medium ${
                      /* ↑ UBAH dari px-1.5 py-0.5 text-[8px] jadi px-2 py-1 text-[9px] */
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

      {/* Pagination - DIGEDEIN & HAPUS BACKGROUND */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-xs text-gray-700 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
        >
          Prev
        </button>

        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="text-xs text-gray-500">
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={`text-xs font-medium px-2 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white font-bold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-xs text-gray-700 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KaizenTable;
