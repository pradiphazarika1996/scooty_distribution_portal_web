export type ApplicationStatus  =
  | "pending"
  | "under_scrutiny"
  | "approved"
  | "rejected";
export type TabKey = "all" | ApplicationStatus;

export interface TabItem {
  key: TabKey;
  label: string;
  count: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ExamInfo {
  type: string;
  board: string;
  year: number;
}

export interface LocationInfo {
  district: string;
  subLocation: string;
  isOutsideMAC?: boolean;
}

export interface Application {
  id: string;
  referenceNo: string;
  applicant: {
    name: string;
    phone: string;
    initials: string;
  };
  exam: ExamInfo;
  percentage: number;
  location: LocationInfo;
  appliedDate: string;
  status: ApplicationStatus;
}

export interface ApplicationFilterState {
  search: string;
  remarksSearch: string;
  applicantType: string;
  district: string;
  exam: string;
  lastAction: string;
  reviewer: string;
  activeTab: TabKey;
}
