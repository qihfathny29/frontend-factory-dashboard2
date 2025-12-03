import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

interface AccidentData {
  id: number;
  accident_date: string;
  component_code: string;
  plant_code: string;
  bu: string;
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

const AccidentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAccident, setSelectedAccident] = useState<AccidentData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  // Dummy data dengan struktur baru
  const allData: AccidentData[] = [
    {
      id: 1,
      accident_date: "2 April 2025",
      component_code: "DNIA",
      plant_code: "TH-01",
      bu: "Radiator",
      accident_name: "Fire Incident",
      place: "Production Area A",
      accident_category: "Fire Accident",
      injured_person: "None",
      damage: "Machine Oven",
      circumstance:
        "Belt worn out causing excessive friction and smoke in oven machine",
      fact_finding: "Regular maintenance was delayed by 2 weeks",
      temporary_action: "Shut down machine and ventilate area",
      permanent_action:
        "Add sensor blower & revise cleaning method, implement weekly inspection",
      image_id:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    },
    {
      id: 2,
      accident_date: "2 May 2025",
      plant_code: "PT-02",
      component_code: "DNIA",
      bu: "Engine",
      accident_name: "Hand Injury",
      place: "Assembly Line B",
      accident_category: "Grade 1 Accident",
      injured_person: "John Doe",
      damage: "Minor cut on hand",
      circumstance:
        "Worker's hand came into contact with sharp edge during assembly",
      fact_finding: "Protective covering was removed and not replaced",
      temporary_action: "First aid treatment, area cordoned off",
      permanent_action:
        "Install permanent protective covering, add warning signs",
      image_id:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
    },
    {
      id: 3,
      accident_date: "2 June 2025",
      plant_code: "ELECT-01",
      component_code: "DNIA",
      bu: "Welding",
      accident_name: "Eye Exposure",
      place: "Welding Station 3",
      accident_category: "Serious Accident",
      injured_person: "Jane Smith",
      damage: "Eye irritation",
      circumstance:
        "Welding flash occurred when worker removed protective gear prematurely",
      fact_finding: "Lack of proper safety protocol enforcement",
      temporary_action: "Medical treatment, suspend welding operations",
      permanent_action:
        "Mandatory safety equipment check, additional safety training",
      image_id:
        "https://images.unsplash.com/photo-1565022531102-1bb67d40d74e?w=400",
    },
    {
      id: 4,
      accident_date: "2 July 2025",
      plant_code: "TH-02",
      component_code: "DNIA",
      bu: "Logistics",
      accident_name: "Vehicle Collision",
      place: "Storage Warehouse",
      accident_category: "Traffic Accident",
      injured_person: "None",
      damage: "Forklift damage",
      circumstance: "Forklift collision due to high speed in warehouse area",
      fact_finding: "No speed limit signs installed in the area",
      temporary_action: "Repair forklift, restrict warehouse access",
      permanent_action:
        "Install speed limit signs, implement speed monitoring system",
      image_id:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
    },
    {
      id: 5,
      accident_date: "2 August 2025",
      plant_code: "PT-03",
      component_code: "DNIA",
      bu: "Production",
      accident_name: "Electrical Fire",
      place: "Factory Building C",
      accident_category: "Fire Accident",
      injured_person: "None",
      damage: "Control panel",
      circumstance: "Electrical short circuit caused fire in control panel",
      fact_finding: "Outdated electrical system with no recent inspection",
      temporary_action: "Evacuate area, fire extinguished by safety team",
      permanent_action:
        "Complete electrical system upgrade, quarterly inspection schedule",
      image_id:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
    },
  ];

  // Filter data
  const filteredData = useMemo(() => {
    return allData.filter(
      (item) =>
        item.accident_category
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.accident_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle modal
  const openModal = (accident: AccidentData) => {
    setSelectedAccident(accident);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccident(null);
  };

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  const getAccidentCategoryClass = (category: string) => {
    if (category === "Fire Accident") return "bg-red-100 text-red-700";
    if (category === "Grade 1 Accident") return "bg-yellow-100 text-yellow-700";
    if (category === "Serious Accident") return "bg-purple-100 text-purple-700";
    if (category === "Traffic Accident") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  const getRowClass = (index: number) => {
    const baseClass =
      "border-b border-gray-200 hover:bg-gray-100 transition-colors";
    const bgClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";
    return `${baseClass} ${bgClass}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-bold">Accident List</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Accident"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setCurrentPage(1)}
            className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-xs"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-2 flex-1 overflow-y-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-2 py-2 text-left font-semibold">No</th>
              <th className="px-2 py-2 text-left font-semibold">
                Accident Date
              </th>
              <th className="px-2 py-2 text-left font-semibold">
                Component Code
              </th>
              <th className="px-2 py-2 text-left font-semibold">Plant Code</th>
              <th className="px-2 py-2 text-left font-semibold">BU</th>
              <th className="px-2 py-2 text-left font-semibold">
                Accident Name
              </th>
              <th className="px-2 py-2 text-left font-semibold">Place</th>
              <th className="px-2 py-2 text-left font-semibold">
                Accident Category
              </th>
              <th className="px-2 py-2 text-left font-semibold">
                Injured Person
              </th>
              <th className="px-2 py-2 text-left font-semibold">Damage</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id} className={`${getRowClass(index)} cursor-pointer `} onClick={() => openModal(item)}>
                <td className="px-2 py-2">{startIndex + index + 1}</td>
                <td className="px-2 py-2">{item.accident_date}</td>
                <td className="px-2 py-2">{item.component_code}</td>
                <td className="px-2 py-2">{item.plant_code}</td>
                <td className="px-2 py-2">{item.bu}</td>
                <td className="px-2 py-2">{item.accident_name}</td>
                <td className="px-2 py-2">{item.place}</td>
                <td className="px-2 py-2">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-semibold ${getAccidentCategoryClass(
                      item.accident_category
                    )}`}
                  >
                    {item.accident_category}
                  </span>
                </td>
                <td className="px-2 py-2">{item.injured_person}</td>
                <td className="px-2 py-2">{item.damage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-200">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {getPaginationNumbers().map((num, idx) => {
          const isCurrentPage = num === currentPage;
          const isEllipsis = num === "...";
          let buttonClass = "px-3 py-1 text-xs rounded ";
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
          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Modal Detail */}
      {isModalOpen && selectedAccident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Accident Detail</h3>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-4 space-y-4">
              {/* Image */}
              <div className="w-full">
                <img
                  src={selectedAccident.image_id}
                  alt="Accident"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Basic Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Accident Date
                  </span>
                  <p className="text-sm">{selectedAccident.accident_date}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Component Code
                  </span>
                  <p className="text-sm">{selectedAccident.component_code}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Plant Code
                  </span>
                  <p className="text-sm">{selectedAccident.plant_code}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    BU
                  </span>
                  <p className="text-sm">{selectedAccident.bu}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Accident Name
                  </span>
                  <p className="text-sm">{selectedAccident.accident_name}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Place
                  </span>
                  <p className="text-sm">{selectedAccident.place}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Category
                  </span>
                  <p className="text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getAccidentCategoryClass(
                        selectedAccident.accident_category
                      )}`}
                    >
                      {selectedAccident.accident_category}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Injured Person
                  </span>
                  <p className="text-sm">{selectedAccident.injured_person}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Damage
                  </span>
                  <p className="text-sm">{selectedAccident.damage}</p>
                </div>
              </div>

              {/* Detailed Info */}
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Circumstance
                  </span>
                  <p className="text-sm bg-gray-50 p-3 rounded">
                    {selectedAccident.circumstance}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Fact Finding
                  </span>
                  <p className="text-sm bg-gray-50 p-3 rounded">
                    {selectedAccident.fact_finding}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Temporary Action
                  </span>
                  <p className="text-sm bg-gray-50 p-3 rounded">
                    {selectedAccident.temporary_action}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">
                    Permanent Action
                  </span>
                  <p className="text-sm bg-gray-50 p-3 rounded">
                    {selectedAccident.permanent_action}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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

export default AccidentList;
