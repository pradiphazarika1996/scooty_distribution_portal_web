import {
  Application,
  SelectOption,
  TabItem,
} from "@/components/applications/Application.types";

export const TAB_DATA: TabItem[] = [
  { key: "all", label: "All", count: 28 },
  { key: "pending", label: "Pending", count: 7 },
  { key: "under_scrutiny", label: "Under Scrutiny", count: 7 },
  { key: "approved", label: "Approved", count: 7 },
  { key: "rejected", label: "Rejected", count: 7 },
];

export const APPLICANT_TYPE_OPTIONS: SelectOption[] = [
  { value: "all", label: "All applicants" },
  { value: "within_mac", label: "Within MAC area" },
  { value: "outside_mac", label: "Outside MAC area" },
];

export const DISTRICT_OPTIONS: SelectOption[] = [
  { value: "all", label: "All districts" },
  { value: "sonitpur", label: "Sonitpur" },
  { value: "sivasagar", label: "Sivasagar" },
  { value: "biswanath", label: "Biswanath" },
  { value: "charaideo", label: "Charaideo" },
  { value: "dhemaji", label: "Dhemaji" },
  { value: "majuli", label: "Majuli" },
];

export const EXAM_OPTIONS: SelectOption[] = [
  { value: "all", label: "All exams" },
  { value: "hslc", label: "HSLC" },
  { value: "hs", label: "HS" },
];

export const LAST_ACTION_OPTIONS: SelectOption[] = [
  { value: "all", label: "Any last action" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "moved_to_scrutiny", label: "Moved to scrutiny" },
];

export const REVIEWER_OPTIONS: SelectOption[] = [
  { value: "all", label: "Any reviewer" },
  { value: "reviewer_1", label: "Reviewer 1" },
  { value: "reviewer_2", label: "Reviewer 2" },
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "1",
    referenceNo: "MAC/2026/10003",
    applicant: {
      name: "Hirakjyoti Mili",
      phone: "+91 9100024690",
      initials: "HM",
    },
    exam: { type: "HSLC", board: "SEBA", year: 2024 },
    percentage: 66.45,
    location: { district: "Sonitpur", subLocation: "Biswanath · Village 3" },
    appliedDate: "2026-04-03",
    status: "rejected",
  },
  {
    id: "2",
    referenceNo: "MAC/2026/10007",
    applicant: { name: "Munmi Kaman", phone: "+91 9100074070", initials: "MK" },
    exam: { type: "HSLC", board: "SEBA", year: 2024 },
    percentage: 93.68,
    location: { district: "Sivasagar", subLocation: "Sonari · Village 7" },
    appliedDate: "2026-04-07",
    status: "rejected",
  },
  {
    id: "3",
    referenceNo: "MAC/2026/10011",
    applicant: {
      name: "Manash Regon",
      phone: "+91 9100123450",
      initials: "MR",
    },
    exam: { type: "HSLC", board: "SEBA", year: 2024 },
    percentage: 76.99,
    location: {
      district: "Karnataka",
      subLocation: "Outside MAC · Bengaluru",
      isOutsideMAC: true,
    },
    appliedDate: "2026-04-11",
    status: "rejected",
  },
  {
    id: "4",
    referenceNo: "MAC/2026/10015",
    applicant: {
      name: "Rituparna Mili",
      phone: "+91 9100172830",
      initials: "RM",
    },
    exam: { type: "HSLC", board: "SEBA", year: 2024 },
    percentage: 66.35,
    location: { district: "Biswanath", subLocation: "Biswanath · Village 15" },
    appliedDate: "2026-04-15",
    status: "rejected",
  },
  {
    id: "5",
    referenceNo: "MAC/2026/10019",
    applicant: {
      name: "Pallabi Kaman",
      phone: "+91 9100222210",
      initials: "PK",
    },
    exam: { type: "HSLC", board: "SEBA", year: 2024 },
    percentage: 70.91,
    location: { district: "Charaideo", subLocation: "Mahmara · Village 19" },
    appliedDate: "2026-04-19",
    status: "rejected",
  },
  {
    id: "6",
    referenceNo: "MAC/2026/10023",
    applicant: {
      name: "Hirakjyoti Regon",
      phone: "+91 9100271590",
      initials: "HR",
    },
    exam: { type: "HSLC", board: "SEBA", year: 2024 },
    percentage: 68.09,
    location: { district: "Dhemaji", subLocation: "Gogamukh · Village 23" },
    appliedDate: "2026-04-23",
    status: "rejected",
  },
  {
    id: "7",
    referenceNo: "MAC/2026/10027",
    applicant: { name: "Munmi Mili", phone: "+91 9100320970", initials: "MM" },
    exam: { type: "HSLC", board: "SEBA", year: 2024 },
    percentage: 91.72,
    location: { district: "Majuli", subLocation: "Kamalahari · Village 27" },
    appliedDate: "2026-04-27",
    status: "rejected",
  },
];
