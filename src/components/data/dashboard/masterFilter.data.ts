import type {
  FilterOption,
  FilterStats,
} from "@/components/admin-dashboard/MasterFilter/MasterFilter.types";

// ─────────────────────────────────────────────────────────
// Static seed data for the Master Filter dropdowns.
// In production, replace these with API responses.
// ─────────────────────────────────────────────────────────

export const FILTER_STATS: FilterStats = {
  districts: 11,
  constituencies: 40,
  villages: 1575,
};

export const DISTRICT_OPTIONS: FilterOption[] = [
  { label: "Dhemaji", value: "dhemaji" },
  { label: "Lakhimpur", value: "lakhimpur" },
  { label: "Biswanath", value: "biswanath" },
  { label: "Sonitpur", value: "sonitpur" },
  { label: "Darrang", value: "darrang" },
  { label: "Udalguri", value: "udalguri" },
  { label: "Baksa", value: "baksa" },
  { label: "Nalbari", value: "nalbari" },
  { label: "Kamrup", value: "kamrup" },
  { label: "Chirang", value: "chirang" },
  { label: "Kokrajhar", value: "kokrajhar" },
];

export const CONSTITUENCY_OPTIONS: FilterOption[] = [
  { label: "All constituencies", value: "all" },
  { label: "Dhemaji", value: "dhemaji-const" },
  { label: "Jonai", value: "jonai" },
  { label: "Sissiborgaon", value: "sissiborgaon" },
  { label: "Dhakuakhana", value: "dhakuakhana" },
];

export const PANCHAYAT_OPTIONS: FilterOption[] = [
  { label: "Panchayat 1", value: "p1" },
  { label: "Panchayat 2", value: "p2" },
  { label: "Panchayat 3", value: "p3" },
];

export const VILLAGE_OPTIONS: FilterOption[] = [
  { label: "Village 1", value: "v1" },
  { label: "Village 2", value: "v2" },
  { label: "Village 3", value: "v3" },
];
