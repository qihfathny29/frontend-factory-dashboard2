// ========================================
// Configuration untuk Dashboard mfg Components
// ========================================

// 1. PIE CHART CARD CONFIG
export interface PieChartConfig {
  title: string;
  colors: [string, string]; // [primary, secondary]
}

export const PIE_CHART_TYPES: Record<string, PieChartConfig> = {
  OPERATING_RATE: {
    title: "Operating Rate",
    colors: ["#637CEF", "#E3008C"],
  },
  NG_RATIO: {
    title: "NG Ratio",
    colors: ["#E3008C", "#637CEF"],
  },
};

// 2. SHIFT COMPARISON CARD CONFIG
export interface ShiftComparisonConfig {
  title: string;
  formatType: "decimal" | "number" | "locale"; // decimal: 4.134, number: 4134, locale: 4,134
}

export const SHIFT_COMPARISON_TYPES: Record<string, ShiftComparisonConfig> = {
  PRODUCTION: {
    title: "Production Qty (pcs)",
    formatType: "decimal",
  },
  MANPOWER: {
    title: "Manpower (person)",
    formatType: "number",
  },
  OVERTIME: {
    title: "Overtime (hr)",
    formatType: "locale",
  },
};

// 3. TREND COMPARISON CARD CONFIG
export interface TrendComparisonConfig {
  title: string;
  suffix: string; // "", "%", "hr", etc
  trendLogic: "inverse" | "normal"; // inverse: naik = bad (red), turun = good (green) | normal: naik = good, turun = bad
}

export const TREND_COMPARISON_TYPES: Record<string, TrendComparisonConfig> = {
  LOSS_TIME: {
    title: "Loss Time (hr)",
    suffix: "",
    trendLogic: "inverse", // Loss Time: naik = bad (red)
  },
  NG_REWORK: {
    title: "NG Rework Ratio",
    suffix: "%",
    trendLogic: "normal", // NG Rework: always green (typo in original?)
  },
  NG_SCRAP: {
    title: "NG Scrap Ratio",
    suffix: "%",
    trendLogic: "inverse", // NG Scrap: always red in original
  },
};

// 4. KAIZEN TABLE CONFIG
export interface KaizenTableConfig {
  title: string;
}

export const KAIZEN_TABLE_TYPES: Record<string, KaizenTableConfig> = {
  OR_ISSUE: {
    title: "O/R Issue Kaizen Plan Sheet",
  },
  NG_LOSS_TIME: {
    title: "NG/Loss Time Kaizen Plan Sheet",
  },
};

// 5. KPS PROGRESS CONFIG
export interface KPSProgressConfig {
  title: string;
}

export const KPS_PROGRESS_TYPES: Record<string, KPSProgressConfig> = {
  OR_ISSUE: {
    title: "O/R Issue KPS Progress",
  },
  NG_ISSUE: {
    title: "N/G Issue KPS Progress",
  },
};
