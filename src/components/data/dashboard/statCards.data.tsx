import type { ColorVariant } from "@/components/admin-dashboard/StatsCard/StatCards.types";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type React from "react";

// ─────────────────────────────────────────────────────────
// Static UI metadata for each stat card.
// Values (count, subtitle) are derived from the API response.
// To add/remove/reorder cards — edit only this file.
// ─────────────────────────────────────────────────────────

// Only the four fields that represent card counts.
// Excludes approvedPercentage — that's used for the subtitle, not the value.
type StatCardKey = "total" | "approved" | "rejected" | "pending";

interface StatCardConfig {
  key: StatCardKey;
  label: string;
  staticSubtitle: string; // shown when accentSubtitle is false
  icon: React.ReactElement;
  variant: ColorVariant;
  accentSubtitle?: boolean; // when true, subtitle is built from API data
}

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    key: "total",
    label: "Total Applications",
    staticSubtitle: "Across MAC area & outside",
    icon: <FileTextOutlined />,
    variant: "primary",
  },
  {
    key: "approved",
    label: "Approved",
    staticSubtitle: "", // overridden dynamically using approvedPercentage
    icon: <CheckCircleOutlined />,
    variant: "success",
    accentSubtitle: true,
  },
  {
    key: "rejected",
    label: "Rejected",
    staticSubtitle: "With remarks recorded",
    icon: <CloseCircleOutlined />,
    variant: "error",
  },
  {
    key: "pending",
    label: "Pending",
    staticSubtitle: "Awaiting scrutiny",
    icon: <ClockCircleOutlined />,
    variant: "tertiary",
  },
];
