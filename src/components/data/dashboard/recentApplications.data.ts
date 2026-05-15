export type ApplicationStatus = "Pending" | "Approved" | "Rejected" | "Under Scrutiny";

export interface RecentApplication {
  id: string;
  name: string;
  meta: string;
  percentage: string;
  status: ApplicationStatus;
}

export const RECENT_APPLICATIONS: RecentApplication[] = [
  {
    id: "MAC/2026/10001",
    name: "Pranjal Pegu",
    meta: "MAC/2026/10001 · HSLC 2024 · West Bengal",
    percentage: "66.71%",
    status: "Pending",
  },
  {
    id: "MAC/2026/10002",
    name: "Mridul Doley",
    meta: "MAC/2026/10002 · HS 2025 · Lakhimpur",
    percentage: "71.3%",
    status: "Approved",
  },
  {
    id: "MAC/2026/10003",
    name: "Hirakjyoti Mili",
    meta: "MAC/2026/10003 · HSLC 2024 · Sonitpur",
    percentage: "60.4%",
    status: "Rejected",
  },
  {
    id: "MAC/2026/10004",
    name: "Rashmita Taid",
    meta: "MAC/2026/10004 · HS 2025 · Biswanath",
    percentage: "65.34%",
    status: "Under Scrutiny",
  },
  {
    id: "MAC/2026/10005",
    name: "Jonali Pao",
    meta: "MAC/2026/10005 · HSLC 2024 · Majuli",
    percentage: "60.14%",
    status: "Pending",
  },
];