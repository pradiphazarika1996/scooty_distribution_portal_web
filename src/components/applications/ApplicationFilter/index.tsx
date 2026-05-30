"use client";

import { ApplicationFilterState } from "@/components/applications/Application.types";
import CustomSelect from "@/components/applications/CustomSelect";
import { useGetFilterOptionsQuery } from "@/redux/features/adminDashboard/applicationApi";
import {
  APPLICANT_TYPE_OPTIONS,
  EXAM_OPTIONS,
  GENDER_OPTIONS,
  LAST_ACTION_OPTIONS,
  REVIEWER_OPTIONS,
} from "@/utils/students/application";
import {
  ClockCircleOutlined,
  DownloadOutlined,
  FileTextOutlined,
  FilterOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React from "react";
import styles from "./ApplicationFilter.module.scss";

// ── Props ──────────────────────────────────────────────────

interface ApplicationFiltersProps {
  filters: ApplicationFilterState;
  onFilterChange: <K extends keyof ApplicationFilterState>(
    key: K,
    value: ApplicationFilterState[K],
  ) => void;
  exportCount?: number;
  excelLoading?: boolean;
  pdfLoading?: boolean;
  onExcelExport?: () => void;
  onPdfExport?: () => void;
}

// ── Component ─────────────────────────────────────────────

const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({
  filters,
  onFilterChange,
  exportCount = 0,
  excelLoading = false,
  pdfLoading = false,
  onExcelExport,
  onPdfExport,
}) => {
  const { data: filterOptionsResponse } = useGetFilterOptionsQuery();

  const districtOptions = [
    { value: "all", label: "All districts" },
    ...(filterOptionsResponse?.data?.districts ?? []).map((d) => ({
      value: String(d.id),
      label: d.name,
    })),
  ];

  return (
    <div className={styles.card}>
      <div className={styles.tabsRow} />

      {/* Row 1: search + dropdowns */}
      <div className={styles.filterRow}>
        <div className={`${styles.searchWrapper} ${styles.searchMain}`}>
          <span className={styles.searchIcon}>
            <SearchOutlined />
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search name, ref no, phone, email..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
          />
        </div>
        <CustomSelect
          options={APPLICANT_TYPE_OPTIONS}
          value={filters.applicantType}
          onChange={(v) => onFilterChange("applicantType", v)}
        />
        <CustomSelect
          options={districtOptions}
          value={filters.district}
          onChange={(v) => onFilterChange("district", v)}
        />
        <CustomSelect
          options={EXAM_OPTIONS}
          value={filters.exam}
          onChange={(v) => onFilterChange("exam", v)}
        />
        <CustomSelect
          options={GENDER_OPTIONS}
          value={filters.gender}
          onChange={(v) => onFilterChange("gender", v)}
        />
        <CustomSelect
          options={LAST_ACTION_OPTIONS}
          value={filters.lastAction}
          onChange={(v) => onFilterChange("lastAction", v)}
        />
        {/* <CustomSelect
          options={REVIEWER_OPTIONS}
          value={filters.reviewer}
          onChange={(v) => onFilterChange("reviewer", v)}
        /> */}
      </div>

      {/* Row 2: remarks search + export buttons */}
      <div className={styles.filterRow}>
        <div className={`${styles.searchWrapper} ${styles.searchRemarks}`}>
          <span className={styles.searchIcon}>
            <ClockCircleOutlined />
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search latest remarks..."
            value={filters.remarksSearch}
            onChange={(e) => onFilterChange("remarksSearch", e.target.value)}
          />
        </div>

        <div className={styles.exportGroup}>
          <button
            type="button"
            className={styles.exportBtn}
            onClick={onExcelExport}
            disabled={excelLoading}
            aria-label="Export Excel"
          >
            {excelLoading ? <LoadingOutlined spin /> : <DownloadOutlined />}
            <span>Excel</span>
            <span className={styles.exportCount}>({exportCount})</span>
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Advanced filters"
          >
            <FilterOutlined />
          </button>

          <button
            type="button"
            className={styles.exportBtn}
            onClick={onPdfExport}
            disabled={pdfLoading}
            aria-label="Export PDF"
          >
            {pdfLoading ? <LoadingOutlined spin /> : <FileTextOutlined />}
            <span>PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFilters;
