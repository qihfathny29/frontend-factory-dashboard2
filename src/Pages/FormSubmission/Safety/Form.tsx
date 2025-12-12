import React from "react";
import { ConfirmationModal } from "../../../Components/ConfirmationModal";
import { useSafetyForm } from "./hooks/useSafetyForm";
import { InputSection } from "./components/InputSection";
import { TargetTable } from "./components/TargetTable";
import { EditModal } from "./components/EditModal";

export const SafetyForm: React.FC = () => {
  const {
    // States
    mainTab,
    setMainTab,
    activeTab,
    setActiveTab,
    targetForm,
    setTargetForm,
    accidentForm,
    setAccidentForm,
    editFormData,
    setEditFormData,
    uploadedImages,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    showClearModal,
    setShowClearModal,
    showDeleteModal,
    setShowDeleteModal,
    setDeleteTargetId,
    showEditModal,
    
    // Handlers
    handleChange,
    processImageFiles,
    handleRemoveImage,
    getFilteredData,
    getPaginatedData,
    handleEdit,
    handleSaveEdit,
    handleCancelEditModal,
    handleDeleteClick,
    confirmDelete,
    handleSubmit,
    handleClearFormClick,
    confirmClearForm,
  } = useSafetyForm();

  // Calculate pagination info
  const filteredData = getFilteredData();
  const paginatedData = getPaginatedData();
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginationInfo = {
    showing: paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0,
    to: Math.min(currentPage * itemsPerPage, filteredData.length),
    total: filteredData.length,
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
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

          {/* Parent Tabs */}
          <div className="bg-white rounded-t-xl shadow-md">
            <div className="flex border-b border-gray-200">
              <button
                type="button"
                onClick={() => setMainTab("input")}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-semibold transition-colors ${
                  mainTab === "input"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Input
              </button>
              <button
                type="button"
                onClick={() => setMainTab("table")}
                className={`flex-1 px-4 py-3 text-sm sm:text-base font-semibold transition-colors ${
                  mainTab === "table"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Table Target Accident
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-b-xl shadow-md p-4 sm:p-6">
            {mainTab === "input" ? (
              <InputSection
                activeTab={activeTab}
                onTabChange={setActiveTab}
                targetForm={targetForm}
                accidentForm={accidentForm}
                uploadedImages={uploadedImages}
                onTargetFormChange={(field, value) => handleChange(setTargetForm, field, value)}
                onAccidentFormChange={(field, value) => handleChange(setAccidentForm, field, value)}
                onImageUpload={processImageFiles}
                onRemoveImage={handleRemoveImage}
                onSubmit={handleSubmit}
                onClearForm={handleClearFormClick}
              />
            ) : (
              <TargetTable
                data={paginatedData}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                paginationInfo={paginationInfo}
              />
            )}
          </div>

          {/* Clear Form Confirmation Modal */}
          <ConfirmationModal
            isOpen={showClearModal}
            onClose={() => setShowClearModal(false)}
            onConfirm={confirmClearForm}
            title="Clear Form"
            message="Are you sure you want to clear all form data? This action cannot be undone."
            confirmText="Clear"
            cancelText="Cancel"
            confirmColor="bg-gray-600 hover:bg-gray-700"
          />

          {/* Delete Confirmation Modal */}
          <ConfirmationModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setDeleteTargetId(null);
            }}
            onConfirm={confirmDelete}
            title="Delete Record"
            message="Are you sure you want to delete this record? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            confirmColor="bg-red-600 hover:bg-red-700"
          />

          {/* Edit Modal */}
          <EditModal
            isOpen={showEditModal}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            onSave={handleSaveEdit}
            onCancel={handleCancelEditModal}
          />
        </div>
      </div>
    </div>
  );
};