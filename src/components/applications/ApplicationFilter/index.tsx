"use client";

import {
  ApplicationFilterState,
  TabKey,
} from "@/components/applications/Application.types";
import CustomSelect from "@/components/applications/CustomSelect";
// import StatusTabs from "@/components/applications/StatusTab";
import {
  APPLICANT_TYPE_OPTIONS,
  DISTRICT_OPTIONS,
  EXAM_OPTIONS,
  LAST_ACTION_OPTIONS,
  REVIEWER_OPTIONS,
  TAB_DATA,
} from "@/components/data/application/mockData";
import React from "react";
import styles from "./ApplicationFilter.module.scss";

// ── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 12C9.53757 12 12 9.53757 12 6.5C12 3.46243 9.53757 1 6.5 1C3.46243 1 1 3.46243 1 6.5C1 9.53757 3.46243 12 6.5 12Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14L11 11"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M7.5 4.5V7.5L9.5 9.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 1V10M7.5 10L4.5 7M7.5 10L10.5 7"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.5 12H13.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const FileTextIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 1H3C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H12C12.5523 14 13 13.5523 13 13V5L9 1Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M9 1V5H13"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M5 8H10M5 10.5H8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const FilterIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 4H13M4 7.5H11M6 11H9"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

// ── Component ────────────────────────────────────────────────────────────────

interface ApplicationFiltersProps {
  filters: ApplicationFilterState;
  onFilterChange: <K extends keyof ApplicationFilterState>(
    key: K,
    value: ApplicationFilterState[K],
  ) => void;
  exportCount?: number;
  onExcelExport?: () => void;
  onPdfExport?: () => void;
}

const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({
  filters,
  onFilterChange,
  exportCount = 12,
  onExcelExport,
  onPdfExport,
}) => {
  return (
    <div className={styles.card}>
      {/* Status Tabs */}
      <div className={styles.tabsRow}>
        {/* <StatusTabs
          tabs={TAB_DATA}
          activeTab={filters.activeTab}
          onTabChange={(tab: TabKey) => onFilterChange("activeTab", tab)}
        /> */}
      </div>

      {/* Filter Row 1: main search + dropdowns */}
      <div className={styles.filterRow}>
        <div className={`${styles.searchWrapper} ${styles.searchMain}`}>
          <span className={styles.searchIcon}>
            <SearchIcon />
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
          onChange={(val) => onFilterChange("applicantType", val)}
        />
        <CustomSelect
          options={DISTRICT_OPTIONS}
          value={filters.district}
          onChange={(val) => onFilterChange("district", val)}
        />
        <CustomSelect
          options={EXAM_OPTIONS}
          value={filters.exam}
          onChange={(val) => onFilterChange("exam", val)}
        />
        <CustomSelect
          options={LAST_ACTION_OPTIONS}
          value={filters.lastAction}
          onChange={(val) => onFilterChange("lastAction", val)}
        />
        <CustomSelect
          options={REVIEWER_OPTIONS}
          value={filters.reviewer}
          onChange={(val) => onFilterChange("reviewer", val)}
        />
      </div>

      {/* Filter Row 2: remarks search + export buttons */}
      <div className={styles.filterRow}>
        <div className={`${styles.searchWrapper} ${styles.searchRemarks}`}>
          <span className={styles.searchIcon}>
            <ClockIcon />
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
          >
            <DownloadIcon />
            <span>Excel</span>
            <span className={styles.exportCount}>({exportCount})</span>
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Advanced filters"
          >
            <FilterIcon />
          </button>

          <button
            type="button"
            className={styles.exportBtn}
            onClick={onPdfExport}
          >
            <FileTextIcon />
            <span>PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFilters;
