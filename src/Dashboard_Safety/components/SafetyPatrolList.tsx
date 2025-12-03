import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

interface SafetyPatrolData {
  id: number;
  occurDate: string;
  location: string;
  finding: string;
  action: string;
  prevention: string;
  status: "Open" | "Closed";
}

const SafetyPatrolList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  // Dummy data
  const allData: SafetyPatrolData[] = [
    {
      id: 1,
      occurDate: "2 April 2025",
      location: "W/H Timur",
      finding: "Kanban Dropped",
      action: "Shutter already re-layout by PIC Teams",
      prevention: "Periodical patrol by Leader Up",
      status: "Open",
    },
    {
      id: 2,
      occurDate: "2 April 2025",
      location: "W/H Timur",
      finding: "Kanban Dropped",
      action: "Shutter already re-layout by PIC Teams",
      prevention: "Periodical patrol by Leader Up",
      status: "Open",
    },
    {
      id: 3,
      occurDate: "2 April 2025",
      location: "W/H Timur",
      finding: "Kanban Dropped",
      action: "Shutter already re-layout by PIC Teams",
      prevention: "Periodical patrol by Leader Up",
      status: "Open",
    },
    {
      id: 4,
      occurDate: "2 April 2025",
      location: "W/H Timur",
      finding: "Kanban Dropped",
      action: "Shutter already re-layout by PIC Teams",
      prevention: "Periodical patrol by Leader Up",
      status: "Open",
    },
    {
      id: 5,
      occurDate: "2 April 2025",
      location: "W/H Timur",
      finding: "Kanban Dropped",
      action: "Shutter already re-layout by PIC Teams",
      prevention: "Periodical patrol by Leader Up",
      status: "Closed",
    },
    {
      id: 6,
      occurDate: "3 April 2025",
      location: "Production Floor",
      finding: "Oil Spill",
      action: "Clean up immediately by maintenance team",
      prevention: "Regular equipment inspection",
      status: "Open",
    },
    {
      id: 7,
      occurDate: "4 April 2025",
      location: "Assembly Line",
      finding: "Missing Safety Sign",
      action: "Install new safety signage",
      prevention: "Monthly safety audit",
      status: "Closed",
    },
    {
      id: 8,
      occurDate: "5 April 2025",
      location: "Storage Area",
      finding: "Blocked Emergency Exit",
      action: "Remove obstruction immediately",
      prevention: "Daily patrol check",
      status: "Open",
    },
    {
      id: 9,
      occurDate: "6 April 2025",
      location: "Welding Section",
      finding: "Faulty Fire Extinguisher",
      action: "Replace with new extinguisher",
      prevention: "Monthly equipment check",
      status: "Closed",
    },
    {
      id: 10,
      occurDate: "7 April 2025",
      location: "Office Area",
      finding: "Loose Cable",
      action: "Secure cable properly",
      prevention: "Weekly workplace inspection",
      status: "Open",
    },
  ];

  // Filter data berdasarkan search query (Finding only)
  const filteredData = useMemo(() => {
    return allData.filter((item) =>
      item.finding.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset ke halaman 1 saat search
  };

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const numbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      numbers.push(1);
      if (currentPage > 3) numbers.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!numbers.includes(i)) numbers.push(i);
      }
      if (currentPage < totalPages - 2) numbers.push("...");
      numbers.push(totalPages);
    }
    return numbers;
  };

  // Helper function untuk menentukan status class
  const getStatusClass = (status: string) => {
    if (status === "Open") {
      return "bg-blue-100 text-blue-700 border border-blue-300";
    }
    return "bg-gray-100 text-gray-700 border border-gray-300";
  };

  // Helper function untuk menentukan row class
  const getRowClass = (index: number) => {
    const baseClass =
      "border-b border-gray-200 hover:bg-gray-100 transition-colors";
    const bgClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";
    return `${baseClass} ${bgClass}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold">Safety Patrol List</h2>

        {/* Search Section */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Safety Patrol"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table - flex-1 untuk mengisi ruang yang tersisa */}
      <div className="flex-1 flex flex-col">
        <div className="overflow-x-auto mb-4 flex-1">
          <table className="w-full text-xs border-collapse h-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="px-2 py-1 text-left font-semibold">No</th>
                <th className="px-2 py-1 text-left font-semibold">
                  Occur Date
                </th>
                <th className="px-2 py-1 text-left font-semibold">Location</th>
                <th className="px-2 py-1 text-left font-semibold">Finding</th>
                <th className="px-2 py-1 text-left font-semibold">Action</th>
                <th className="px-2 py-1 text-left font-semibold">
                  Prevention
                </th>
                <th className="px-2 py-1 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id} className={getRowClass(index)}>
                  <td className="px-2 py-2">{startIndex + index + 1}</td>
                  <td className="px-2 py-2">{item.occurDate}</td>
                  <td className="px-2 py-2">{item.location}</td>
                  <td className="px-2 py-2">{item.finding}</td>
                  <td className="px-2 py-2">{item.action}</td>
                  <td className="px-2 py-2">{item.prevention}</td>
                  <td className="px-2 py-2">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-semibold ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - tetap di bawah */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200 mt-auto">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {getPaginationNumbers().map((num, idx) => {
            const isCurrentPage = num === currentPage;
            const isEllipsis = num === "...";

            let buttonClass = "px-3 py-1 text-sm rounded ";
            if (isCurrentPage) {
              buttonClass += "bg-blue-600 text-white font-semibold";
            } else if (isEllipsis) {
              buttonClass += "text-gray-400 cursor-default";
            } else {
              buttonClass += "text-gray-600 hover:bg-gray-200";
            }

            return (
              <button
                key={`page-${idx}-${num}`}
                onClick={() => typeof num === "number" && goToPage(num)}
                disabled={isEllipsis}
                className={buttonClass}
              >
                {num}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyPatrolList;
