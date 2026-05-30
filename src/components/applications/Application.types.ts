export type ApplicationStatus =
  | "pending"
  | "submitted"
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
  applicantType: string; // "all" | "within_mac" | "outside_mac"
  district: string; // "all" | district_id as string
  exam: string; // "all" | "hslc" | "hs"
  gender: string; // "all" | "1" (Male) | "2" (Female)
  lastAction: string; // "all" | "today" | "week" | "month"
  reviewer: string; // "all" — reserved for future
  activeTab: TabKey;
}


// ── Replace ApplicationDetail in types/application/application.types.ts ──

export interface ApplicationDetail {
  // Overview
  id:                    number;
  referenceNo:           string;
  examType:              string;        // resolved server-side
  academicYear:          string;
  applicationStatus:     number;        // kept for Ant Design color/icon logic only
  applicationStatusLabel:string;        // resolved server-side
  submittedAt:           string | null;
  statusUpdatedAt:       string | null;
  approvalOrderNumber:   string | null;
  // Academic
  boardName:             string | null; // resolved server-side (includes otherBoardName)
  rollNo:                string | null;
  yearOfPassing:         string | null;
  marksDisplay:          string | null; // formatted server-side ("66.45%" or "8.5 CGPA")
  institutionName:       string | null;
  institutionAddress:    string | null;
  // Bank
  bankName:              string | null;
  branchName:            string | null;
  accountNo:             string | null;
  ifscCode:              string | null;
  // Payment
  paymentStatus:         number | null;
  paymentAmount:         number | null;
  paymentDate:           string | null;
  paymentMode:           string | null;
  // Review
  underReviewAt:         string | null;
  reviewRemarks:         string | null;
  approvedAt:            string | null;
  approvalRemarks:       string | null;
  rejectedAt:            string | null;
  rejectionReason:       string | null;
  // Personal
  studentName:           string | null;
  phone:                 string | null;
  email:                 string | null;
  guardianName:          string | null;
  genderName:            string | null; // resolved server-side
  dateOfBirth:           string | null;
  casteName:             string | null; // resolved server-side (includes otherCasteName)
  aadhaarNumber:         string | null;
  // Address
  isResidentOfMacArea:   boolean;
  districtName:          string | null;
  panchayatName:         string | null;
  municipalArea:         string | null;
  otherVillageName:      string | null;
  stateName:             string | null; // resolved server-side
  city:                  string | null;
  permanentAddress:      string | null;
  presentAddress:        string | null;
  pinCode:               string | null;
}

export interface ApplicationDetailApiResponse {
  success: boolean;
  data:    ApplicationDetail;
}