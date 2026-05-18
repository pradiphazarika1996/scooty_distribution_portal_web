import type { Step } from "@/types/students/scholarship";

export const FORM_TABS = Object.freeze({
  PERSONAL_DETAILS: 1,
  ACADEMIC_AND_BANK_DETAILS: 2,
  DOCUMENTS: 3,
  REVIEW: 4,
});

export const FORM_STEPS: Step[] = [
  {
    key: "personal-details",
    label: "Personal Details",
    step: FORM_TABS.PERSONAL_DETAILS,
  },
  {
    key: "academic-and-bank-details",
    label: "Academic & Bank Details",
    step: FORM_TABS.ACADEMIC_AND_BANK_DETAILS,
  },
  {
    key: "documents",
    label: "Documents",
    step: FORM_TABS.DOCUMENTS,
  },
  {
    key: "review",
    label: "Review",
    step: FORM_TABS.REVIEW,
  },
];

export const DOCUMENT_TYPES = Object.freeze({
  GOVT_ID: 1,
  MARKSHEET: 2,
  AGE_PROOF: 3,
  ADDRESS_PROOF: 4,
  SCHOOL_PASS_CERTIFICATE: 5,
  BANK_PASS_BOOK: 6,
  CASTE_CERTIFICATE: 7,
  BANK_ACCOUNT_DETAILS: 8,
});

export const DOCUMENT_TYPES_ARRAY = [
  {
    key: DOCUMENT_TYPES.GOVT_ID,
    label: "Government ID",
    description: "Aadhaar Card / PAN Card",
    required: true,
  },
  {
    key: DOCUMENT_TYPES.MARKSHEET,
    label: "HSLC / HS Marksheet",
    description: "Scanned copy of marksheet",
    required: true,
  },
  {
    key: DOCUMENT_TYPES.AGE_PROOF,
    label: "Age Proof",
    description: "Birth Certificate / HSLC Admit Card",
    required: true,
  },
  {
    key: DOCUMENT_TYPES.ADDRESS_PROOF,
    label: "Address Proof",
    description: "Aadhaar Card / Electricity Bill / DL / Any other document",
    required: true,
  },
  {
    key: DOCUMENT_TYPES.SCHOOL_PASS_CERTIFICATE,
    label: "School Pass Certificate",
    description: "Scanned copy of pass certificate",
    required: false,
  },
  {
    key: DOCUMENT_TYPES.BANK_PASS_BOOK,
    label: "Bank Pass Book",
    description: "First page of bank passbook",
    required: true,
  },
  {
    key: DOCUMENT_TYPES.CASTE_CERTIFICATE,
    label: "Caste Certificate",
    description: "Issued by competent authority",
    required: false,
  },
  {
    key: DOCUMENT_TYPES.BANK_ACCOUNT_DETAILS,
    label: "Bank Account Details",
    description: "Bank statement or account details document",
    required: false,
  },
] as const;

export const ACCEPTED_FILE_TYPES = ".pdf,.jpg,.jpeg,.png";
export const MAX_FILE_SIZE_MB = 2;

export const APPLICATION_STATUS = Object.freeze({
  DRAFT: 1,
  SUBMITTED: 2,
  PAYMENT_COMPLETED: 3,
  UNDER_REVIEW: 4,
  QUERY_RAISED: 5,
  APPROVED: 6,
  REJECTED: 7,
});

export const PAYMENT_STATUS = Object.freeze({
  PENDING: 1,
  COMPLETED: 2,
  FAILED: 3,
});

export const APPLICATION_STATUS_LABELS = {
  [APPLICATION_STATUS.SUBMITTED]: "Submitted",
  [APPLICATION_STATUS.PAYMENT_COMPLETED]: "Payment Completed",
  [APPLICATION_STATUS.UNDER_REVIEW]: "Under Review",
  [APPLICATION_STATUS.QUERY_RAISED]: "Query Raised",
  [APPLICATION_STATUS.APPROVED]: "Approved",
  [APPLICATION_STATUS.REJECTED]: "Rejected",
};

export const MARKING_SYSTEM = Object.freeze({
  PERCENTAGE: 1,
  CGPA: 2,
});
