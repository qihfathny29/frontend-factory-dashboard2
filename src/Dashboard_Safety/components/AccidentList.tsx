import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

interface AccidentData {
  id: number;
  occurDate: string;
  location: string;
  accidentType: string;
  victimDept: string;
  problem: string;
  cause: string;
  counterMeasure: string;
}

const AccidentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  // Dummy data
  const allData: AccidentData[] = [
    {
      id: 1,
      occurDate: "2 April 2025",
      location: "Radiator",
      accidentType: "Fire Accident",
      victimDept: "Production",
      problem: "M/c Oven Smoked",
      cause: "Belt worn out for trigger fire",
      counterMeasure: "Add sensor blower & revise cleaning method",
    },
    {
      id: 2,
      occurDate: "2 May 2025",
      location: "Radiator",
      accidentType: "Fire Accident",
      victimDept: "Production",
      problem: "M/c Oven Smoked",
      cause: "Belt worn out for trigger fire",
      counterMeasure: "Add sensor blower & revise cleaning method",
    },
    {
      id: 3,
      occurDate: "2 June 2025",
      location: "Radiator",
      accidentType: "Fire Accident",
      victimDept: "Production",
      problem: "M/c Oven Smoked",
      cause: "Belt worn out for trigger fire",
      counterMeasure: "Add sensor blower & revise cleaning method",
    },
    {
      id: 4,
      occurDate: "2 July 2025",
      location: "Radiator",
      accidentType: "Fire Accident",
      victimDept: "Production",
      problem: "M/c Oven Smoked",
      cause: "Belt worn out for trigger fire",
      counterMeasure: "Add sensor blower & revise cleaning method",
    },
    {
      id: 5,
      occurDate: "2 August 2025",
      location: "Radiator",
      accidentType: "Fire Accident",
      victimDept: "Production",
      problem: "M/c Oven Smoked",
      cause: "Belt worn out for trigger fire",
      counterMeasure: "Add sensor blower & revise cleaning method",
    },
    {
      id: 6,
      occurDate: "3 August 2025",
      location: "Engine",
      accidentType: "Grade 1 Accident",
      victimDept: "Assembly",
      problem: "Cut on hand",
      cause: "Sharp edge not covered",
      counterMeasure: "Add protective covering",
    },
    {
      id: 7,
      occurDate: "4 August 2025",
      location: "Welding",
      accidentType: "Serious Accident",
      victimDept: "Welding",
      problem: "Eye injury",
      cause: "Lack of safety gear",
      counterMeasure: "Mandatory safety equipment check",
    },
    {
      id: 8,
      occurDate: "5 August 2025",
      location: "Storage",
      accidentType: "Traffic Accident",
      victimDept: "Logistics",
      problem: "Collision",
      cause: "High speed",
      counterMeasure: "Install speed limit signs",
    },
    {
      id: 9,
      occurDate: "6 August 2025",
      location: "Factory",
      accidentType: "Fire Accident",
      victimDept: "Production",
      problem: "Fire outbreak",
      cause: "Electrical fault",
      counterMeasure: "Electrical system upgrade",
    },
    {
      id: 10,
      occurDate: "7 August 2025",
      location: "Office",
      accidentType: "Grade 1 Accident",
      victimDept: "Admin",
      problem: "Fall",
      cause: "Wet floor",
      counterMeasure: "Place warning signs",
    },
  ];

  // Filter data berdasarkan search query (Accident Type only)
  const filteredData = useMemo(() => {
    return allData.filter((item) =>
      item.accidentType.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold">Accident List</h2>

        {/* Search Section */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Accident"
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

      {/* Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-2 py-1 text-left font-semibold">No</th>
              <th className="px-2 py-1 text-left font-semibold">Occur Date</th>
              <th className="px-2 py-1 text-left font-semibold">Location</th>
              <th className="px-2 py-1 text-left font-semibold">
                Accident Type
              </th>
              <th className="px-2 py-1 text-left font-semibold">Victim/Dept</th>
              <th className="px-2 py-1 text-left font-semibold">Problem</th>
              <th className="px-2 py-1 text-left font-semibold">Cause</th>
              <th className="px-2 py-1 text-left font-semibold">
                Counter Measure
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-2 py-2">{startIndex + index + 1}</td>
                <td className="px-2 py-2">{item.occurDate}</td>
                <td className="px-2 py-2">{item.location}</td>
                <td className="px-2 py-2">
                  <span
                    className={`px-1 py-0.5 rounded text-[10px] font-semibold ${
                      item.accidentType === "Fire Accident"
                        ? "bg-red-100 text-red-700"
                        : item.accidentType === "Grade 1 Accident"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.accidentType === "Serious Accident"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.accidentType}
                  </span>
                </td>
                <td className="px-2 py-2">{item.victimDept}</td>
                <td className="px-2 py-2">{item.problem}</td>
                <td className="px-2 py-2">{item.cause}</td>
                <td className="px-2 py-2">{item.counterMeasure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {getPaginationNumbers().map((num, idx) => (
          <button
            key={idx}
            onClick={() => typeof num === "number" && goToPage(num)}
            disabled={num === "..."}
            className={`px-3 py-1 text-sm rounded ${
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
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccidentList;
