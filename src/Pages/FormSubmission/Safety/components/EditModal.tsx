import React from "react";
import type { TargetFormData } from "../types";
import { DROPDOWN_OPTIONS } from "../types";

interface EditModalProps {
  isOpen: boolean;
  editFormData: TargetFormData;
  setEditFormData: React.Dispatch<React.SetStateAction<TargetFormData>>;
  onSave: () => void;
  onCancel: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  editFormData,
  setEditFormData,
  onSave,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h3 className="text-lg font-bold text-gray-800">Edit Target Accident</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 space-y-6">
          {/* Accident Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Accident Category <span className="text-red-500">*</span>
            </label>
            <select
              value={editFormData.accident_category}
              onChange={(e) =>
                setEditFormData((prev) => ({ ...prev, accident_category: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Accident Category</option>
              {DROPDOWN_OPTIONS.accidentCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Period (Month & Year) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Period (Month & Year) <span className="text-red-500">*</span>
            </label>
            <input
              type="month"
              value={editFormData.period_month}
              onChange={(e) =>
                setEditFormData((prev) => ({ ...prev, period_month: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Business Unit */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Unit <span className="text-red-500">*</span>
            </label>
            <select
              value={editFormData.bu}
              onChange={(e) =>
                setEditFormData((prev) => ({ ...prev, bu: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Business Unit</option>
              {DROPDOWN_OPTIONS.businessUnits.map((bu) => (
                <option key={bu} value={bu}>
                  {bu}
                </option>
              ))}
            </select>
          </div>

          {/* Target Value */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Value <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editFormData.target_value}
              onChange={(e) =>
                setEditFormData((prev) => ({ ...prev, target_value: e.target.value }))
              }
              placeholder="Enter target value"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end rounded-b-lg">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
