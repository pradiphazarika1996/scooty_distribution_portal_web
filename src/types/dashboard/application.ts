import type { ApplicationFilterState } from "@/components/applications/Application.types";
import type { Application } from "@/components/applications/Application.types";

// ── getApplications ────────────────────────────────────────

export interface GetApplicationsApiResponse {
  success: boolean;
  data: {
    applications: Application[]; // reuses the shared Application interface directly
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetApplicationsQueryParams {
  search?: string;
  remarksSearch?: string;
  applicantType?: string;
  district?: string;
  exam?: string;
  gender?: string;
  lastAction?: string;
  activeTab?: string;
  page?: number;
  limit?: number;
}

// ── getFilterOptions ───────────────────────────────────────

export interface DistrictOption {
  id: number;
  name: string;
}

export interface GetFilterOptionsApiResponse {
  success: boolean;
  data: {
    districts: DistrictOption[];
  };
}


// ── Fix 1 & 2: constants extracted from hook file into their own file ──
// Constants must never live inside hook files — they're independent
// values that any file may need to import without pulling in hook logic.

export const PAGE_SIZE = 15;

export const DEFAULT_FILTERS: ApplicationFilterState = {
  search: "",
  remarksSearch: "",
  applicantType: "all",
  district: "all",
  exam: "all",
  gender: "all",
  lastAction: "all",
  reviewer: "all",
  activeTab: "all",
};