import type { ApplicationFilterState } from "@/components/applications/Application.types";
import { useDebouncedValue } from "@/hooks/useDebounceValue";
import { useGetApplicationsQuery } from "@/redux/features/adminDashboard/applicationApi";
import { downloadExport } from "@/utils/DownloadExport";
import { notification } from "antd";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_FILTERS, PAGE_SIZE } from "@/types/dashboard/application";

// ─────────────────────────────────────────────────────────
// useApplicationTable
//
// Single responsibility: manages all state and side effects
// for the application table page.
//
// useDebouncedValue  — necessary: text inputs fire onChange on
//   every keystroke; debounce prevents an API call per character.
//
// useMemo(queryParams) — necessary: RTK Query uses reference
//   equality on its argument; without memo, a new object on
//   every render causes redundant cache misses and extra fetches.
//
// useCallback(handlers) — necessary: handler functions passed
//   as props to child components create new references on every
//   render without useCallback, forcing children to re-render
//   even when no data changed.
//
// isFetching vs isLoading — isFetching is true on every
//   in-flight request; isLoading is only true on the very first
//   fetch. Using isLoading hides the loading state on all
//   subsequent filter/page changes.
// ─────────────────────────────────────────────────────────

export function useApplicationTable() {
  const [filters, setFilters] =
    useState<ApplicationFilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [excelLoading, setExcelLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  // Debounce text inputs only — dropdowns update immediately
  const debouncedSearch = useDebouncedValue(filters.search, 400);
  const debouncedRemarksSearch = useDebouncedValue(filters.remarksSearch, 400);

  // Stable query object — only recreated when a value actually changes
  const queryParams = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      remarksSearch: debouncedRemarksSearch || undefined,
      applicantType:
        filters.applicantType !== "all" ? filters.applicantType : undefined,
      district: filters.district !== "all" ? filters.district : undefined,
      exam: filters.exam !== "all" ? filters.exam : undefined,
      gender: filters.gender !== "all" ? filters.gender : undefined,
      lastAction: filters.lastAction !== "all" ? filters.lastAction : undefined,
      activeTab: filters.activeTab !== "all" ? filters.activeTab : undefined,
      page,
      limit: PAGE_SIZE,
    }),
    [
      debouncedSearch,
      debouncedRemarksSearch,
      filters.applicantType,
      filters.district,
      filters.exam,
      filters.gender,
      filters.lastAction,
      filters.activeTab,
      page,
    ],
  );

  // Export params = same filters, no pagination — derived, not duplicated
  const exportParams = useMemo(() => {
    const { page: _p, limit: _l, ...rest } = queryParams;
    return rest;
  }, [queryParams]);

  const {
    data: response,
    isFetching,
    isError,
  } = useGetApplicationsQuery(queryParams, { refetchOnMountOrArgChange: true });

  const applications = response?.data?.applications ?? [];
  const total = response?.data?.total ?? 0;

  // ── Fix 3: useCallback on all handlers ────────────────
  // Stable function references prevent unnecessary re-renders
  // of ApplicationTable and ApplicationFilters.

  const handleFilterChange = useCallback(
    <K extends keyof ApplicationFilterState>(
      key: K,
      value: ApplicationFilterState[K],
    ) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
      if (key === "activeTab") setSelectedIds(new Set());
    },
    [],
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedIds(
        checked ? new Set(applications.map((a) => a.id)) : new Set(),
      );
    },
    [applications],
  );

  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }, []);

  const handlePageChange = useCallback((p: number) => {
    setPage(p);
    setSelectedIds(new Set());
  }, []);

  const handleExcelExport = useCallback(async () => {
    setExcelLoading(true);
    try {
      await downloadExport("excel", exportParams);
    } catch {
      notification.error({
        message: "Export failed",
        description: "Could not generate Excel file. Please try again.",
        duration: 4,
      });
    } finally {
      setExcelLoading(false);
    }
  }, [exportParams]);

  const handlePdfExport = useCallback(async () => {
    setPdfLoading(true);
    try {
      await downloadExport("pdf", exportParams);
    } catch {
      notification.error({
        message: "Export failed",
        description: "Could not generate PDF file. Please try again.",
        duration: 4,
      });
    } finally {
      setPdfLoading(false);
    }
  }, [exportParams]);

  return {
    // State
    filters,
    page,
    selectedIds,
    excelLoading,
    pdfLoading,
    // Data
    applications,
    total,
    isFetching,
    isError,
    // Handlers
    handleFilterChange,
    handleSelectAll,
    handleSelectRow,
    handlePageChange,
    handleExcelExport,
    handlePdfExport,
  };
}
