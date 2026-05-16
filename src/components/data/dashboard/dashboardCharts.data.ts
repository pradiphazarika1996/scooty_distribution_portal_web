export interface TrendDataPoint {
  month: string;
  applications: number;
  approved: number;
}

export interface DonutDataPoint {
  name: string;
  value: number;
}

// ── Trend chart ─────────────────────────────────────────────
// Apr values match confirmed tooltip: applications=1180, approved=780

export const TREND_DATA: TrendDataPoint[] = [
  { month: "Nov", applications: 320, approved: 200 },
  { month: "Dec", applications: 400, approved: 255 },
  { month: "Jan", applications: 530, approved: 330 },
  { month: "Feb", applications: 680, approved: 440 },
  { month: "Mar", applications: 860, approved: 560 },
  { month: "Apr", applications: 1180, approved: 780 },
  { month: "May", applications: 1530, approved: 940 },
];

// ── Donut chart ─────────────────────────────────────────────
// Colors are resolved at runtime in DonutChart via useChartColors.

export const DONUT_DATA: DonutDataPoint[] = [
  { name: "HSLC (Class X)", value: 4120 },
  { name: "HS (Class XII)", value: 2610 },
];
