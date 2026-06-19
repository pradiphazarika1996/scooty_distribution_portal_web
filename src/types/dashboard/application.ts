import type {
  Application,
  ApplicationFilterState,
} from "@/components/applications/Application.types";

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

// ── Add to existing types/dashboard/application.ts ────────

export interface ApplicationDecisionPayload {
  id: number;
  remarks?: string;
}

export interface ApplicationActionApiResponse {
  success: boolean;
  data: {
    id: number;
    status: number;
  };
}

// ── Add to existing types/dashboard/application.ts ────────
// Matches the actual shape getDocuments returns: { documents: [...] }
// — note this does NOT follow the { success, data } pattern the rest
// of this API uses, since it's reusing the pre-existing student-side
// endpoint as-is.
// ── REPLACE the old ApplicationDocumentItem and GetDocumentsApiResponse
//    with these. The old ones matched the original reused getDocuments
//    shape ({ documents: [...] }, snake_case fields) which is no longer
//    what the backend returns — the new dedicated admin
//    DocumentController returns { success, data } with this shape:

export interface ApplicationDocumentItem {
  id:           number;
  docType:      number;
  docTypeName:  string;
  fileName:     string;
  fileType:     string;
  fileSize:     number;
  documentsUrl: string;
}

export interface ApplicationDocumentsApiResponse {
  success: boolean;
  data:    ApplicationDocumentItem[];
}