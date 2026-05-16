"use client";

import ApplicationsSection from "@/components/admin-dashboard/ApplicationsSection";
import DashboardCharts from "@/components/admin-dashboard/DashboardCharts";
import MasterFilter from "@/components/admin-dashboard/MasterFilter";
import StatCards from "@/components/admin-dashboard/StatsCard";
import {
  CONSTITUENCY_OPTIONS,
  DISTRICT_OPTIONS,
  FILTER_STATS,
  PANCHAYAT_OPTIONS,
  VILLAGE_OPTIONS,
} from "@/components/data/dashboard/masterFilter.data";
import { STAT_CARDS } from "@/components/data/dashboard/statCards.data";
import { useState } from "react";
import styles from "./page.module.scss";

export default function DashboardPage() {
  // ── Cascading filter state ──────────────────────────────
  const [selectedDistrict, setSelectedDistrict] = useState<
    string | undefined
  >();
  const [selectedConstituency, setSelectedConstituency] = useState<
    string | undefined
  >();
  const [selectedPanchayat, setSelectedPanchayat] = useState<
    string | undefined
  >();
  const [selectedVillage, setSelectedVillage] = useState<string | undefined>();

  const handleDistrictChange = (value: string | undefined) => {
    setSelectedDistrict(value);
    setSelectedConstituency(undefined);
    setSelectedPanchayat(undefined);
    setSelectedVillage(undefined);
  };

  const handleConstituencyChange = (value: string | undefined) => {
    setSelectedConstituency(value);
    setSelectedPanchayat(undefined);
    setSelectedVillage(undefined);
  };

  const handlePanchayatChange = (value: string | undefined) => {
    setSelectedPanchayat(value);
    setSelectedVillage(undefined);
  };

  // Replace with real API-derived count
  const matchCount = selectedDistrict ? 2 : undefined;

  return (
    <div className={styles.dashboardPage}>
      <StatCards cards={STAT_CARDS} />

      <MasterFilter
        filterStats={FILTER_STATS}
        districtOptions={DISTRICT_OPTIONS}
        constituencyOptions={CONSTITUENCY_OPTIONS}
        panchayatOptions={PANCHAYAT_OPTIONS}
        villageOptions={VILLAGE_OPTIONS}
        selectedDistrict={selectedDistrict}
        selectedConstituency={selectedConstituency}
        selectedPanchayat={selectedPanchayat}
        selectedVillage={selectedVillage}
        matchCount={matchCount}
        onDistrictChange={handleDistrictChange}
        onConstituencyChange={handleConstituencyChange}
        onPanchayatChange={handlePanchayatChange}
        onVillageChange={setSelectedVillage}
        onExport={() => console.log("Export triggered")}
      />
      <DashboardCharts />
      <ApplicationsSection />
    </div>
  );
}
