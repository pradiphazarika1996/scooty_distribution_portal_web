import {
  DownOutlined,
  DownloadOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import styles from "./MasterFilter.module.scss";
import type { FilterOption, MasterFilterProps } from "./MasterFilter.types";

interface CustomSelectProps {
  placeholder: string;
  options: FilterOption[];
  value?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}) => (
  <div
    className={`${styles.selectWrapper} ${disabled ? styles.selectWrapperDisabled : ""}`}
  >
    <select
      className={`${styles.select} ${!value ? styles.selectPlaceholder : ""}`}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || undefined)}
      disabled={disabled}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <DownOutlined className={styles.chevron} />
  </div>
);

const MasterFilter: React.FC<MasterFilterProps> = ({
  filterStats,
  districtOptions,
  constituencyOptions,
  panchayatOptions,
  villageOptions,
  selectedDistrict,
  selectedConstituency,
  selectedPanchayat,
  selectedVillage,
  matchCount,
  onDistrictChange,
  onConstituencyChange,
  onPanchayatChange,
  onVillageChange,
  onExport,
}) => {
  const subtitle = `District → Constituency → Panchayat → Village hierarchy (${filterStats.districts} districts · ${filterStats.constituencies} constituencies · ${filterStats.villages.toLocaleString()} villages)`;

  return (
    <div className={styles.filterCard}>
      {/* ── Header ── */}
      <div className={styles.cardHeader}>
        <div className={styles.titleSection}>
          <EnvironmentOutlined className={styles.titleIcon} />
          <span className={styles.titleText}>Master Search &amp; Filter</span>
        </div>
        <Button
          icon={<DownloadOutlined />}
          onClick={onExport}
          className={styles.exportBtn}
        >
          Export filtered (Excel)
        </Button>
      </div>

      {/* ── Subtitle ── */}
      <p className={styles.subtitle}>{subtitle}</p>

      {/* ── Cascading dropdowns ── */}
      <div className={styles.dropdownGrid}>
        <CustomSelect
          placeholder="All districts"
          options={districtOptions}
          value={selectedDistrict}
          onChange={onDistrictChange}
        />
        <CustomSelect
          placeholder="All constituencies"
          options={constituencyOptions}
          value={selectedConstituency}
          onChange={onConstituencyChange}
          disabled={!selectedDistrict}
        />
        <CustomSelect
          placeholder="Panchayat"
          options={panchayatOptions}
          value={selectedPanchayat}
          onChange={onPanchayatChange}
          disabled={!selectedConstituency}
        />
        <CustomSelect
          placeholder="Village"
          options={villageOptions}
          value={selectedVillage}
          onChange={onVillageChange}
          disabled={!selectedPanchayat}
        />
      </div>

      {/* ── Match count ── */}
      {matchCount !== undefined && (
        <p className={styles.matchText}>
          <span className={styles.matchCount}>{matchCount}</span> applications
          match current filters
        </p>
      )}
    </div>
  );
};

export default MasterFilter;
