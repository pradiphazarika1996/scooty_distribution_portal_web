import type { StatCardItem } from "@/components/admin-dashboard/StatsCard/StatCards.types";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

// ─────────────────────────────────────────────────────────
// All dashboard stat card definitions live here.
// To add, remove, or reorder cards — edit only this file.
// ─────────────────────────────────────────────────────────

export const STAT_CARDS: StatCardItem[] = [
  {
    label: "Total Applications",
    value: "7,230",
    subtitle: "Across MAC area & outside",
    icon: <FileTextOutlined />,
    variant: "primary",
  },
  {
    label: "Approved",
    value: "4,120",
    subtitle: "57% of total",
    icon: <CheckCircleOutlined />,
    variant: "success",
    accentSubtitle: true,
  },
  {
    label: "Rejected",
    value: 612,
    subtitle: "With remarks recorded",
    icon: <CloseCircleOutlined />,
    variant: "error",
  },
  {
    label: "Pending",
    value: 2498,
    subtitle: "Awaiting scrutiny",
    icon: <ClockCircleOutlined />,
    variant: "tertiary",
  },
];
