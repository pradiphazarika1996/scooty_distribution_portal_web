// ── Stat Cards ─────────────────────────────────────────────

export interface StatCardData {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
  approvedPercentage: number;
}

export interface StatCardApiResponse {
  success: boolean;
  data: StatCardData;
}

// ── Donut Chart — Examination Split ───────────────────────

export interface ExamSplitData {
  hslc: number;
  hs: number;
}

export interface ExamSplitApiResponse {
  success: boolean;
  data: ExamSplitData;
}

// ── Recent Applications ────────────────────────────────────

export interface RecentApplicationItem {
  id: number;
  applicationNumber: string;
  studentName: string;
  examId: number;
  submittedAt: string | null;
  marksDisplay: string;
  applicationStatus: number;
}

export interface RecentApplicationsApiResponse {
  success: boolean;
  data: RecentApplicationItem[];
}

// Display-only badge label — frontend concern only
export type ApplicationStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Under Scrutiny";

// ── District Chart ─────────────────────────────────────────

export interface DistrictChartItem {
  district: string;
  count: number;
}

export interface DistrictChartApiResponse {
  success: boolean;
  data: DistrictChartItem[];
}

// ── Shared chart entry shape (used by Recharts) ────────────

export interface ChartEntry {
  name: string;
  value: number;
}

export interface TrendDataItem {
  month: string; // "Week 1" … "Week 5"
  applications: number;
}

export interface TrendDataApiResponse {
  success: boolean;
  data: TrendDataItem[];
}
 