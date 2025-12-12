// Shared Types for Safety Form

export type ImageFile = {
  file: File;
  preview: string;
  name: string;
};

export type TargetFormData = {
  period_month: string;
  bu: string;
  accident_category: string;
  target_value: string;
};

export type SubmittedTargetData = TargetFormData & {
  id: string;
  submit_date: string;
  update_date: string;
  update_by: string;
};

export type AccidentReportData = {
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
};

export const DROPDOWN_OPTIONS = {
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

// Dummy data for table
export const DUMMY_SUBMITTED_DATA: SubmittedTargetData[] = [
  {
    id: "1",
    period_month: "2024-12",
    bu: "Thermal",
    accident_category: "Traffic Accident",
    target_value: "5",
    submit_date: "2024-12-01 10:30",
    update_date: "2024-12-01 10:30",
    update_by: "admin"
  },
  {
    id: "2",
    period_month: "2024-11",
    bu: "Power Train",
    accident_category: "Fire Accident",
    target_value: "3",
    submit_date: "2024-11-15 14:20",
    update_date: "2024-11-16 09:15",
    update_by: "user123"
  },
  {
    id: "3",
    period_month: "2024-12",
    bu: "Electronic",
    accident_category: "Near Miss",
    target_value: "10",
    submit_date: "2024-12-05 11:45",
    update_date: "2024-12-05 11:45",
    update_by: "admin"
  },
  {
    id: "4",
    period_month: "2024-10",
    bu: "Thermal",
    accident_category: "Accident",
    target_value: "2",
    submit_date: "2024-10-20 08:30",
    update_date: "2024-10-21 13:45",
    update_by: "manager"
  },
  {
    id: "5",
    period_month: "2024-12",
    bu: "Power Train",
    accident_category: "Smoke",
    target_value: "1",
    submit_date: "2024-12-10 16:00",
    update_date: "2024-12-10 16:00",
    update_by: "user456"
  },
  {
    id: "6",
    period_month: "2024-09",
    bu: "Electronic",
    accident_category: "Accident Subcount",
    target_value: "7",
    submit_date: "2024-09-12 09:15",
    update_date: "2024-09-12 09:15",
    update_by: "supervisor"
  },
  {
    id: "7",
    period_month: "2024-11",
    bu: "Thermal",
    accident_category: "Near Miss",
    target_value: "8",
    submit_date: "2024-11-20 14:30",
    update_date: "2024-11-22 10:20",
    update_by: "admin"
  },
  {
    id: "8",
    period_month: "2024-10",
    bu: "Power Train",
    accident_category: "Traffic Accident",
    target_value: "4",
    submit_date: "2024-10-05 11:00",
    update_date: "2024-10-05 11:00",
    update_by: "user789"
  },
  {
    id: "9",
    period_month: "2024-12",
    bu: "Electronic",
    accident_category: "Fire Accident",
    target_value: "6",
    submit_date: "2024-12-08 15:45",
    update_date: "2024-12-09 08:30",
    update_by: "manager"
  },
  {
    id: "10",
    period_month: "2024-09",
    bu: "Thermal",
    accident_category: "Smoke",
    target_value: "3",
    submit_date: "2024-09-25 13:20",
    update_date: "2024-09-25 13:20",
    update_by: "user123"
  },
  {
    id: "11",
    period_month: "2024-11",
    bu: "Power Train",
    accident_category: "Accident",
    target_value: "9",
    submit_date: "2024-11-30 16:15",
    update_date: "2024-12-01 09:45",
    update_by: "supervisor"
  },
];
