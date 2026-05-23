"use client";

import ApplicationsSection from "@/components/admin-dashboard/ApplicationsSection";
import DashboardCharts from "@/components/admin-dashboard/DashboardCharts";
import StatCards from "@/components/admin-dashboard/StatsCard";
import type { StatCardItem } from "@/components/admin-dashboard/StatsCard/StatCards.types";
import { STAT_CARDS_CONFIG } from "@/components/data/dashboard/statCards.data";
import { useGetStatCardsQuery } from "@/redux/features/adminDashboard/dashboardApi";
import { notification } from "antd";
import { useEffect } from "react";
import styles from "./page.module.scss";

// ─────────────────────────────────────────────────────────
// Merges static UI config with live API values.
// ─────────────────────────────────────────────────────────

function buildStatCards(
  total: number,
  approved: number,
  rejected: number,
  pending: number,
  approvedPercentage: number,
): StatCardItem[] {
  const dataMap: Record<"total" | "approved" | "rejected" | "pending", number> =
    { total, approved, rejected, pending };

  return STAT_CARDS_CONFIG.map((config) => ({
    label: config.label,
    value: dataMap[config.key],
    subtitle: config.accentSubtitle
      ? `${approvedPercentage}% of total`
      : config.staticSubtitle,
    icon: config.icon,
    variant: config.variant,
    accentSubtitle: config.accentSubtitle,
  }));
}

// Shown while loading or on error — avoids misleading zeros
const PLACEHOLDER_CARDS: StatCardItem[] = STAT_CARDS_CONFIG.map((config) => ({
  label: config.label,
  value: "--",
  subtitle: config.staticSubtitle,
  icon: config.icon,
  variant: config.variant,
  accentSubtitle: config.accentSubtitle,
}));

// ─── Page ────────────────────────────────────────────────

export default function DashboardPage() {
  // ── Stat Cards ─────────────────────────────────────────
  const {
    data: statCardResponse,
    isLoading: statCardsLoading,
    isError: statCardsError,
  } = useGetStatCardsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Surface API errors so they're not silently swallowed as zeros
  useEffect(() => {
    if (statCardsError) {
      notification.error({
        message: "Failed to load dashboard stats",
        description:
          "Could not reach the server. Check your API URL and network.",
        duration: 5,
      });
    }
  }, [statCardsError]);

  const statCards: StatCardItem[] =
    !statCardsLoading && statCardResponse?.data
      ? buildStatCards(
          statCardResponse.data.total,
          statCardResponse.data.approved,
          statCardResponse.data.rejected,
          statCardResponse.data.pending,
          statCardResponse.data.approvedPercentage,
        )
      : PLACEHOLDER_CARDS;

  return (
    <div className={styles.dashboardPage}>
      <StatCards cards={statCards} isLoading={statCardsLoading} />

      {/* <MasterFilter
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
      /> */}
      <DashboardCharts />
      <ApplicationsSection />
    </div>
  );
}
