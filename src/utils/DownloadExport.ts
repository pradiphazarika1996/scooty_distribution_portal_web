import axios from "axios";

// ── Types ──────────────────────────────────────────────────

export type ExportFormat = "excel" | "pdf";

export interface ExportParams {
  search?: string;
  remarksSearch?: string;
  applicantType?: string;
  district?: string;
  exam?: string;
  gender?: string;
  lastAction?: string;
  activeTab?: string;
}

// ── Utility ────────────────────────────────────────────────

const MIME: Record<ExportFormat, string> = {
  excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pdf: "application/pdf",
};
const EXT: Record<ExportFormat, string> = { excel: "xlsx", pdf: "pdf" };

/**
 * Downloads an export file from the backend with the currently active
 * filter params. Respects the same filters as the application table.
 *
 * @param format  - "excel" | "pdf"
 * @param params  - active filter state (undefined values are omitted)
 */
export async function downloadExport(
  format: ExportFormat,
  params: ExportParams,
): Promise<void> {
  const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const today = new Date().toISOString().split("T")[0];
  const filename = `applications_${today}.${EXT[format]}`;

  // Strip undefined/null values so they don't appear in the query string
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v != null && v !== ""),
  );

  const response = await axios.get(
    `${BASE}/admin/application/export/${format}`,
    {
      params: cleanParams,
      responseType: "blob",
      withCredentials: true,
    },
  );

  // Trigger browser download
  const url = window.URL.createObjectURL(
    new Blob([response.data], { type: MIME[format] }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
