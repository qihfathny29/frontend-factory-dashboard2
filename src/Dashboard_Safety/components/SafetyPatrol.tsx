import React from "react";

const SafetyPatrol: React.FC = () => {
  // Data untuk tabel patrol type
  const patrolData = [
    { type: "BoD", open: 1, closed: 5 },
    { type: "Manager", open: 1, closed: 2 },
    { type: "SHE", open: 1, closed: 1 },
    { type: "Cross", open: 1, closed: 2 },
    { type: "Unscheduled", open: 1, closed: 2 },
  ];

  // Hitung total
  const totalOpen = patrolData.reduce((sum, item) => sum + item.open, 0);
  const totalClosed = patrolData.reduce((sum, item) => sum + item.closed, 0);
  const totalAll = totalOpen + totalClosed;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Safety Patrol</h2>
      </div>

      {/* Angka Besar Total */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-gray-800">{totalAll}</div>
      </div>

      {/* Comparison Section: Open | Closed */}
      <div className="flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totalOpen}</div>
          <div className="text-sm text-gray-600">Open</div>
        </div>
        
        <div className="mx-6 text-2xl text-gray-400">|</div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{totalClosed}</div>
          <div className="text-sm text-gray-600">Closed</div>
        </div>
      </div>

      {/* Tabel Patrol Type */}
      <div className="flex-1">
        <div className="overflow-hidden">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="px-2 py-2 text-left font-semibold text-gray-700">
                  Patrol Type
                </th>
                <th className="px-2 py-2 text-center font-semibold text-blue-600">
                  Open
                </th>
                <th className="px-2 py-2 text-center font-semibold text-gray-600">
                  Closed
                </th>
              </tr>
            </thead>
            <tbody>
              {patrolData.map((item, index) => (
                <tr
                  key={item.type}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-2 py-2 text-gray-700 font-medium">
                    {item.type}
                  </td>
                  <td className="px-2 py-2 text-center text-blue-600 font-semibold">
                    {item.open}
                  </td>
                  <td className="px-2 py-2 text-center text-gray-600 font-semibold">
                    {item.closed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SafetyPatrol;