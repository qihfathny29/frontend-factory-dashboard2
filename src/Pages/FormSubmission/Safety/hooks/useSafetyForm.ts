import { useState } from "react";
import { toast } from "react-toastify";
import type {
  TargetFormData,
  AccidentReportData,
  SubmittedTargetData,
  ImageFile,
} from "../types";
import { DUMMY_SUBMITTED_DATA } from "../types";

export const useSafetyForm = () => {
  // Tab states
  const [mainTab, setMainTab] = useState<"input" | "table">("input");
  const [activeTab, setActiveTab] = useState<"target" | "accident">("target");

  // Modal states
  const [showClearModal, setShowClearModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [targetForm, setTargetForm] = useState<TargetFormData>({
    period_month: "",
    bu: "",
    accident_category: "",
    target_value: "",
  });

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

  const [editFormData, setEditFormData] = useState<TargetFormData>({
    period_month: "",
    bu: "",
    accident_category: "",
    target_value: "",
  });

  // Image states
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);

  // Table states
  const [tableData, setTableData] = useState<SubmittedTargetData[]>(DUMMY_SUBMITTED_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Generic Change Handler
  const handleChange = <T extends object>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    field: keyof T,
    value: string
  ) => {
    setter((prev) => ({ ...prev, [field]: value }));
  };

  // Image Upload Handlers
  const processImageFiles = (fileArray: File[]) => {
    if (uploadedImages.length + fileArray.length > 5) {
      toast.error("Maximum 5 images allowed!");
      return;
    }

    const validFiles: ImageFile[] = [];
    for (const file of fileArray) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 2MB limit!`);
        continue;
      }

      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        toast.error(`${file.name} is not a valid image format!`);
        continue;
      }

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

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
    toast.success("Image removed!");
  };

  // Validation Functions
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

    const selectedDate = new Date(targetForm.period_month + "-01");
    const now = new Date();
    if (selectedDate > now) {
      toast.error("Period cannot be in the future!");
      return false;
    }

    return true;
  };

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

    const accidentDate = new Date(accidentForm.accident_date);
    const now = new Date();
    if (accidentDate > now) {
      toast.error("Accident Date cannot be in the future!");
      return false;
    }

    return true;
  };

  const validateEditForm = (): boolean => {
    if (!editFormData.period_month) {
      toast.error("Please select Period (Month & Year)!");
      return false;
    }
    if (!editFormData.bu) {
      toast.error("Please select Business Unit!");
      return false;
    }
    if (!editFormData.accident_category) {
      toast.error("Please select Accident Category!");
      return false;
    }
    if (!editFormData.target_value.trim()) {
      toast.error("Please enter Target Value!");
      return false;
    }

    const selectedDate = new Date(editFormData.period_month + "-01");
    const now = new Date();
    if (selectedDate > now) {
      toast.error("Period cannot be in the future!");
      return false;
    }

    return true;
  };

  // Table Functions
  const getFilteredData = () => {
    if (!searchQuery.trim()) return tableData;
    
    const query = searchQuery.toLowerCase();
    return tableData.filter((item) => 
      item.accident_category.toLowerCase().includes(query) ||
      item.period_month.toLowerCase().includes(query) ||
      item.bu.toLowerCase().includes(query)
    );
  };

  const getPaginatedData = () => {
    const filtered = getFilteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  // CRUD Operations
  const handleEdit = (item: SubmittedTargetData) => {
    setEditFormData({
      period_month: item.period_month,
      bu: item.bu,
      accident_category: item.accident_category,
      target_value: item.target_value,
    });
    setEditingId(item.id);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!validateEditForm()) return;

    const session = localStorage.getItem("user_sessions");
    let username = "guest";
    if (session) {
      try {
        const { username: sessionUsername } = JSON.parse(session);
        username = sessionUsername;
      } catch {
        // Keep default username
      }
    }

    setTableData((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              ...editFormData,
              update_date: new Date().toLocaleString("sv-SE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).replace(" ", " "),
              update_by: username,
            }
          : item
      )
    );

    toast.success("Record updated successfully!");
    setShowEditModal(false);
    setEditingId(null);
    setEditFormData({
      period_month: "",
      bu: "",
      accident_category: "",
      target_value: "",
    });
  };

  const handleCancelEditModal = () => {
    setShowEditModal(false);
    setEditingId(null);
    setEditFormData({
      period_month: "",
      bu: "",
      accident_category: "",
      target_value: "",
    });
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!deleteTargetId) return;
    
    setTableData((prev) => prev.filter((item) => item.id !== deleteTargetId));
    toast.success("Record deleted successfully!");
    
    const newTotalPages = Math.ceil((getFilteredData().length - 1) / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
    
    setDeleteTargetId(null);
  };

  // Form Handlers
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = false;

    if (activeTab === "target") {
      isValid = validateTargetForm();
      if (isValid) {
        console.log("=== TARGET ACCIDENT SUBMISSION ===");
        console.log("Form Data:", targetForm);
        console.log("========================================");
        toast.success("Target Accident submitted successfully!");
      }
    } else {
      isValid = validateAccidentReport();
      if (isValid) {
        console.log("=== ACCIDENT REPORT SUBMISSION ===");
        console.log("Form Data:", accidentForm);
        console.log("Uploaded Images:", uploadedImages.map((img) => img.name));
        console.log("==================================");
        toast.success("Accident Report submitted successfully!");
      }
    }

    if (isValid) {
      resetForms();
    }
  };

  const handleClearFormClick = () => {
    setShowClearModal(true);
  };

  const confirmClearForm = () => {
    resetForms();
    toast.success("Form cleared successfully!");
  };

  return {
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
    tableData,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    showClearModal,
    setShowClearModal,
    showDeleteModal,
    setShowDeleteModal,
    deleteTargetId,
    setDeleteTargetId,
    showEditModal,
    editingId,
    
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
  };
};
