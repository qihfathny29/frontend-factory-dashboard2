// Configuration untuk semua tipe accident cards
export interface AccidentConfig {
  title: string;
  trendType: "increase" | "decrease" | "stable";
  trendValue: number;
  trendColor: string;
  fiscalYearValue: number;
}

export const ACCIDENT_TYPES: Record<string, AccidentConfig> = {
  ACCIDENT: {
    title: "Accident",
    trendType: "increase",
    trendValue: 2,
    trendColor: "red",
    fiscalYearValue: 0,
  },
  SUBCOUNT: {
    title: "Subcount Accident",
    trendType: "stable",
    trendValue: 0,
    trendColor: "green",
    fiscalYearValue: 0,
  },
  NEAR_MISS: {
    title: "Near Miss Accident",
    trendType: "stable",
    trendValue: 0,
    trendColor: "green",
    fiscalYearValue: 0,
  },
  SMOKE: {
    title: "Smoke",
    trendType: "stable",
    trendValue: 0,
    trendColor: "green",
    fiscalYearValue: 0,
  },
  FIRE: {
    title: "Fire Accident",
    trendType: "decrease",
    trendValue: 1,
    trendColor: "green",
    fiscalYearValue: 2,
  },
  TRAFFIC: {
    title: "Traffic Accident",
    trendType: "decrease",
    trendValue: 1,
    trendColor: "green",
    fiscalYearValue: 3,
  },
};

// Configuration untuk chart types
export interface ChartConfig {
  title: string;
  thData: number[];
  ptData: number[];
  electData: number[];
  targetData: number[];
}

export const CHART_TYPES: Record<string, ChartConfig> = {
  SAFETY: {
    title: "Safety Accident",
    thData: [1, 2, 1, 0, 1, 2, 1, 0, 1, 1, 0, 2],
    ptData: [1, 0, 1, 2, 1, 0, 1, 1, 0, 1, 2, 1],
    electData: [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    targetData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  FIRE: {
    title: "Fire Accident",
    thData: [2, 1, 2, 0, 1, 2, 1, 3, 1, 0, 2, 1],
    ptData: [1, 2, 0, 1, 2, 1, 0, 1, 2, 1, 1, 2],
    electData: [1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1],
    targetData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  TRAFFIC: {
    title: "Traffic Accident",
    thData: [2, 1, 2, 0, 1, 2, 1, 3, 1, 0, 2, 1],
    ptData: [1, 2, 0, 1, 2, 1, 0, 1, 2, 1, 1, 2],
    electData: [1, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1],
    targetData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
};
