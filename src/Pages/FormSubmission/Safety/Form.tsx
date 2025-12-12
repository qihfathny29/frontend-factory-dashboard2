import { useState } from "react";
import { toast } from "react-toastify";
import { ImageCarousel } from "../../../Components/ImageCarousel";

interface ImageFile {
  file: File;
  preview: string;
  name: string;
}

interface TargetFormData {
  period_month: string;
  bu: string;
  accident_category: string;
  target_value: string;
}

interface AccidentReportData {
  accident_date: string;
  company_code: string;
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
}

const DROPDOWN_OPTIONS = {
  businessUnits: ["Thermal", "Power Train", "Electronic"] as const,
  accidentCategories: [
    "Accident",
    "Accident Subcount",
    "Near Miss",
    "Smoke",
    "Fire Accident",
    "Traffic Accident",
  ] as const,
  companyCodes: ["DNIA", "DMIA", "HD", "TACI"] as const,
  plantCodes: ["Bekasi Plant", "Fajar Plant", "Plant 1", "Plant 2"] as const,
};

export const SafetyForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"target" | "accident">("target");

  // Target Form State
  const [targetForm, setTargetForm] = useState<TargetFormData>({
    period_month: "",
    bu: "",
    accident_category: "",
    target_value: "",
  });

  // Accident Report Form State
  const [accidentForm, setAccidentForm] = useState<AccidentReportData>({
    accident_date: "",
    company_code: "",
    plant_code: "",
    bu: "",
    accident_name: "",
    place: "",
    accident_category: "",
    injured_person: "",
    damage: "",
    circumstance: "",
    fact_finding: "",
    temporary_action: "",
    permanent_action: "",
  });

  // Image Upload State
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);

  // Generic Change Handler
  const handleChange = <T extends object>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    field: keyof T,
    value: string
  ) => {
    setter((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    processImageFiles(fileArray);
    // Reset input value to allow re-uploading same file if needed
    e.target.value = "";
  };

  // Process Image Files
  const processImageFiles = (fileArray: File[]) => {

    // Validation: Max 5 images
    if (uploadedImages.length + fileArray.length > 5) {
      toast.error("Maximum 5 images allowed!");
      return;
    }

    // Validation: File size and format
    const validFiles: ImageFile[] = [];
    for (const file of fileArray) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 2MB limit!`);
        continue;
      }

      // Check file format
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        toast.error(`${file.name} is not a valid image format!`);
        continue;
      }

      // Generate timestamp for unique naming
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0];
      const index = uploadedImages.length + validFiles.length + 1;
      const newFileName = `accident_report_${timestamp}_image${index}.${file.name
        .split(".")
        .pop()}`;

      validFiles.push({
        file: file,
        preview: URL.createObjectURL(file),
        name: newFileName,
      });
    }

    setUploadedImages((prev) => [...prev, ...validFiles]);
    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} image(s) uploaded successfully!`);
    }
  };

  // Handle Drag and Drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      processImageFiles(fileArray);
    }
  };

  // Handle Click to Open File Dialog
  const handleUploadClick = () => {
    document.getElementById("file-upload")?.click();
  };

  // Remove Image from Carousel
  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
    toast.success("Image removed!");
  };

  // Validate Target Form
  const validateTargetForm = (): boolean => {
    if (!targetForm.period_month) {
      toast.error("Please select Period (Month & Year)!");
      return false;
    }
    if (!targetForm.bu) {
      toast.error("Please select Business Unit!");
      return false;
    }
    if (!targetForm.accident_category) {
      toast.error("Please select Accident Category!");
      return false;
    }
    if (!targetForm.target_value.trim()) {
      toast.error("Please enter Target Value!");
      return false;
    }

    // Check if period is not in the future
    const selectedDate = new Date(targetForm.period_month + "-01");
    const now = new Date();
    if (selectedDate > now) {
      toast.error("Period cannot be in the future!");
      return false;
    }

    return true;
  };

  // Validate Accident Report Form
  const validateAccidentReport = (): boolean => {
    if (!accidentForm.accident_date) {
      toast.error("Please select Accident Date & Time!");
      return false;
    }
    if (!accidentForm.company_code) {
      toast.error("Please select Company Code!");
      return false;
    }
    if (!accidentForm.plant_code) {
      toast.error("Please select Plant Code!");
      return false;
    }
    if (!accidentForm.bu) {
      toast.error("Please select Business Unit!");
      return false;
    }
    if (!accidentForm.accident_name.trim()) {
      toast.error("Please enter Accident Name!");
      return false;
    }
    if (!accidentForm.place.trim()) {
      toast.error("Please enter Location/Place!");
      return false;
    }
    if (!accidentForm.accident_category) {
      toast.error("Please select Accident Category!");
      return false;
    }
    if (!accidentForm.injured_person.trim()) {
      toast.error("Please enter Number of Injured Persons!");
      return false;
    }
    if (parseInt(accidentForm.injured_person) < 0) {
      toast.error("Number of Injured Persons cannot be negative!");
      return false;
    }
    if (!accidentForm.damage.trim()) {
      toast.error("Please enter Damage Description!");
      return false;
    }
    if (!accidentForm.circumstance.trim()) {
      toast.error("Please enter Circumstance!");
      return false;
    }
    if (!accidentForm.fact_finding.trim()) {
      toast.error("Please enter Fact Finding!");
      return false;
    }
    if (!accidentForm.temporary_action.trim()) {
      toast.error("Please enter Temporary Action!");
      return false;
    }
    if (!accidentForm.permanent_action.trim()) {
      toast.error("Please enter Permanent Action!");
      return false;
    }

    // Check if accident date is not in the future
    const accidentDate = new Date(accidentForm.accident_date);
    const now = new Date();
    if (accidentDate > now) {
      toast.error("Accident Date cannot be in the future!");
      return false;
    }

    return true;
  };

  // Reset All Forms
  const resetForms = () => {
    setTargetForm({
      period_month: "",
      bu: "",
      accident_category: "",
      target_value: "",
    });
    setAccidentForm({
      accident_date: "",
      company_code: "",
      plant_code: "",
      bu: "",
      accident_name: "",
      place: "",
      accident_category: "",
      injured_person: "",
      damage: "",
      circumstance: "",
      fact_finding: "",
      temporary_action: "",
      permanent_action: "",
    });
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    setUploadedImages([]);
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = false;

    if (activeTab === "target") {
      isValid = validateTargetForm();
      if (isValid) {
        // Log form data
        console.log("=== TARGET TRAFFIC ACCIDENT SUBMISSION ===");
        console.log("Form Data:", targetForm);
        console.log("========================================");

        toast.success("Target Traffic Accident submitted successfully!");
      }
    } else {
      isValid = validateAccidentReport();
      if (isValid) {
        console.log("=== ACCIDENT REPORT SUBMISSION ===");
        console.log("Form Data:", accidentForm);
        console.log(
          "Uploaded Images:",
          uploadedImages.map((img) => img.name)
        );
        console.log("==================================");

        toast.success("Accident Report submitted successfully!");
      }
    }

    if (isValid) {
      resetForms();
    }
  };

  // Handle Clear Form
  const handleClearForm = () => {
    if (!window.confirm("Are you sure you want to clear all form data? This action cannot be undone.")) {
      return;
    }

    resetForms();
    toast.success("Form cleared successfully!");
  };

  return (
    <div className="h-full bg-[#EEE9E5] flex flex-col overflow-hidden">
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1864ab]">
              Safety Submission Form
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Submit safety targets and accident reports
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-t-xl shadow-md">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("target")}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-semibold transition-colors ${
                  activeTab === "target"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Target Traffic Accident
              </button>
              <button
                onClick={() => setActiveTab("accident")}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-semibold transition-colors ${
                  activeTab === "accident"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Accident Report
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-b-xl shadow-md p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === "target" ? (
                // TARGET TRAFFIC ACCIDENT FORM
                <>
                  {/* Period (Month & Year) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Period (Month & Year) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={targetForm.period_month}
                      onChange={(e) =>
                        handleChange(setTargetForm, "period_month", e.target.value)
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
                      value={targetForm.bu}
                      onChange={(e) => handleChange(setTargetForm, "bu", e.target.value)}
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

                  {/* Accident Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Accident Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={targetForm.accident_category}
                      onChange={(e) =>
                        handleChange(setTargetForm, "accident_category", e.target.value)
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

                  {/* Target Value */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Target Value <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={targetForm.target_value}
                      onChange={(e) =>
                        handleChange(setTargetForm, "target_value", e.target.value)
                      }
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
                        Accident Date & Time{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        value={accidentForm.accident_date}
                        onChange={(e) =>
                          handleChange(setAccidentForm, "accident_date", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange(setAccidentForm, "company_code", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange(setAccidentForm, "plant_code", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange(setAccidentForm, "bu", e.target.value)
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

                    {/* Accident Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Accident Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={accidentForm.accident_name}
                        onChange={(e) =>
                          handleChange(setAccidentForm, "accident_name", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange(setAccidentForm, "place", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChange(
                            setAccidentForm,
                            "accident_category",
                            e.target.value
                          )
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

                    {/* Number of Injured Persons */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Injured Persons{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={accidentForm.injured_person}
                        onChange={(e) =>
                          handleChange(setAccidentForm, "injured_person", e.target.value)
                        }
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
                      onChange={(e) =>
                        handleChange(setAccidentForm, "damage", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleChange(setAccidentForm, "circumstance", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleChange(setAccidentForm, "fact_finding", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleChange(setAccidentForm, "temporary_action", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleChange(setAccidentForm, "permanent_action", e.target.value)
                      }
                      placeholder="Enter permanent action"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* MODERN UPLOAD IMAGES SECTION */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Images
                    </label>
                    <div 
                      onClick={handleUploadClick}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group bg-gray-50"
                    >
                      <div className="space-y-1 text-center w-full">
                        {/* Cloud Icon */}
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        
                        <div className="flex text-sm text-gray-600 justify-center items-center">
                          <span className="font-medium text-blue-600">Click to upload</span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          JPG, JPEG, PNG up to 2MB (Max 5 images)
                        </p>
                      </div>
                    </div>
                    {/* Hidden File Input */}
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {/* Image Carousel Preview */}
                  {uploadedImages.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Image Preview ({uploadedImages.length}/3)
                      </label>
                      <ImageCarousel
                        images={uploadedImages}
                        onRemove={handleRemoveImage}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClearForm}
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
          </div>
        </div>
      </div>
    </div>
  );
};