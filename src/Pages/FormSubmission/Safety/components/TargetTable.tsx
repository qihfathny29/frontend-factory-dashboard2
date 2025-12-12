import React from "react";
import type { SubmittedTargetData } from "../types";

interface TargetTableProps {
  data: SubmittedTargetData[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  onEdit: (item: SubmittedTargetData) => void;
  onDelete: (id: string) => void;
  paginationInfo: {
    showing: number;
    to: number;
    total: number;
  };
}

export const TargetTable: React.FC<TargetTableProps> = ({
  data,
  searchQuery,
  onSearchChange,
  currentPage,
  onPageChange,
  totalPages,
  onEdit,
  onDelete,
  paginationInfo,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Accident Category, Period, or BU..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">BU</th>
              <th className="px-4 py-3">Accident Category</th>
              <th className="px-4 py-3">Target Value</th>
              <th className="px-4 py-3">Submit Date</th>
              <th className="px-4 py-3">Update Date</th>
              <th className="px-4 py-3">Update By</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.period_month}</td>
                  <td className="px-4 py-3">{item.bu}</td>
                  <td className="px-4 py-3">{item.accident_category}</td>
                  <td className="px-4 py-3">{item.target_value}</td>
                  <td className="px-4 py-3">{item.submit_date}</td>
                  <td className="px-4 py-3">{item.update_date}</td>
                  <td className="px-4 py-3">{item.update_by}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {paginationInfo.showing} to {paginationInfo.to} of {paginationInfo.total} entries
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 font-semibold rounded-lg transition text-sm"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 font-semibold rounded-lg transition text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
