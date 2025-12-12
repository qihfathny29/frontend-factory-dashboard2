/**
 * Chart utility functions for data processing and calculations
 * Shared across Safety, Quality, and Delivery charts
 */

/**
 * Used for Safety AccidentChart, Quality ClaimChart, and Delivery Quality Issues chart
 * 
 * @param data - Array of monthly values to accumulate
 * @returns Array of cumulative sums
 */
export const calculateAccumulation = (data: readonly number[] | number[]): number[] => {
  const result: number[] = [];
  let runningTotal = 0;

  data.forEach((value) => {
    runningTotal += value;
    result.push(runningTotal);
  });

  return result;
};

export type PlantSelection = 'all' | 'fajar' | 'bekasi';

export interface PlantDataset {
  th: number[];
  pt: number[];
  elect: number[];
}

/**
 * Calculate total per month based on plant selection for Safety chart
 * 
 * @param data - Dataset containing TH, PT, and Elect data
 * @param selectedPlant - Selected plant filter
 * @param monthIndex - Month index to calculate
 * @returns Total value for the specified month
 */
export const getMonthTotalByPlant = (
  data: PlantDataset,
  selectedPlant: PlantSelection,
  monthIndex: number
): number => {
  if (selectedPlant === 'bekasi') {
    return data.th[monthIndex];
  } else if (selectedPlant === 'fajar') {
    return data.pt[monthIndex] + data.elect[monthIndex];
  } else {
    // 'all'
    return data.th[monthIndex] + data.pt[monthIndex] + data.elect[monthIndex];
  }
};

/**
 * Calculate accumulation with plant filtering for Safety chart
 * 
 * @param data - Dataset containing TH, PT, and Elect data
 * @param selectedPlant - Selected plant filter
 * @param monthCount - Number of months (default 12)
 * @returns Array of cumulative sums based on plant selection
 */
export const calculateAccumulationByPlant = (
  data: PlantDataset,
  selectedPlant: PlantSelection,
  monthCount: number = 12
): number[] => {
  const result: number[] = [];
  let runningTotal = 0;

  for (let i = 0; i < monthCount; i++) {
    const monthTotal = getMonthTotalByPlant(data, selectedPlant, i);
    runningTotal += monthTotal;
    result.push(runningTotal);
  }

  return result;
};

/**
 * Determine which datasets should be visible based on plant selection
 * 
 * @param selectedPlant - Selected plant filter
 * @returns Object indicating which datasets to show
 */
export const getVisibleDatasetsByPlant = (selectedPlant: PlantSelection) => {
  if (selectedPlant === 'bekasi') {
    return { showTH: true, showPT: false, showElect: false };
  } else if (selectedPlant === 'fajar') {
    return { showTH: false, showPT: true, showElect: true };
  } else {
    // 'all'
    return { showTH: true, showPT: true, showElect: true };
  }
};

/**
 * Quality chart plant visibility logic
 * Determines which datasets should be visible based on selected plants array
 * 
 * @param selectedPlants - Array of selected plant IDs
 * @returns Object indicating which datasets to show
 */
export const getVisibleDatasetsByPlants = (selectedPlants: string[]) => {
  const isAllSelected = selectedPlants.includes("all");
  const isFajarSelected = selectedPlants.includes("fajar");
  const isBekasiSelected = selectedPlants.includes("bekasi");

  return {
    showTH: isAllSelected || isBekasiSelected || (isFajarSelected && isBekasiSelected),
    showPT: isAllSelected || isFajarSelected || (isFajarSelected && isBekasiSelected),
    showElect: isAllSelected || isFajarSelected || (isFajarSelected && isBekasiSelected)
  };
};

/**
 * Check if target is achieved for quality issues
 * 
 * @param accumulationData - Accumulated data array
 * @param targetData - Target data array
 * @returns true if total accumulation is at or below total target
 */
export const isQualityTargetAchieved = (
  accumulationData: readonly number[] | number[],
  targetData: readonly number[] | number[]
): boolean => {
  const totalAccumulation = accumulationData[accumulationData.length - 1] || 0;
  const totalTarget = targetData.reduce((sum, value) => sum + value, 0);
  return totalAccumulation <= totalTarget;
};

/**
 * Check if target is achieved for ontime ratio
 * 
 * @param data - Monthly data array
 * @param target - Target data array
 * @returns true if average data meets or exceeds average target
 */
export const isOntimeTargetAchieved = (
  data: readonly number[] | number[],
  target: readonly number[] | number[]
): boolean => {
  const avgData = data.reduce((sum, val) => sum + val, 0) / data.length;
  const avgTarget = target.reduce((sum, val) => sum + val, 0) / target.length;
  return avgData >= avgTarget;
};

/**
 * Standard fiscal year months for charts
 */
export const FISCAL_MONTHS = [
  "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
] as const;

/**
 * Standard chart colors used across dashboards
 */
export const CHART_COLORS = {
  th: "rgba(59, 130, 246, 0.8)", // Blue
  pt: "rgba(34, 197, 94, 0.8)",  // Green
  elect: "rgba(168, 85, 247, 0.8)", // Purple
  target: "rgb(239, 68, 68)",    // Red
  accumulation: "rgb(59, 130, 246)", // Blue
  primary: "#A02B93",            // Purple
} as const;
