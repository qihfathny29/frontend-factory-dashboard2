import React from "react";
import type { TargetFormData, AccidentReportData, ImageFile } from "../types";
import { DROPDOWN_OPTIONS } from "../types";
import { ImageUploader } from "./ImageUploader";

interface InputSectionProps {
  activeTab: "target" | "accident";
  onTabChange: (tab: "target" | "accident") => void;
  targetForm: TargetFormData;
  accidentForm: AccidentReportData;
  uploadedImages: ImageFile[];
  onTargetFormChange: (field: keyof TargetFormData, value: string) => void;
  onAccidentFormChange: (field: keyof AccidentReportData, value: string) => void;
  onImageUpload: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClearForm: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  activeTab,
  onTabChange,
  targetForm,
  accidentForm,
  uploadedImages,
  onTargetFormChange,
  onAccidentFormChange,
  onImageUpload,
  onRemoveImage,
  onSubmit,
  onClearForm,
}) => {
  return (
    <>
      {/* Child Tabs for Input */}
      <div className="bg-gray-50 rounded-lg mb-6">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => onTabChange("target")}
            className={`flex-1 px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "target"
                ? "bg-white text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Target Accident
          </button>
          <button
            type="button"
            onClick={() => onTabChange("accident")}
            className={`flex-1 px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "accident"
                ? "bg-white text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Accident Report
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {activeTab === "target" ? (
          // TARGET ACCIDENT FORM
          <>
            {/* Accident Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Accident Category <span className="text-red-500">*</span>
              </label>
              <select
                value={targetForm.accident_category}
                onChange={(e) => onTargetFormChange("accident_category", e.target.value)}
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
                value={targetForm.period_month}
                onChange={(e) => onTargetFormChange("period_month", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Business Unit */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Unit <span className="text-red-500">*</span>
              </label>
              <select
                value={targetForm.bu}
                onChange={(e) => onTargetFormChange("bu", e.target.value)}
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
                value={targetForm.target_value}
                onChange={(e) => onTargetFormChange("target_value", e.target.value)}
                placeholder="Enter target value"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        ) : (
          // ACCIDENT REPORT FORM
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Accident Date & Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Accident Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={accidentForm.accident_date}
                  onChange={(e) => onAccidentFormChange("accident_date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Company Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Code <span className="text-red-500">*</span>
                </label>
                <select
                  value={accidentForm.company_code}
                  onChange={(e) => onAccidentFormChange("company_code", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Company Code</option>
                  {DROPDOWN_OPTIONS.companyCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plant Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Plant Code <span className="text-red-500">*</span>
                </label>
                <select
                  value={accidentForm.plant_code}
                  onChange={(e) => onAccidentFormChange("plant_code", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Plant Code</option>
                  {DROPDOWN_OPTIONS.plantCodes.map((plant) => (
                    <option key={plant} value={plant}>
                      {plant}
                    </option>
                  ))}
                </select>
              </div>

              {/* Business Unit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Unit <span className="text-red-500">*</span>
                </label>
                <select
                  value={accidentForm.bu}
                  onChange={(e) => onAccidentFormChange("bu", e.target.value)}
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

              {/* Accident Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Accident Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accidentForm.accident_name}
                  onChange={(e) => onAccidentFormChange("accident_name", e.target.value)}
                  placeholder="Enter accident name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Location/Place */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location/Place <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accidentForm.place}
                  onChange={(e) => onAccidentFormChange("place", e.target.value)}
                  placeholder="Enter location or place"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Accident Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Accident Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={accidentForm.accident_category}
                  onChange={(e) => onAccidentFormChange("accident_category", e.target.value)}
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

              {/* Number of Injured Persons */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Injured Persons <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={accidentForm.injured_person}
                  onChange={(e) => onAccidentFormChange("injured_person", e.target.value)}
                  placeholder="Enter number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Damage Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Damage Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={accidentForm.damage}
                onChange={(e) => onAccidentFormChange("damage", e.target.value)}
                placeholder="Enter damage description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Circumstance */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Circumstance <span className="text-red-500">*</span>
              </label>
              <textarea
                value={accidentForm.circumstance}
                onChange={(e) => onAccidentFormChange("circumstance", e.target.value)}
                placeholder="Enter circumstance"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Fact Finding */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fact Finding <span className="text-red-500">*</span>
              </label>
              <textarea
                value={accidentForm.fact_finding}
                onChange={(e) => onAccidentFormChange("fact_finding", e.target.value)}
                placeholder="Enter fact finding"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Temporary Action */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Temporary Action <span className="text-red-500">*</span>
              </label>
              <textarea
                value={accidentForm.temporary_action}
                onChange={(e) => onAccidentFormChange("temporary_action", e.target.value)}
                placeholder="Enter temporary action"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Permanent Action */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Permanent Action <span className="text-red-500">*</span>
              </label>
              <textarea
                value={accidentForm.permanent_action}
                onChange={(e) => onAccidentFormChange("permanent_action", e.target.value)}
                placeholder="Enter permanent action"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Image Uploader */}
            <ImageUploader
              uploadedImages={uploadedImages}
              onImageUpload={onImageUpload}
              onRemoveImage={onRemoveImage}
            />
          </>
        )}

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClearForm}
            className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition text-sm"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
