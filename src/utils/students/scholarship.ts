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

export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export const CASTE_OPTIONS = [
  { value: "general", label: "General" },
  { value: "obc", label: "OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
];

export const EXAMINATION_OPTIONS = [
  { value: "hslc", label: "HSLC" },
  { value: "hs", label: "HS" },
];

export const DOCUMENT_TYPES = [
  {
    key: "govtId",
    label: "Government ID",
    description: "Aadhaar Card / PAN Card",
    required: true,
  },
  {
    key: "marksheet",
    label: "HSLC / HS Marksheet",
    description: "Scanned copy of marksheet",
    required: true,
  },
  {
    key: "ageProof",
    label: "Age Proof",
    description: "Birth Certificate / HSLC Admit Card",
    required: true,
  },
  {
    key: "addressProof",
    label: "Address Proof",
    description: "Aadhaar Card / Electricity Bill / DL / Any other document",
    required: true,
  },
  {
    key: "schoolPassCertificate",
    label: "School Pass Certificate",
    description: "Scanned copy of pass certificate",
    required: false,
  },
  {
    key: "bankPassBook",
    label: "Bank Pass Book",
    description: "First page of bank passbook",
    required: true,
  },
  {
    key: "casteCertificate",
    label: "Caste Certificate",
    description: "Issued by competent authority",
    required: false,
  },
  {
    key: "bankAccountDetails",
    label: "Bank Account Details",
    description: "Bank statement or account details document",
    required: false,
  },
] as const;

export const ACCEPTED_FILE_TYPES = ".pdf,.jpg,.jpeg,.png";
export const MAX_FILE_SIZE_MB = 2;
