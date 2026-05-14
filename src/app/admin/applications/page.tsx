"use client";

import { ApplicationFilterState } from "@/components/applications/Application.types";
import ApplicationFilters from "@/components/applications/ApplicationFilter";
import ApplicationTable from "@/components/applications/ApplicationTable";
import { MOCK_APPLICATIONS } from "@/components/data/application/mockData";
import React, { useMemo, useState } from "react";
import styles from "./applicationpage.module.scss";

const DEFAULT_FILTERS: ApplicationFilterState = {
  search: "",
  remarksSearch: "",
  applicantType: "all",
  district: "all",
  exam: "all",
  lastAction: "all",
  reviewer: "all",
  activeTab: "all",
};

const ApplicationsPage: React.FC = () => {
  const [filters, setFilters] =
    useState<ApplicationFilterState>(DEFAULT_FILTERS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // ── Filter logic (replace with RTK Query + backend params later) ─────────
  const filteredApplications = useMemo(() => {
    return MOCK_APPLICATIONS.filter((app) => {
      if (filters.activeTab !== "all" && app.status !== filters.activeTab)
        return false;
      if (
        filters.exam !== "all" &&
        app.exam.type.toLowerCase() !== filters.exam
      )
        return false;
      if (
        filters.district !== "all" &&
        app.location.district.toLowerCase() !== filters.district
      )
        return false;
      if (filters.applicantType === "within_mac" && app.location.isOutsideMAC)
        return false;
      if (filters.applicantType === "outside_mac" && !app.location.isOutsideMAC)
        return false;

      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          app.applicant.name.toLowerCase().includes(q) ||
          app.applicant.phone.includes(q) ||
          app.referenceNo.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [filters]);

  // ── Filter change handler ────────────────────────────────────────────────
  const handleFilterChange = <K extends keyof ApplicationFilterState>(
    key: K,
    value: ApplicationFilterState[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Clear selection when tab changes
    if (key === "activeTab") setSelectedIds(new Set());
  };

  // ── Row selection ────────────────────────────────────────────────────────
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(
      checked ? new Set(filteredApplications.map((a) => a.id)) : new Set(),
    );
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  // ── Action stubs (wire up dispatch/mutation calls later) ─────────────────
  const handleApprove = (id: string) => console.log("Approve:", id);
  const handleReject = (id: string) => console.log("Reject:", id);
  const handleViewDetails = (id: string) => console.log("View details:", id);
  const handleMarkScrutiny = (id: string) => console.log("Mark scrutiny:", id);
  const handleDownloadPdf = (id: string) => console.log("Download PDF:", id);
  const handleExcelExport = () => console.log("Export Excel");
  const handlePdfExport = () => console.log("Export PDF");

  return (
    <div className={styles.page}>
      <ApplicationFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        exportCount={filteredApplications.length}
        onExcelExport={handleExcelExport}
        onPdfExport={handlePdfExport}
      />

      <ApplicationTable
        applications={filteredApplications}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        onApprove={handleApprove}
        onReject={handleReject}
        onViewDetails={handleViewDetails}
        onMarkScrutiny={handleMarkScrutiny}
        onDownloadPdf={handleDownloadPdf}
      />
    </div>
  );
};

export default ApplicationsPage;
